"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Brain,
  Send,
  RefreshCw,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { PRACTITIONER_QUESTIONS } from "@/lib/ndis-knowledge";
import { useI18n } from "@/lib/i18n";

const QUESTIONS_EN = [
  "How do I register as an NDIS Provider — and what does it cost?",
  "What does the 2026 reform mean for my operation?",
  "How do I read the NDIS price guide — what can I charge?",
  "As a new operator, how do I win my first clients, compliantly?",
  "What are the red lines I must never cross in NDIS?",
  "Doing NDIS + aged care — how do dual registration and hand-over work?",
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

function AIAdvisorContent() {
  const { lang } = useI18n();
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const q = searchParams.get("q");
      if (q) {
        sendMessage(q);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (overrideInput?: string) => {
    const text = (overrideInput ?? input).trim();
    if (!text || loading) return;

    const userMessage: Message = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Request failed");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.text },
      ]);
    } catch {
      const msg =
        lang === "en"
          ? "Sorry, the AI advisor is temporarily unavailable. Please try again in a moment, or join the group to ask directly."
          : "抱歉，AI 顾问暂时不可用，请稍后再试；或进群直接问。";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: msg },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center">
              <Brain className="text-gold-400" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold">
                {lang === "en" ? "NDIS Industry Advisor" : "NDIS 行业顾问"}
              </h1>
              <p className="text-blue-300 text-sm">
                {lang === "en"
                  ? "Entry · compliance · operations — for operators"
                  : "给从业者的入行 · 合规 · 经营答疑"}
              </p>
            </div>
            {messages.length > 0 && (
              <button
                onClick={resetChat}
                className="ml-auto flex items-center gap-1.5 text-sm text-blue-300 hover:text-white transition-colors"
              >
                <RefreshCw size={14} /> {lang === "en" ? "New chat" : "新对话"}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">

        {/* Empty state */}
        {messages.length === 0 && !loading && (
          <div className="py-8 mb-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-navy-900 flex items-center justify-center mx-auto mb-4">
                <Brain className="text-gold-400" size={28} />
              </div>
              <h2 className="text-xl font-bold text-navy-900 mb-2">
                {lang === "en"
                  ? "Hi — I'm your NDIS industry advisor"
                  : "你好！我是你的 NDIS 行业顾问"}
              </h2>
              <p className="text-gray-500 max-w-md mx-auto text-sm">
                {lang === "en"
                  ? "For NDIS operators — entry, registration, compliance, pricing, operations and B2B connections. Directional answers, fast."
                  : "面向 NDIS 从业者与生意人——入行、注册、合规、定价、经营、对接，给你有方向的答案。"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
              {(lang === "en" ? QUESTIONS_EN : PRACTITIONER_QUESTIONS).map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="flex items-center gap-2 bg-white rounded-xl border border-gray-100 px-4 py-3 text-sm text-gray-700 hover:border-navy-900 hover:text-navy-900 hover:shadow-sm transition-all text-left group"
                >
                  <ChevronRight
                    size={14}
                    className="text-gray-300 group-hover:text-navy-900 flex-shrink-0 transition-colors"
                  />
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.length > 0 && (
          <div className="space-y-4 mb-6">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "items-start gap-3"} message-enter`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center flex-shrink-0">
                    <Brain size={14} className="text-gold-600" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-navy-900 text-white rounded-tr-sm"
                      : "bg-white border border-gray-100 text-gray-700 rounded-tl-sm shadow-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center">
                  <Brain size={14} className="text-gold-600" />
                </div>
                <div className="flex gap-1 px-4 py-3 bg-white border border-gray-100 rounded-2xl rounded-tl-sm shadow-sm">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input */}
        <div className="sticky bottom-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                lang === "en"
                  ? "Ask your NDIS business question (Shift+Enter for newline, Enter to send)..."
                  : "输入你的NDIS问题（Shift+Enter换行，Enter发送）..."
              }
              rows={2}
              className="w-full px-4 pt-4 pb-2 text-sm text-gray-800 outline-none resize-none leading-relaxed"
              disabled={loading}
            />
            <div className="flex items-center justify-between px-4 py-2 border-t border-gray-50">
              <span className="text-xs text-gray-400">
                {lang === "en" ? "Based on official NDIS material" : "回答基于NDIS官方文件"}
              </span>
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="flex items-center gap-1.5 bg-navy-900 hover:bg-navy-800 disabled:bg-gray-200 disabled:cursor-not-allowed text-white disabled:text-gray-400 px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
              >
                <Send size={13} />
                {loading ? (lang === "en" ? "..." : "回答中...") : (lang === "en" ? "Send" : "发送")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AIAdvisorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin w-8 h-8 border-2 border-navy-900 border-t-transparent rounded-full" />
        </div>
      }
    >
      <AIAdvisorContent />
    </Suspense>
  );
}
