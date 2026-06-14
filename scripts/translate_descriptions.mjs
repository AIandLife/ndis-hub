// 一次性迁移：把资源库里每条 approved 资源的中文 description 翻成英文，
// 存进 contact_info.description_en。英文界面据此显示，消除卡片正文的中英混杂。
// 已有 description_en 的跳过（可重复运行）。
import { readFileSync } from "node:fs";

const env = Object.fromEntries(
  readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .split("\n")
    .filter((l) => l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const SUPA = env.NEXT_PUBLIC_SUPABASE_URL;
const SR = env.SUPABASE_SERVICE_ROLE_KEY;
const AK = env.ANTHROPIC_API_KEY;
const REST = `${SUPA}/rest/v1`;
const H = { apikey: SR, Authorization: `Bearer ${SR}`, "Content-Type": "application/json" };

const hasChinese = (s) => /[一-鿿]/.test(s || "");

async function translate(text) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": AK, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 600,
      system:
        "Translate the user's Chinese NDIS business description into natural, concise professional English. Return ONLY the translation, no preamble, no quotes. Keep it under 60 words.",
      messages: [{ role: "user", content: text }],
    }),
  });
  if (!r.ok) throw new Error(`anthropic ${r.status}: ${await r.text()}`);
  const d = await r.json();
  return d.content?.[0]?.text?.trim() || "";
}

const res = await fetch(`${REST}/resources?status=eq.approved&select=id,title,description,contact_info&limit=500`, { headers: H });
const rows = await res.json();
console.log(`fetched ${rows.length} approved resources`);

let done = 0, skipped = 0, failed = 0;
for (const row of rows) {
  const ci = row.contact_info || {};
  if (ci.description_en) { skipped++; continue; }
  if (!hasChinese(row.description)) { skipped++; continue; } // 已是英文
  try {
    const en = await translate(row.description);
    if (!en) { failed++; continue; }
    const merged = { ...ci, description_en: en };
    const u = await fetch(`${REST}/resources?id=eq.${row.id}`, {
      method: "PATCH",
      headers: { ...H, Prefer: "return=minimal" },
      body: JSON.stringify({ contact_info: merged }),
    });
    if (!u.ok) { console.error(`PATCH ${row.title}: ${u.status} ${await u.text()}`); failed++; continue; }
    done++;
    console.log(`✓ ${row.title} → ${en.slice(0, 60)}`);
  } catch (e) {
    console.error(`✗ ${row.title}: ${e.message}`);
    failed++;
  }
}
console.log(`\nDONE. translated=${done} skipped=${skipped} failed=${failed}`);
