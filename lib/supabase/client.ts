import { createClient } from "@supabase/supabase-js";

// 浏览器端只读客户端（anon key）。
// 只能读到 RLS 允许公开的数据（如 status='approved' 的 resources、settings）。
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  url && anonKey ? createClient(url, anonKey) : null;

// 是否已配置数据库（没配时页面应回退到静态种子，不崩）
export const hasSupabase = Boolean(url && anonKey);
