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
