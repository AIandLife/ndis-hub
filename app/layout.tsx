import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { I18nProvider } from "@/lib/i18n";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://ndiscircle.com"),
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
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
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
        <I18nProvider>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
