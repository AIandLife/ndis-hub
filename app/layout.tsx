import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  title: "澳洲NDIS圈 | 华人 NDIS 从业者的 B2B 资源与人脉平台",
  description:
    "面向澳洲华人 NDIS 从业者与生意人：商家资源库、行业 AI 顾问、入行与合规、上下游对接。找同行、找供应商、找合作。",
  keywords:
    "NDIS, 澳洲NDIS, 华人NDIS, NDIS商家, NDIS供应商, NDIS Provider, Support Coordinator, NDIS创业, NDIS合规, 养老 Aged Care",
  openGraph: {
    title: "澳洲NDIS圈 | 华人 NDIS 从业者的 B2B 资源与人脉平台",
    description: "面向澳洲华人 NDIS 从业者：商家资源库、行业 AI 顾问、上下游对接",
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
