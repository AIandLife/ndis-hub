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
  // 审批通过的成员由Terry手动添加至此数组
]

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
