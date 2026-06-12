import { NextResponse } from "next/server";
import { getAdminClient } from "@/lib/supabase/admin";

// 对接大厅：需求的公开读取与提交。
// 读取走服务端过滤——contact_email / contact_wechat 永不返回给浏览器。

export async function GET() {
  const admin = getAdminClient();
  if (!admin) return NextResponse.json({ demands: [] });

  const { data, error } = await admin
    .from("demands")
    .select("id,title,description,category,city,budget,submitter_name,created_at")
    .eq("status", "approved")
    .eq("circle", "ndis")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return NextResponse.json({ demands: [] });
  return NextResponse.json({ demands: data ?? [] });
}

export async function POST(req: Request) {
  let body: Record<string, string> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { title, description, category, city, name, wechat, email } = body;
  if (!title || !description || !name || (!wechat && !email)) {
    return NextResponse.json(
      { ok: false, error: "缺少必填项" },
      { status: 400 }
    );
  }

  const admin = getAdminClient();
  if (!admin) return NextResponse.json({ ok: true, stored: false });

  const { error } = await admin.from("demands").insert({
    title: title.slice(0, 80),
    description: description.slice(0, 600),
    category: category || "其他",
    circle: "ndis",
    city: city || "全澳洲",
    contact_wechat: wechat || null,
    contact_email: email || null,
    submitter_name: name.slice(0, 40),
    status: "pending",
  });

  if (error)
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, stored: true });
}
