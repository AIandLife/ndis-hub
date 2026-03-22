import Anthropic from "@anthropic-ai/sdk";
import { getNDISSystemPrompt } from "@/lib/ndis-knowledge";
import { NextRequest } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    // Debug: check if API key is present
    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json(
        { error: "API密钥未配置，请联系管理员" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const validMessages = messages
      .filter(
        (m: { role: string; content: string }) =>
          m.role === "user" || m.role === "assistant"
      )
      .map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

    if (validMessages.length === 0) {
      return Response.json({ error: "No valid messages" }, { status: 400 });
    }

    const response = await anthropic.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 1024,
      system: getNDISSystemPrompt(),
      messages: validMessages,
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    return Response.json({ text });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Chat API error:", errMsg);
    return Response.json(
      { error: `服务错误: ${errMsg.slice(0, 100)}` },
      { status: 500 }
    );
  }
}
