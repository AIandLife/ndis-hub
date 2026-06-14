import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于澳洲NDIS圈 · 华人 NDIS 从业者的 B2B 网络",
  description:
    "澳洲NDIS圈（NDIS Circle）是面向华人 NDIS 从业者的 B2B 资源与人脉平台，澳洲商业联盟生态的一员。帮华人从业者入行、合规、对接、把生意做大。",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
