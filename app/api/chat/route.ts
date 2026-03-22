import { getNDISSystemPrompt } from "@/lib/ndis-knowledge";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json({ error: "API密钥未配置" }, { status: 500 });
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Invalid messages" }, { status: 400 });
    }

    const validMessages = messages
      .filter((m: { role: string; content: string }) =>
        m.role === "user" || m.role === "assistant"
      )
      .map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

    if (validMessages.length === 0) {
      return Response.json({ error: "No valid messages" }, { status: 400 });
    }

    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: getNDISSystemPrompt(),
        messages: validMessages,
      }),
    });

    if (!anthropicRes.ok) {
      const errBody = await anthropicRes.text();
      console.error("Anthropic error:", anthropicRes.status, errBody);
      return Response.json(
        { error: `AI服务错误 (${anthropicRes.status})` },
        { status: 500 }
      );
    }

    const data = await anthropicRes.json();
    const text =
      data.content?.[0]?.type === "text" ? data.content[0].text : "";

    return Response.json({ text });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Chat error:", errMsg);
    return Response.json({ error: `错误: ${errMsg.slice(0, 100)}` }, { status: 500 });
  }
}
