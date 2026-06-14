import { supabase } from "@/lib/supabase/client";
import { PROVIDERS, type Provider } from "@/lib/providers-data";

// resources 表一行的形状（与 BossLink 兼容；NDIS 的结构化字段塞在 contact_info）
interface ResourceRow {
  id: string;
  title: string;
  category: string | null; // 'provider' | 'supplier'
  description: string;
  location: string | null;
  tags: string[] | null;
  contact_info: {
    chineseName?: string;
    languages?: string[];
    website?: string;
    specialties?: string[];
    ndisRegistered?: boolean;
    state?: string;
    needs?: string;
    needs_en?: string;
    needs_zh?: string;
    description_en?: string;
    contactName?: string;
  } | null;
  is_scraped: boolean;
  source_url: string | null;
  status: string;
}

// 旧数据语言值 → 新版多族裔标签
const LANG_ALIAS: Record<string, string> = {
  英文: "English",
  普通话: "中文",
  广东话: "粤语",
};

// resources 行 → 页面用的 Provider 形状
function rowToProvider(r: ResourceRow): Provider {
  const ci = r.contact_info || {};
  return {
    id: r.id,
    name: r.title,
    chineseName: ci.chineseName,
    category: (r.category as "provider" | "supplier") || "provider",
    type: r.tags || [],
    location: r.location || "",
    suburb: "",
    state: ci.state || "",
    languages: (ci.languages || []).map((l) => LANG_ALIAS[l] || l),
    description: r.description,
    descriptionEn: ci.description_en || undefined,
    website:
      ci.website ||
      (r.source_url && r.source_url.startsWith("http") ? r.source_url : undefined),
    listingType: r.is_scraped ? "public" : "claimed",
    verified: !r.is_scraped,
    ndisRegistered: ci.ndisRegistered ?? false,
    specialties: ci.specialties || [],
    needs: ci.needs || undefined,
    needsEn: ci.needs_en || undefined,
    needsZh: ci.needs_zh || undefined,
    contactName: ci.contactName || undefined,
  };
}

// 读取公开（已审核）资源；没配数据库或出错时回退静态种子，保证页面永不崩。
export async function fetchApprovedProviders(): Promise<Provider[]> {
  if (!supabase) return PROVIDERS;
  const { data, error } = await supabase
    .from("resources")
    .select(
      "id,title,category,description,location,tags,contact_info,is_scraped,source_url,status"
    )
    .eq("status", "approved")
    .order("is_scraped", { ascending: true }) // 已认领的(is_scraped=false)排前面
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) return PROVIDERS;
  return (data as ResourceRow[]).map(rowToProvider);
}
