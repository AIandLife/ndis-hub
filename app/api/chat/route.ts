import Anthropic from "@anthropic-ai/sdk";
import { getNDISSystemPrompt } from "@/lib/ndis-knowledge";
import { NextRequest } from "next/server";

export const maxDuration = 30;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

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
    console.error("Chat API error:", error);
    return Response.json(
      { error: "AI服务暂时不可用，请稍后再试" },
      { status: 500 }
    );
  }
}
