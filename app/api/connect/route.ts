import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";

// 「我能对接」直连流程：
// 响应人留下称呼+微信 → 登记 connection_requests →
// 若目标是自助发布的需求（demands 表有联系方式）→ 当场返回对方微信，双方直接对接；
// 若目标是圈内成员（库里无联系方式）→ 返回 bridged=true，由 Terry 收邮件后牵线。
// 对方联系方式只在响应人留下自己信息后才下发——不在页面上裸奔。

export async function POST(req: Request) {
  let body: Record<string, string> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { targetType, targetId, targetName, need, name, wechat, message } = body;
  if (!targetType || !targetId || !name || !wechat) {
    return NextResponse.json({ ok: false, error: "缺少必填项" }, { status: 400 });
  }

  const admin = getAdminClient();
  if (!admin) return NextResponse.json({ ok: true, bridged: true });

  // 限频：同一微信 1 小时内 ≥3 次对接，第 4 次起温和提醒并拒收。
  // 防止有人把「我能对接」当群发广告用（真实发生过：一人连发 7 条推销）。
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await admin
    .from("connection_requests")
    .select("id", { count: "exact", head: true })
    .eq("circle", "ndis")
    .eq("requester_wechat", wechat.slice(0, 40))
    .gte("created_at", oneHourAgo);
  if ((count ?? 0) >= 3) {
    return NextResponse.json(
      {
        ok: false,
        rateLimited: true,
        error:
          "你刚连续发起了好几次对接。对接大厅是帮大家一对一精准找资源的，同样内容反复群发会打扰对方、也容易被当广告，反而影响你在圈里的口碑。想让更多人认识你的业务？更好的办法是免费入驻资源库，写清你能提供什么，有需要的人会主动找你。歇一会儿（1 小时后）再发吧，谢谢配合 🙏",
      },
      { status: 429 }
    );
  }

  const row: Record<string, unknown> = {
    circle: "ndis",
    requester_name: name.slice(0, 40),
    requester_wechat: wechat.slice(0, 40),
    target_name: (targetName || "").slice(0, 80),
    message: `${(need || "").slice(0, 120)}${message ? ` ｜ ${message.slice(0, 300)}` : ""}`,
    status: "pending",
  };
  const isUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      targetId
    );
  if (targetType === "demand" && isUuid) row.demand_id = targetId;
  if (targetType === "member" && isUuid) row.resource_id = targetId;

  const { error } = await admin.from("connection_requests").insert(row);
  if (error)
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });

  // 自助发布的需求：取出对方留的微信，当场直连
  if (targetType === "demand" && isUuid) {
    const { data } = await admin
      .from("demands")
      .select("contact_wechat,contact_email")
      .eq("id", targetId)
      .single();
    if (data?.contact_wechat || data?.contact_email) {
      return NextResponse.json({
        ok: true,
        bridged: false,
        contact: {
          wechat: data.contact_wechat || null,
          email: data.contact_email || null,
        },
      });
    }
  }

  // 圈内成员或无联系方式：走圈主牵线
  return NextResponse.json({ ok: true, bridged: true });
}
