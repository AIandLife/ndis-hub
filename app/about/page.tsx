"use client";

import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Shield,
  Users,
  Brain,
  Heart,
} from "lucide-react";
import JoinBanner from "@/components/JoinBanner";
import { useI18n } from "@/lib/i18n";

export default function AboutPage() {
  const { lang } = useI18n();
  const en = lang === "en";

  const OFFERS = [
    {
      icon: Brain,
      bg: "bg-blue-50",
      color: "text-blue-600",
      t: en ? "AI-powered, accurate" : "AI 驱动，专业准确",
      d: en
        ? "A Chinese-language knowledge base built on official NDIS sources — directional answers, not a vague 'see a professional'."
        : "基于 NDIS 官方文件的中文知识库，AI 顾问给有方向的答案，而不是泛泛的「请咨询专业人士」。",
    },
    {
      icon: Users,
      bg: "bg-gold-50",
      color: "text-gold-600",
      t: en ? "A real community" : "真实社群",
      d: en
        ? "Online platform connected to offline meetups — each event draws hundreds of Chinese NDIS operators."
        : "线上平台连接线下社群，每场活动吸引数百位华人 NDIS 从业者。",
    },
    {
      icon: Shield,
      bg: "bg-green-50",
      color: "text-green-600",
      t: en ? "Trustworthy" : "内容可信",
      d: en
        ? "Sourced from official NDIS material and experienced advisors. AI answers carry clear disclaimers."
        : "内容来源 NDIS 官方文件 + 资深顾问审核，AI 答案带明确免责声明。",
    },
    {
      icon: Heart,
      bg: "bg-navy-50",
      color: "text-navy-700",
      t: en ? "Part of an ecosystem" : "华人生态",
      d: en
        ? "Part of the Australia Business Alliance ecosystem, connected with property, migration and other Chinese-community platforms."
        : "澳洲NDIS圈是澳洲商业联盟生态成员，与房产、移民等华人服务平台互联。",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-navy-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            {en ? "About NDIS Circle" : "关于澳洲NDIS圈"}
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            {en
              ? "We're Chinese-Australians who know first-hand how language and cultural barriers get in the way — so we built this platform."
              : "我们是一群在澳洲生活的华人，深知语言和文化障碍带来的困扰——所以建立了这个平台。"}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission */}
        <div className="bg-white rounded-3xl p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-navy-900 mb-4">
            {en ? "Our mission" : "我们的使命"}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            {en
              ? "Australia's NDIS is a $46B+ industry — but for Chinese operators, language barriers, complex compliance and scattered resources make the business far harder than it looks."
              : "澳洲 NDIS 是一个超过 $460 亿的行业，但对华人从业者来说，语言障碍、合规复杂和资源分散，让做这门生意远比想象中难。"}
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            {en
              ? "At every meetup, operators arrive with business questions — “How do I enter, and what does it cost?” “How do I win my first clients, compliantly?” “I want to supply this industry — how do I reach these people?”"
              : "每次线下活动，都有大量华人从业者带着生意问题而来——「我想入行，需要什么资质和成本？」「怎么合规地开拓第一批客户？」「想给 NDIS 行业供货，怎么对接上这圈人？」"}
          </p>
          <p className="text-gray-600 leading-relaxed">
            <strong className="text-navy-900">
              {en
                ? "Our mission: help every Chinese NDIS operator find their way into the industry, stay compliant, run the business, and connect up and down the chain."
                : "我们的使命：让每一位华人 NDIS 从业者，都能找到入行、合规、经营和上下游对接的方向。"}
            </strong>
          </p>
        </div>

        {/* Offers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          {OFFERS.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6">
              <div
                className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-4`}
              >
                <item.icon className={item.color} size={18} />
              </div>
              <h3 className="font-bold text-navy-900 mb-2">{item.t}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
          <h3 className="font-semibold text-amber-900 mb-3">
            {en ? "Disclaimer" : "重要免责声明"}
          </h3>
          <p className="text-amber-800 text-sm leading-relaxed">
            {en
              ? "Everything on NDIS Circle (AI answers, articles, listings) is for reference only and is not legal, medical or financial advice. NDIS policy changes — always check "
              : "本平台所有信息（AI 回答、文章、商家信息）均仅供参考，不构成法律、医疗或财务建议。NDIS 政策可能随时更新，请以"}
            <a
              href="https://ndis.gov.au"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-700 underline mx-1"
            >
              ndis.gov.au
            </a>
            {en
              ? " for the latest. For decisions like appeals or reviews, consult a registered NDIS professional."
              : "最新信息为准。重要决定（如申诉、投诉、计划审查）请咨询持牌 NDIS 专业人士。"}
          </p>
        </div>

        {/* Ecosystem */}
        <div className="bg-navy-900 rounded-3xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">
            {en ? "Australia Business Alliance ecosystem" : "澳洲商业联盟生态"}
          </h2>
          <p className="text-blue-300 mb-6 text-sm">
            {en
              ? "NDIS Circle is a vertical in the Australia Business Alliance ecosystem, supporting the Chinese community across Australia."
              : "澳洲NDIS圈是澳洲商业联盟的垂直生态成员，共同为华人在澳发展提供专业支持。"}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://www.australiabusinessalliance.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              {en ? "Australia Business Alliance" : "访问澳洲商业联盟"}{" "}
              <ExternalLink size={14} />
            </a>
            <a
              href="https://auspropertycircle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              {en ? "Property Circle" : "澳洲房产圈"} <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-gray-500 mb-4">
            {en ? "Want to partner or get in touch?" : "有合作意向或想联系我们？"}
          </p>
          <Link
            href="/ai-advisor"
            className="inline-flex items-center gap-2 bg-navy-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-navy-800 transition-colors"
          >
            {en ? "Try the AI Advisor" : "先试试 AI 顾问"} <ArrowRight size={15} />
          </Link>
        </div>
      </div>
      <JoinBanner />
    </div>
  );
}
