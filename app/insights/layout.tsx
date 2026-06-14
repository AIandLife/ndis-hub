import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NDIS 行业情报 · 2026改革解读 · 入行与合规指南",
  description:
    "做 NDIS 生意要知道的：2026 改革（3小时评估、增长降速）解读、怎么注册成为 NDIS Provider、Plan Manager 怎么收费、合规要点与客户全流程。中文行业情报。",
  alternates: { canonical: "/insights" },
};

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
