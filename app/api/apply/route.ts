import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";

// 老板入驻/认领申请 → 写入 applications 表（status=pending，待 Terry 后台审批）。
// 没配数据库时静默成功（前端体验不受影响），不报错。
export async function POST(req: Request) {
  let body: Record<string, string> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }

  const { name, business, type, location, phone, email, language, wechat, intro, needs } =
    body;

  if (!name || !email) {
    return NextResponse.json(
      { ok: false, error: "缺少必填项" },
      { status: 400 }
    );
  }

  const admin = getAdminClient();
  if (!admin) {
    // 未配置数据库：静默成功，前端照常显示提交成功
    return NextResponse.json({ ok: true, stored: false });
  }

  const { error } = await admin.from("applications").upsert(
    {
      full_name: name,
      company: business || null,
      email,
      wechat_id: wechat || "",
      phone: phone || null,
      location: location || null,
      industry: "NDIS",
      circle: "ndis",
      ndis_role: type || null,
      resource_tags: type ? [type] : [],
      // 业务介绍 → 卡片描述；在找 → 卡片「在找」。审批通过时由 admin 路由落到 resources。
      resources_offered: intro || null,
      needs: needs || null,
      description: language ? `服务语言：${language}` : null,
      status: "pending",
    },
    { onConflict: "email" }
  );

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, stored: true });
}
