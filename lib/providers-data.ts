export interface Provider {
  id: string;
  name: string;
  chineseName?: string;
  type: string[];
  location: string;
  suburb: string;
  state: string;
  languages: string[];
  description: string;
  phone?: string;
  email?: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  ndisRegistered: boolean;
  specialties: string[];
  featured?: boolean;
}

export const PROVIDERS: Provider[] = [
  {
    id: "1",
    name: "Harmony NDIS Services",
    chineseName: "和谐NDIS服务",
    type: ["Support Coordination", "Core Supports"],
    location: "Sydney, NSW",
    suburb: "Chatswood",
    state: "NSW",
    languages: ["普通话", "广东话", "English"],
    description:
      "专注华人社区15年，提供专业Support Coordination和日常护理服务。团队成员均持有相关资质，熟悉NDIS流程。",
    phone: "02 9XXX XXXX",
    email: "info@harmonyndis.com.au",
    verified: true,
    rating: 4.8,
    reviewCount: 47,
    ndisRegistered: true,
    specialties: ["自闭症", "智力障碍", "儿童早期干预"],
    featured: true,
  },
  {
    id: "2",
    name: "Melbourne Chinese Disability Alliance",
    chineseName: "墨尔本华人残障联盟",
    type: ["Support Coordination", "Plan Management", "Community Access"],
    location: "Melbourne, VIC",
    suburb: "Box Hill",
    state: "VIC",
    languages: ["普通话", "English"],
    description:
      "非营利组织，专为华人NDIS参与者提供全方位支持。提供Support Coordination和Plan Management，收费透明。",
    phone: "03 9XXX XXXX",
    verified: true,
    rating: 4.7,
    reviewCount: 63,
    ndisRegistered: true,
    specialties: ["计划管理", "社区参与", "养老过渡"],
    featured: true,
  },
  {
    id: "3",
    name: "BrightPath Therapy",
    chineseName: "光明路径治疗中心",
    type: ["Therapeutic Supports"],
    location: "Sydney, NSW",
    suburb: "Burwood",
    state: "NSW",
    languages: ["普通话", "广东话", "English"],
    description:
      "专业OT（职业治疗）和语言治疗服务，服务自闭症及发育迟缓儿童。提供中文报告，协助NDIS申请。",
    phone: "02 8XXX XXXX",
    verified: true,
    rating: 4.9,
    reviewCount: 89,
    ndisRegistered: true,
    specialties: ["职业治疗OT", "语言治疗", "自闭症早干预", "儿童评估"],
    featured: true,
  },
  {
    id: "4",
    name: "Sun Care Services",
    chineseName: "阳光护理服务",
    type: ["Core Supports", "Home Modifications"],
    location: "Brisbane, QLD",
    suburb: "Sunnybank",
    state: "QLD",
    languages: ["普通话", "English"],
    description:
      "提供日常个人护理、家务协助和家居改造服务。专注老年人和身体障碍人士，拥有中文团队。",
    phone: "07 3XXX XXXX",
    verified: true,
    rating: 4.6,
    reviewCount: 34,
    ndisRegistered: true,
    specialties: ["身体障碍", "家居改造", "个人护理", "老年服务"],
  },
  {
    id: "5",
    name: "New Journey Plan Management",
    chineseName: "新征途计划管理",
    type: ["Plan Management"],
    location: "Sydney, NSW",
    suburb: "Parramatta",
    state: "NSW",
    languages: ["普通话", "广东话", "English"],
    description:
      "专业Plan Manager，帮助参与者管理NDIS资金，处理发票，提供月度财务报告。响应速度快，中文沟通。",
    phone: "02 9XXX XXXX",
    verified: false,
    rating: 4.5,
    reviewCount: 28,
    ndisRegistered: true,
    specialties: ["计划管理", "预算追踪", "财务报告"],
  },
  {
    id: "6",
    name: "Adelaide Chinese Community Care",
    chineseName: "阿德莱德华人社区关怀",
    type: ["Support Coordination", "Core Supports", "Community Access"],
    location: "Adelaide, SA",
    suburb: "Adelaide CBD",
    state: "SA",
    languages: ["普通话", "粤语", "English"],
    description:
      "深耕阿德莱德华人社区，提供全方位NDIS支持。擅长新参与者入门指导，协助申请和计划制定。",
    phone: "08 8XXX XXXX",
    verified: true,
    rating: 4.7,
    reviewCount: 19,
    ndisRegistered: true,
    specialties: ["申请协助", "社区融合", "心理健康"],
  },
];

export const SERVICE_TYPES = [
  "全部",
  "Support Coordination",
  "Plan Management",
  "Core Supports",
  "Therapeutic Supports",
  "Community Access",
  "Home Modifications",
  "Early Childhood",
  "SDA住房",
  "养老服务",
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

export const LANGUAGES = ["全部语言", "普通话", "广东话", "其他中文方言"];

export const WEEKLY_DEMAND = {
  sydney: { coordinator: 23, planManager: 18, therapy: 31, care: 15 },
  melbourne: { coordinator: 19, planManager: 14, therapy: 26, care: 12 },
  brisbane: { coordinator: 12, planManager: 9, therapy: 17, care: 8 },
  total: { coordinator: 67, planManager: 51, therapy: 89, care: 42 },
};
