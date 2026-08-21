import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { createResourceFromApplication } from "@/lib/resource-from-application";

// 老板入驻 → 写入 applications（status=approved）并【自动上架】到资源库（不再等人工审批）。
// 同名成员已存在则只留申请记录、不重复建卡。没配数据库时静默成功，不报错。
export async function POST(req: Request) {
  let body: Record<string, string> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }

  const { name, business, type, location, phone, email, language, wechat, intro, needs, ndisRegistered } =
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

  const appRow = {
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
    // 业务介绍 → 卡片描述；在找 → 卡片「在找」。
    resources_offered: intro || null,
    needs: needs || null,
    // description 兼作元信息载体：服务语言 +（可选）NDIS 注册标记。
    description: `服务语言：${language || "中文"}${ndisRegistered ? " | NDIS注册" : ""}`,
    status: "approved",
  };

  const { error } = await admin
    .from("applications")
    .upsert(appRow, { onConflict: "email" });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  // 自动上架（含去重）。出错不影响用户侧成功提示——申请已留底。
  let listed = false;
  try {
    const r = await createResourceFromApplication(admin, appRow);
    listed = r.created;
  } catch {
    /* ignore */
  }
  return NextResponse.json({ ok: true, stored: true, listed });
}
