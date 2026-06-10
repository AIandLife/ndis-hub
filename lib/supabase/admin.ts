import { createClient } from "@supabase/supabase-js";

// 服务端专用客户端（service_role key，绕过 RLS）。
// 只能在 API route / server 代码里 import，绝不能出现在浏览器包里。
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function getAdminClient() {
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
