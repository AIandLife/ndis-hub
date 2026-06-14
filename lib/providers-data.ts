export interface Provider {
  id: string;
  name: string;
  chineseName?: string;
  // provider = 提供 NDIS 服务的机构；supplier = 给这个行业供货/做服务的上游（软件/招聘/记账/建筑等）
  category: "provider" | "supplier";
  type: string[];
  location: string;
  suburb: string;
  state: string;
  languages: string[];
  description: string;
  website?: string;
  phone?: string;
  email?: string;
  // public = 爬取/整理的公开资源；claimed = 圈内成员（BossLink 登记或本站入驻）
  listingType: "public" | "claimed";
  verified: boolean;
  rating?: number;
  reviewCount?: number;
  ndisRegistered: boolean;
  specialties: string[];
  featured?: boolean;
  // 圈内成员的对接信息（来自 BossLink 登记的「需」）
  needs?: string;
  needsEn?: string;
  needsZh?: string;
  contactName?: string;
}

// ── 种子数据 ──────────────────────────────────────────────────
// 说明：以下为澳洲公开可查的知名 NDIS 机构与行业供应商，作为资源库冷启动种子，
// 一律标记 listingType:"public"（公开信息整理·待认领），不编造评分与联系方式。
// 老板看到后可「认领并完善」或「新增自己的生意」——这正是引流沉淀的钩子。
// Terry 审批通过的真实入驻成员，listingType 设为 "claimed" 后追加在后面。
export const PROVIDERS: Provider[] = [
  {
    id: "life-without-barriers",
    name: "Life Without Barriers",
    category: "provider",
    type: ["Support Coordination", "Core Supports", "SIL/SDA住房"],
    location: "全澳 National",
    suburb: "",
    state: "National",
    languages: ["英文"],
    description:
      "澳洲规模最大的 NDIS 服务机构之一，覆盖全澳，提供支持性独立生活（SIL）、社区支持、心理健康与就业支持等。",
    website: "https://www.lwb.org.au",
    listingType: "public",
    verified: false,
    ndisRegistered: true,
    specialties: ["SIL", "心理健康", "就业支持"],
  },
  {
    id: "aruma",
    name: "Aruma",
    category: "provider",
    type: ["Core Supports", "SIL/SDA住房", "Therapeutic Supports"],
    location: "悉尼 Sydney",
    suburb: "",
    state: "NSW/QLD/VIC/ACT",
    languages: ["英文"],
    description:
      "由 House with No Steps 与 The Tipping Foundation 合并而成的大型残障服务机构，覆盖 NSW、QLD、VIC、ACT，提供住宿、就业、治疗与社区参与。",
    website: "https://www.aruma.com.au",
    listingType: "public",
    verified: false,
    ndisRegistered: true,
    specialties: ["住宿支持", "社区参与"],
  },
  {
    id: "achieve-australia",
    name: "Achieve Australia",
    category: "provider",
    type: ["Core Supports", "Community Access", "SIL/SDA住房"],
    location: "悉尼 Sydney",
    suburb: "",
    state: "NSW",
    languages: ["英文"],
    description:
      "深耕残障服务 65 年以上的 NSW 机构，专注个性化支持计划，提供住宿、社区参与与就业支持。",
    website: "https://www.achieveaustralia.org.au",
    listingType: "public",
    verified: false,
    ndisRegistered: true,
    specialties: ["个性化支持", "社区融合"],
  },
  {
    id: "scope-australia",
    name: "Scope Australia",
    category: "provider",
    type: ["Therapeutic Supports", "辅助技术 AT", "Community Access"],
    location: "墨尔本 Melbourne",
    suburb: "",
    state: "VIC",
    languages: ["英文"],
    description:
      "治疗服务、沟通支持与辅助技术领域的 VIC 领先机构，提供日间项目、喘息照护与就业支持。",
    website: "https://www.scopeaust.org.au",
    listingType: "public",
    verified: false,
    ndisRegistered: true,
    specialties: ["治疗服务", "沟通支持", "辅助技术"],
  },
  {
    id: "cerebral-palsy-alliance",
    name: "Cerebral Palsy Alliance",
    category: "provider",
    type: ["Therapeutic Supports", "Early Childhood", "辅助技术 AT"],
    location: "悉尼 Sydney",
    suburb: "",
    state: "NSW",
    languages: ["英文"],
    description:
      "脑瘫及相关残障领域的知名机构，提供治疗、早期干预、辅助技术与研究。",
    website: "https://www.cerebralpalsy.org.au",
    listingType: "public",
    verified: false,
    ndisRegistered: true,
    specialties: ["脑瘫", "早期干预"],
  },
  {
    id: "endeavour-foundation",
    name: "Endeavour Foundation",
    category: "provider",
    type: ["Core Supports", "Community Access", "就业支持"],
    location: "布里斯班 Brisbane",
    suburb: "",
    state: "QLD",
    languages: ["英文"],
    description:
      "澳洲历史悠久的大型残障服务机构之一，主营 QLD，提供学习与就业、社区参与与住宿支持。",
    website: "https://www.endeavour.com.au",
    listingType: "public",
    verified: false,
    ndisRegistered: true,
    specialties: ["就业支持", "技能培训"],
  },
  {
    id: "yooralla",
    name: "Yooralla",
    category: "provider",
    type: ["Core Supports", "SIL/SDA住房", "Therapeutic Supports"],
    location: "墨尔本 Melbourne",
    suburb: "",
    state: "VIC",
    languages: ["英文"],
    description:
      "维州历史最悠久的残障服务机构之一，提供住宿、个人护理、治疗与社区支持。",
    website: "https://www.yooralla.com.au",
    listingType: "public",
    verified: false,
    ndisRegistered: true,
    specialties: ["住宿支持", "个人护理"],
  },
  {
    id: "shiftcare",
    name: "ShiftCare",
    category: "supplier",
    type: ["排班/CRM 软件"],
    location: "线上 Online",
    suburb: "",
    state: "National",
    languages: ["英文"],
    description:
      "面向 NDIS / 居家照护机构的排班、客户管理与发票软件，供应商类资源示例（服务于 Provider）。",
    website: "https://www.shiftcare.com",
    listingType: "public",
    verified: false,
    ndisRegistered: false,
    specialties: ["排班", "发票", "员工管理"],
  },
  {
    id: "lumary",
    name: "Lumary",
    category: "supplier",
    type: ["管理软件/CRM"],
    location: "阿德莱德 Adelaide",
    suburb: "",
    state: "SA",
    languages: ["英文"],
    description:
      "澳洲本土的残障与养老服务管理平台（CRM），服务于 NDIS Provider 的运营与合规，供应商类资源示例。",
    website: "https://www.lumary.com",
    listingType: "public",
    verified: false,
    ndisRegistered: false,
    specialties: ["运营管理", "合规"],
  },
]

export const SERVICE_TYPES = [
  "全部",
  // —— Provider 服务类 ——
  "Support Coordination",
  "Plan Management",
  "Core Supports",
  "Therapeutic Supports",
  "Community Access",
  "Early Childhood",
  "SIL/SDA住房",
  "辅助技术 AT",
  "就业支持",
  "养老服务",
  // —— Supplier 上游供应类（B2B）——
  "排班/CRM 软件",
  "管理软件/CRM",
  "招聘/人力",
  "记账/财税",
  "合规/法律",
  "SDA 建筑/改造",
];

export const LOCATIONS = [
  "全部地区",
  "悉尼 Sydney",
  "墨尔本 Melbourne",
  "布里斯班 Brisbane",
  "阿德莱德 Adelaide",
  "珀斯 Perth",
  "堪培拉 Canberra",
];

// 服务语言：覆盖 NDIS 从业主要族裔社群（调研依据：照护从业者出生国前三=尼泊尔/印度/菲律宾；
// 社区语言前五=普通话/阿拉伯语/越南语/粤语/旁遮普语，ABS 2021）
export const LANGUAGES = [
  "全部语言",
  "中文",
  "粤语",
  "English",
  "Tiếng Việt",
  "العربية Arabic",
  "Punjabi",
  "Hindi",
  "Nepali",
  "Tagalog",
  "한국어 Korean",
  "其他",
];
