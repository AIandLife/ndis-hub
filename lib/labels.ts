import type { Lang } from "@/lib/i18n";

// 数据值（城市 / 服务标签 / 分类 / 语言）的双语显示。
// 存库的值保持「规范值」（多为中文或中英混排），这里只负责「显示成当前语言」，
// 不改筛选逻辑（筛选仍用规范值比较）。消除英文界面里残留的中文。

type Pair = { zh: string; en: string };

// ── 城市 / 地区 ──
const CITY: Record<string, Pair> = {
  全部地区: { zh: "全部地区", en: "All regions" },
  "悉尼 Sydney": { zh: "悉尼", en: "Sydney" },
  "墨尔本 Melbourne": { zh: "墨尔本", en: "Melbourne" },
  "布里斯班 Brisbane": { zh: "布里斯班", en: "Brisbane" },
  "阿德莱德 Adelaide": { zh: "阿德莱德", en: "Adelaide" },
  "珀斯 Perth": { zh: "珀斯", en: "Perth" },
  "堪培拉 Canberra": { zh: "堪培拉", en: "Canberra" },
  "全澳 National": { zh: "全澳", en: "National" },
  "线上 Online": { zh: "线上", en: "Online" },
  全澳洲: { zh: "全澳洲", en: "All Australia" },
  澳洲其他城市: { zh: "澳洲其他城市", en: "Other AU cities" },
  澳洲: { zh: "澳洲", en: "Australia" },
  全澳: { zh: "全澳", en: "National" },
};
const CITY_ZH_EN: Record<string, string> = {
  悉尼: "Sydney",
  墨尔本: "Melbourne",
  布里斯班: "Brisbane",
  阿德莱德: "Adelaide",
  珀斯: "Perth",
  堪培拉: "Canberra",
  黄金海岸: "Gold Coast",
};

export function cityLabel(value: string, lang: Lang): string {
  if (!value) return value;
  const hit = CITY[value];
  if (hit) return lang === "en" ? hit.en : hit.zh;
  if (lang === "en") {
    const ascii = value.replace(/[一-鿿]/g, "").trim();
    if (ascii) return ascii; // 已含英文（如 "Sydney" 或 "悉尼 Sydney"）
    for (const [zh, en] of Object.entries(CITY_ZH_EN))
      if (value.includes(zh)) return en;
    if (value.includes("澳洲") || value.includes("全澳")) return "Australia";
    return value;
  }
  // 中文界面：去掉英文部分，只保留中文；若本身纯英文则原样
  const zh = value.replace(/[A-Za-z().]/g, "").trim();
  return zh || value;
}

// ── 服务 / 资源标签 ──
const TAG: Record<string, Pair> = {
  全部: { zh: "全部", en: "All" },
  "SIL/SDA住房": { zh: "SIL/SDA 住房", en: "SIL/SDA Housing" },
  "辅助技术 AT": { zh: "辅助技术 AT", en: "Assistive Tech (AT)" },
  就业支持: { zh: "就业支持", en: "Employment Support" },
  养老服务: { zh: "养老服务", en: "Aged Care" },
  "排班/CRM 软件": { zh: "排班/CRM 软件", en: "Rostering/CRM" },
  "管理软件/CRM": { zh: "管理软件/CRM", en: "Management/CRM" },
  "招聘/人力": { zh: "招聘/人力", en: "Recruitment/HR" },
  "记账/财税": { zh: "记账/财税", en: "Bookkeeping/Tax" },
  "合规/法律": { zh: "合规/法律", en: "Compliance/Legal" },
  "SDA 建筑/改造": { zh: "SDA 建筑/改造", en: "SDA Build/Reno" },
  居家护理: { zh: "居家护理", en: "Home Care" },
  "NDIS 服务": { zh: "NDIS 服务", en: "NDIS Services" },
  "培训/RTO": { zh: "培训/RTO", en: "Training/RTO" },
  清洁服务: { zh: "清洁服务", en: "Cleaning" },
  健康餐饮: { zh: "健康餐饮", en: "Health Meals" },
  运营服务: { zh: "运营服务", en: "Operations" },
};

export function tagLabel(value: string, lang: Lang): string {
  if (!value) return value;
  const hit = TAG[value];
  if (hit) return lang === "en" ? hit.en : hit.zh;
  return value; // 已是英文（如 "Support Coordination"）或未知，原样
}

// ── 对接分类（首页与对接大厅两套词表统一）──
const CAT: Record<string, Pair> = {
  全部: { zh: "全部", en: "All" },
  找员工: { zh: "找员工", en: "Hiring / staff" },
  "找员工/招聘": { zh: "找员工/招聘", en: "Hiring / staff" },
  找客户: { zh: "找客户", en: "Clients / referrals" },
  "找客户/转介": { zh: "找客户/转介", en: "Clients / referrals" },
  找供应商: { zh: "找供应商", en: "Suppliers" },
  找合作: { zh: "找合作", en: "Partners" },
  找合作伙伴: { zh: "找合作伙伴", en: "Partners" },
  买卖生意: { zh: "买卖生意", en: "Buy / sell business" },
  找场地: { zh: "找场地", en: "Property / venue" },
  "找房源/场地": { zh: "找房源/场地", en: "Property / venue" },
  其他: { zh: "其他", en: "Other" },
};

export function catLabel(value: string, lang: Lang): string {
  if (!value) return value;
  const hit = CAT[value];
  if (hit) return lang === "en" ? hit.en : hit.zh;
  return value;
}

// ── 服务语言筛选 ──
const LANGT: Record<string, Pair> = {
  全部语言: { zh: "全部语言", en: "All languages" },
  中文: { zh: "中文", en: "Chinese" },
  粤语: { zh: "粤语", en: "Cantonese" },
  其他: { zh: "其他", en: "Other" },
};

export function langLabel(value: string, lang: Lang): string {
  if (!value) return value;
  const hit = LANGT[value];
  if (hit) return lang === "en" ? hit.en : hit.zh;
  return value; // English / Tiếng Việt / العربية Arabic / Punjabi … 原样
}
