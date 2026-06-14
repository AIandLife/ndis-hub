// 服务端：把一条短文本翻成中/英两份（用户内容是用户自己的语言填的，
// 存双语后按访客界面语言显示）。用 Haiku，便宜；已是目标语言则原样返回。

const MODEL = "claude-haiku-4-5-20251001";

async function callClaude(prompt: string): Promise<string | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 400,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const text = data.content?.[0]?.type === "text" ? data.content[0].text : "";
    return (text as string).trim() || null;
  } catch {
    return null;
  }
}

// 把 {title, description} 翻成中文和英文两套。失败时回退原文，永不抛错。
export async function translateBoth(
  title: string,
  description: string
): Promise<{ zh: { title: string; description: string }; en: { title: string; description: string } }> {
  const orig = { title, description };
  const prompt = (target: "中文" | "English") =>
    `You translate B2B marketplace posts for an NDIS (Australian disability services) operator network. Translate the TITLE and DESCRIPTION below into ${target}. Keep it natural and concise; keep industry terms like NDIS, SIL, SDA, Support Coordinator, Plan Manager untranslated. If the text is already in ${target}, return it unchanged. Output STRICT JSON only: {"title":"...","description":"..."}.\n\nTITLE: ${title}\nDESCRIPTION: ${description}`;

  const parse = (raw: string | null): { title: string; description: string } | null => {
    if (!raw) return null;
    try {
      const m = raw.match(/\{[\s\S]*\}/);
      if (!m) return null;
      const o = JSON.parse(m[0]);
      if (typeof o.title === "string" && typeof o.description === "string") return o;
    } catch {
      /* ignore */
    }
    return null;
  };

  const [zhRaw, enRaw] = await Promise.all([
    callClaude(prompt("中文")),
    callClaude(prompt("English")),
  ]);

  return {
    zh: parse(zhRaw) || orig,
    en: parse(enRaw) || orig,
  };
}

// 翻译单段文本（如成员档案里的「需」），返回 {zh, en}。
export async function translateText(text: string): Promise<{ zh: string; en: string }> {
  const one = (target: "中文" | "English") =>
    callClaude(
      `Translate the following short B2B text into ${target} for an NDIS operator network. Natural, concise; keep NDIS/SIL/SDA/Support Coordinator/Plan Manager untranslated. If already ${target}, return unchanged. Output ONLY the translation, no quotes, no preamble.\n\n${text}`
    );
  const [zh, en] = await Promise.all([one("中文"), one("English")]);
  return { zh: zh || text, en: en || text };
}
