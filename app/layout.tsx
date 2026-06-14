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
  title: {
    default: "澳洲NDIS圈 | 华人 NDIS 从业者的 B2B 资源与人脉平台",
    template: "%s | 澳洲NDIS圈 NDIS Circle",
  },
  description:
    "面向澳洲华人 NDIS 从业者与生意人：商家资源库、行业 AI 顾问、入行与合规、上下游对接。找同行、找供应商、找合作。",
  keywords:
    "NDIS, 澳洲NDIS, 华人NDIS, NDIS商家, NDIS供应商, NDIS Provider, Support Coordinator, Plan Manager, NDIS注册, NDIS创业, NDIS合规, 养老 Aged Care",
  alternates: { canonical: "/" },
  openGraph: {
    title: "澳洲NDIS圈 | 华人 NDIS 从业者的 B2B 资源与人脉平台",
    description: "面向澳洲华人 NDIS 从业者：商家资源库、行业 AI 顾问、上下游对接",
    siteName: "澳洲NDIS圈 NDIS Circle",
    url: "https://ndiscircle.com",
    locale: "zh_CN",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

// 结构化数据：让 Google 认得这是个机构 + 站内搜索，利于富摘要与品牌识别。
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://ndiscircle.com/#org",
      name: "澳洲NDIS圈 NDIS Circle",
      alternateName: "NDIS Circle AU",
      url: "https://ndiscircle.com",
      logo: "https://ndiscircle.com/og-image.png",
      description:
        "面向澳洲华人 NDIS 从业者的 B2B 资源与人脉平台：商家资源库、行业 AI 顾问、上下游对接。",
      areaServed: "AU",
      sameAs: [
        "https://www.australiabusinessalliance.com",
        "https://auspropertycircle.com",
        "https://ausbuildcircle.com",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://ndiscircle.com/#website",
      url: "https://ndiscircle.com",
      name: "澳洲NDIS圈 NDIS Circle",
      publisher: { "@id": "https://ndiscircle.com/#org" },
      inLanguage: ["zh-CN", "en-AU"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="bg-white text-gray-900 min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
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
