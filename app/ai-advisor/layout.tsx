import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NDIS AI 中文顾问 · 入行 注册 合规 定价 在线问答",
  description:
    "用中文向 AI 提问 NDIS 经营问题：怎么入行、如何注册成为 Provider、合规要点、定价与开拓客户、2026 改革影响。面向从业者与生意人的有方向、能落地的回答。",
  alternates: { canonical: "/ai-advisor" },
};

export default function AiAdvisorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
