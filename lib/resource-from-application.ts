import { translateText } from "@/lib/translate";

// 供应商类服务（上游 B2B），其余为服务机构。
const SUPPLIER_TYPES = [
  "排班/CRM 软件",
  "管理软件/CRM",
  "招聘/人力",
  "记账/财税",
  "合规/法律",
  "SDA 建筑/改造",
];

type AdminClient = ReturnType<
  typeof import("@/lib/supabase/admin").getAdminClient
>;

// 把一条入驻申请变成资源库里的一张「圈内成员」卡片。
// 入驻表单 + 后台审批 + 自动通过 三处共用，保证字段一致。
// 已存在同名 approved 成员则跳过（去重，防重复上架）。
export async function createResourceFromApplication(
  admin: NonNullable<AdminClient>,
  app: Record<string, unknown>
): Promise<{ created: boolean; reason?: string }> {
  const company = ((app.company as string) || "").trim();
  const fullName = ((app.full_name as string) || "").trim();
  const title = company || fullName;
  if (!title) return { created: false, reason: "no_title" };

  // 去重：同名 approved 成员已存在就不重复建。
  const { data: dup } = await admin
    .from("resources")
    .select("id")
    .eq("circle", "ndis")
    .eq("status", "approved")
    .ilike("title", title)
    .limit(1);
  if (dup && dup.length > 0) return { created: false, reason: "duplicate" };

  const role = (app.ndis_role as string) || "";
  const isSupplier = SUPPLIER_TYPES.includes(role);
  const descRaw = (app.resources_offered as string) || "";
  const desc =
    descRaw.trim() || `${role || "NDIS 服务"} · 位于${(app.location as string) || "澳洲"}`;
  // 服务语言 + 是否 NDIS 注册：从入驻时写进 description 的标记解析。
  const description = (app.description as string) || "";
  const language = (description.match(/服务语言：([^|]+)/)?.[1] || "").trim();
  const ndisReg = /NDIS注册/.test(description);
  const needsZh = ((app.needs as string) || "").trim();
  const needsEn = needsZh ? (await translateText(needsZh)).en : "";
  const descEn = /[一-鿿]/.test(desc) ? (await translateText(desc)).en : "";

  const tags = (app.resource_tags as string[])?.length
    ? (app.resource_tags as string[])
    : role
    ? [role]
    : ["NDIS 服务"];

  const { error } = await admin.from("resources").insert({
    title,
    category: isSupplier ? "supplier" : "provider",
    circle: "ndis",
    description: desc,
    location: (app.location as string) || "澳洲",
    tags,
    contact_info: {
      contactName: fullName,
      ndisRegistered: ndisReg,
      ...(language ? { languages: [language] } : {}),
      ...(descEn ? { description_en: descEn } : {}),
      ...(needsZh ? { needs: needsZh, needs_zh: needsZh, needs_en: needsEn } : {}),
    },
    submitter_email: (app.email as string) || null,
    submitter_name: fullName,
    is_scraped: false,
    status: "approved",
  });
  if (error) return { created: false, reason: error.message };
  return { created: true };
}
