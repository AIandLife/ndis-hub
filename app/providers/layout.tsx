import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NDIS 商家资源库 · 全澳华人 Provider 与供应商名录",
  description:
    "全澳做 NDIS 的华人圈内成员 + 行业公开资源名录：Support Coordination、Plan Management、SIL/SDA、辅助技术、记账法律等。找同行、找供应商、找合作，直接对接。",
  alternates: { canonical: "/providers" },
};

export default function ProvidersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
