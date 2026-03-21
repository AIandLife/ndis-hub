import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "澳洲NDIS圈 | 华人NDIS专业导航平台",
  description:
    "澳洲华人NDIS与养老行业专业平台。AI智能问答、精准Provider匹配、行业知识库。用中文，找到你的NDIS方向。",
  keywords:
    "NDIS, 澳洲NDIS, 华人NDIS, NDIS中文, Provider匹配, 养老, Aged Care, 残障服务",
  openGraph: {
    title: "澳洲NDIS圈 | 华人NDIS专业导航平台",
    description: "澳洲华人NDIS与养老行业专业平台",
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="bg-white text-gray-900 min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
