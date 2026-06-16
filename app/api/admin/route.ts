import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";
import { translateText } from "@/lib/translate";

// 简易后台审批：密码保护（x-admin-secret 头 == ADMIN_SECRET）。
// GET  → 列出待审的入驻申请 + 需求
// POST → 审批/拒绝：
//   - 入驻申请通过 → 写一条 resources（claimed，上资源库）
//   - 需求通过     → demands.status=approved（上对接大厅）

function authed(req: Request): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  return req.headers.get("x-admin-secret") === secret;
}

export async function GET(req: Request) {
  if (!authed(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const admin = getAdminClient();
  if (!admin) return NextResponse.json({ applications: [], demands: [] });

  const [apps, dems] = await Promise.all([
    admin
      .from("applications")
      .select("id,full_name,company,email,wechat_id,phone,location,industry,ndis_role,resource_tags,description,status,created_at")
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(100),
    admin
      .from("demands")
      .select("id,title,description,category,city,submitter_name,contact_wechat,contact_email,status,created_at")
      .eq("circle", "ndis")
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(100),
  ]);

  return NextResponse.json({
    applications: apps.data ?? [],
    demands: dems.data ?? [],
  });
}

export async function POST(req: Request) {
  if (!authed(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const admin = getAdminClient();
  if (!admin) return NextResponse.json({ ok: false }, { status: 500 });

  let body: { kind?: string; id?: string; action?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const { kind, id, action } = body;
  if (!kind || !id || !action) return NextResponse.json({ ok: false }, { status: 400 });

  const newStatus = action === "approve" ? "approved" : "rejected";

  if (kind === "demand") {
    const { error } = await admin.from("demands").update({ status: newStatus }).eq("id", id);
    return NextResponse.json({ ok: !error });
  }

  if (kind === "application") {
    // 取申请详情
    const { data: app } = await admin
      .from("applications")
      .select("*")
      .eq("id", id)
      .single();
    const { error } = await admin
      .from("applications")
      .update({ status: newStatus })
      .eq("id", id);
    if (error) return NextResponse.json({ ok: false }, { status: 500 });

    // 通过 → 生成一条圈内成员 resource（上资源库）
    if (action === "approve" && app) {
      const role: string = app.ndis_role || "";
      // 供应商类服务（上游 B2B），其余为服务机构。按所选服务类型判定，不再用模糊正则。
      const SUPPLIER_TYPES = [
        "排班/CRM 软件",
        "管理软件/CRM",
        "招聘/人力",
        "记账/财税",
        "合规/法律",
        "SDA 建筑/改造",
      ];
      const isSupplier = SUPPLIER_TYPES.includes(role);
      // 服务语言 + 是否 NDIS 注册，从入驻时写进 description 的标记里解析。
      const language = ((app.description || "").match(/服务语言：([^|]+)/)?.[1] || "").trim();
      const ndisReg = /NDIS注册/.test(app.description || "");
      const desc =
        (app.resources_offered && app.resources_offered.trim()) ||
        `${role || "NDIS 服务"} · 位于${app.location || "澳洲"}`;
      // 业务介绍 + 在找 都翻成英文，英文界面卡片不残留中文（与迁入成员对齐）
      const needsZh = (app.needs || "").trim();
      const needsEn = needsZh ? (await translateText(needsZh)).en : "";
      const descEn = /[一-鿿]/.test(desc) ? (await translateText(desc)).en : "";
      await admin.from("resources").insert({
        title: app.company || app.full_name,
        category: isSupplier ? "supplier" : "provider",
        circle: "ndis",
        description: desc,
        location: app.location || "澳洲",
        tags: app.resource_tags?.length ? app.resource_tags : role ? [role] : ["NDIS 服务"],
        contact_info: {
          contactName: app.full_name,
          // 只有本人勾选「已 NDIS 注册」才打绿标，不再一律 true（避免虚假认证）
          ndisRegistered: ndisReg,
          ...(language ? { languages: [language] } : {}),
          ...(descEn ? { description_en: descEn } : {}),
          ...(needsZh ? { needs: needsZh, needs_zh: needsZh, needs_en: needsEn } : {}),
        },
        submitter_email: app.email,
        submitter_name: app.full_name,
        is_scraped: false,
        status: "approved",
      });
    }
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false }, { status: 400 });
}
