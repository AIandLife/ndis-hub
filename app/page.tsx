"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import {
  Brain,
  Users,
  TrendingUp,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  Zap,
  MessageCircle,
  ExternalLink,
  Bell,
  MapPin,
  Search,
} from "lucide-react";
import { fetchApprovedProviders } from "@/lib/resources";
import { PROVIDERS, type Provider } from "@/lib/providers-data";
import { useI18n } from "@/lib/i18n";
import { cityLabel, catLabel } from "@/lib/labels";

const STATS = [
  { value: "76万+", valueEn: "761K+", label: "stat.participants" },
  { value: "$46B+", valueEn: "$46B+", label: "stat.marketSize" },
  { value: "10%+", valueEn: "10%+", label: "stat.growth" },
  { value: "2026", valueEn: "2026", label: "stat.reformYear" },
];

const VALUE_PROPS = [
  {
    icon: Brain,
    titleKey: "vp.ai.t",
    descKey: "vp.ai.d",
    color: "text-blue-600",
    bg: "bg-blue-50",
    href: "/ai-advisor",
  },
  {
    icon: Users,
    titleKey: "vp.community.t",
    descKey: "vp.community.d",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    href: "#join",
  },
  {
    icon: TrendingUp,
    titleKey: "vp.board.t",
    descKey: "vp.board.d",
    color: "text-gold-600",
    bg: "bg-gold-50",
    href: "/board",
  },
];

interface NeedPreview {
  id: string;
  need: string;
  needEn?: string;
  who: string;
  city: string;
  category: string;
  member: boolean;
}

function guessCat(text: string): string {
  if (/招|员工|support worker|护士|治疗师|人才|加入团队/i.test(text)) return "找员工";
  if (/客户|转介|referral|获客|客源/i.test(text)) return "找客户";
  if (/供应商|采购|建材|供货/i.test(text)) return "找供应商";
  if (/买家|卖|收购|并购|转让/i.test(text)) return "买卖生意";
  if (/房源|场地|物业|租/i.test(text)) return "找场地";
  return "找合作";
}

export default function HomePage() {
  const { lang, t } = useI18n();
  const [providers, setProviders] = useState<Provider[]>(PROVIDERS);
  const [needs, setNeeds] = useState<NeedPreview[]>([]);

  useEffect(() => {
    fetchApprovedProviders().then((ps) => {
      setProviders(ps);
      // 对接大厅首页预览：取圈内成员的「需」
      const memberNeeds: NeedPreview[] = ps
        .filter((p) => p.needs && p.needs.length > 8)
        .slice(0, 8)
        .map((p) => ({
          id: `m-${p.id}`,
          need: p.needsZh || (p.needs as string),
          needEn: p.needsEn || (p.needs as string),
          who: p.chineseName || p.name,
          city: p.location,
          category: guessCat(p.needs as string),
          member: true,
        }));
      setNeeds(memberNeeds);
    });
    // 自助发布的需求（有就并入预览，排前面）
    fetch("/api/demands")
      .then((r) => r.json())
      .then(({ demands }) => {
        if (Array.isArray(demands) && demands.length) {
          const d: NeedPreview[] = demands.slice(0, 4).map((x: { id: string; title: string; submitter_name: string; city: string; category: string; tr?: { zh?: { title?: string }; en?: { title?: string } } }) => ({
            id: `d-${x.id}`,
            need: x.tr?.zh?.title || x.title,
            needEn: x.tr?.en?.title || x.title,
            who: x.submitter_name,
            city: x.city,
            category: x.category,
            member: false,
          }));
          setNeeds((prev) => [...d, ...prev].slice(0, 8));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen">
      {/* ─── HERO ─── */}
      <section className="hero-bg relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, #F5A623 0%, transparent 50%), radial-gradient(circle at 75% 75%, #0EA5E9 0%, transparent 50%)",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm border border-white/20">
              <div className="pulse-dot" />
              <span className="text-white/90 text-sm font-medium">
                {t("hero.badge")}
              </span>
            </div>

            {/* Animated Headline */}
            <AnimatedHeadline />

            <p className="text-lg text-blue-100 mb-8 max-w-2xl leading-relaxed">
              {t("hero.sub")}
            </p>

            {/* Primary CTAs for practitioners */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link
                href="#join"
                className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-6 py-3.5 rounded-xl transition-colors"
              >
                <MessageCircle size={16} />
                <span className="sm:hidden">{t("hero.ctaJoinMobile")}</span>
                <span className="hidden sm:inline">{t("hero.ctaJoin")}</span>
              </Link>
              <Link
                href="/ai-advisor"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors"
              >
                {t("hero.ctaAi")}
              </Link>
              <Link
                href="/board"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors"
              >
                {t("hero.ctaBoard")}
              </Link>
            </div>

            {/* Compliance-safe positioning line */}
            <div className="flex items-center gap-2 text-blue-300 text-sm">
              <span>{t("hero.posLine")}</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              >
                <div className="text-2xl font-bold text-gold-400">
                  {lang === "en" ? stat.valueEn : stat.value}
                </div>
                <div className="text-sm text-blue-200 mt-1">{t(stat.label)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUE PROPS ─── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-3">
              {t("vp.why")}
            </h2>
            <p className="text-gray-500">
              {t("vp.whySub")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUE_PROPS.map((prop, i) => (
              <Link
                key={i}
                href={prop.href}
                className="bg-white rounded-2xl p-6 card-hover border border-gray-100 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${prop.bg} flex items-center justify-center mb-4`}
                >
                  <prop.icon className={`${prop.color}`} size={22} />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {t(prop.titleKey)}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t(prop.descKey)}
                </p>
                <div
                  className={`flex items-center gap-1 mt-4 text-sm font-medium ${prop.color}`}
                >
                  {t("common.learnMore")} <ChevronRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MARKETPLACE LIVE PREVIEW (差异化明星功能，靠前) ─── */}
      {needs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 bg-emerald-50 rounded-full px-3 py-1 mb-3">
                  <span className="pulse-dot" style={{ background: "#10b981" }} />
                  <span className="text-emerald-700 text-xs font-semibold">
                    {t("mp.tag")}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-navy-900 mb-2">
                  {t("mp.title")}
                </h2>
                <p className="text-gray-500 max-w-xl">{t("mp.sub")}</p>
              </div>
              <Link
                href="/board"
                className="flex items-center gap-2 text-sm font-semibold text-navy-900 border-2 border-navy-900 px-4 py-2 rounded-xl hover:bg-navy-900 hover:text-white transition-colors whitespace-nowrap"
              >
                {t("mp.browse")} <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {needs.slice(0, 6).map((n) => (
                <Link
                  key={n.id}
                  href="/board"
                  className="bg-gray-50 rounded-2xl border border-gray-100 p-5 card-hover group"
                >
                  <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                    <span className="text-xs bg-navy-50 text-navy-700 px-2 py-0.5 rounded-full font-semibold">
                      {catLabel(n.category, lang)}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin size={11} />
                      {cityLabel(n.city, lang)}
                    </span>
                    {n.member && (
                      <span className="text-xs text-emerald-600 font-medium">
                        {t("board.member")}
                      </span>
                    )}
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-gold-500 font-bold text-xs mt-0.5 flex-shrink-0">
                      {t("mp.lookingFor")}:
                    </span>
                    <p className="text-navy-900 text-sm font-medium leading-relaxed line-clamp-2">
                      {lang === "en" && n.needEn ? n.needEn : n.need}
                    </p>
                  </div>
                  <div className="text-gray-400 text-xs mt-3">{n.who}</div>
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/board?post=1"
                className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-6 py-3 rounded-xl transition-colors"
              >
                <Bell size={16} />
                {t("mp.post")}
              </Link>
              <span className="text-gray-400 text-sm text-center">{t("mp.split")}</span>
            </div>
          </div>
        </section>
      )}

      {/* ─── RESOURCE LIBRARY SHOWCASE ─── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-navy-50 rounded-full px-3 py-1 mb-3">
                <Search size={13} className="text-navy-700" />
                <span className="text-navy-700 text-xs font-semibold">
                  {t("lib.tag")}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-navy-900 mb-2">
                {t("lib.title")}
              </h2>
              <p className="text-gray-500 max-w-xl">
                {t("lib.showcaseSub")}
              </p>
            </div>
            <Link
              href="/providers"
              className="flex items-center gap-2 text-sm font-semibold text-navy-900 border-2 border-navy-900 px-4 py-2 rounded-xl hover:bg-navy-900 hover:text-white transition-colors whitespace-nowrap"
            >
              {t("lib.enter")} <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {providers.slice(0, 6).map((p) => (
              <Link
                key={p.id}
                href="/providers"
                className="bg-white rounded-2xl border border-gray-100 p-5 card-hover group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-navy-50 border border-navy-100 flex items-center justify-center">
                    <span className="text-navy-900 font-bold">{p.name[0]}</span>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      p.listingType === "claimed"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {p.listingType === "claimed" ? t("lib.member") : t("lib.public")}
                  </span>
                </div>
                <h3 className="font-bold text-navy-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {p.name}
                </h3>
                <div className="flex items-center gap-1.5 mb-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      p.category === "supplier"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-navy-50 text-navy-700"
                    }`}
                  >
                    {p.category === "supplier" ? t("lib.supplier") : t("lib.provider")}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin size={11} />
                    {cityLabel(p.location, lang)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                  {lang === "en" && p.descriptionEn ? p.descriptionEn : p.description}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/providers?register=true"
              className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-6 py-3 rounded-xl transition-colors"
            >
              <Bell size={16} />
              {t("lib.listFree")}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── JOIN THE COMMUNITY (PRIMARY CONVERSION) ─── */}
      <section id="join" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-navy-900 to-navy-950 rounded-3xl p-8 lg:p-12 text-white overflow-hidden relative">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full translate-y-12 -translate-x-12" />

            <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-stretch">
              {/* Left: copy */}
              <div className="lg:col-span-3">
                <div className="inline-flex items-center gap-2 bg-gold-500/20 rounded-full px-3 py-1 mb-5">
                  <MessageCircle size={13} className="text-gold-400" />
                  <span className="text-gold-300 text-xs font-semibold">
                    {t("join.badge")}
                  </span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 leading-snug">
                  {t("join.h")}
                </h2>
                <p className="text-blue-200 mb-6 leading-relaxed max-w-xl">
                  {t("join.intro")}
                </p>
                <div className="space-y-2.5 mb-8">
                  {["join.b1", "join.b2", "join.b3", "join.b4"].map((k) => (
                    <div key={k} className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-gold-400 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-100 text-sm">{t(k)}</span>
                    </div>
                  ))}
                </div>

                {/* 真实线下活动照片（信任证据） */}
                <div className="relative rounded-2xl overflow-hidden mb-8 border border-white/15">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/event-ndis-sydney.jpg"
                    alt="NDIS 生意线下交流会现场 · 悉尼"
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy-950/90 to-transparent px-4 pt-10 pb-3">
                    <span className="text-white text-sm font-medium">
                      {t("join.photoCaption")}
                    </span>
                    <span className="text-blue-300 text-xs ml-2">
                      {t("join.photoNote")}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <Link
                    href="/providers?register=true"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
                  >
                    <Bell size={14} />
                    {t("join.applyDirectory")}
                  </Link>
                  <span className="text-blue-300 text-xs">
                    {t("join.applyNote")}
                  </span>
                </div>
              </div>

              {/* Right: QR card（与左栏等高的完整面板） */}
              <div className="lg:col-span-2 flex">
                <div className="bg-white rounded-2xl p-7 text-center shadow-xl w-full flex flex-col justify-center">
                  <div className="inline-flex items-center justify-center gap-1.5 mx-auto bg-emerald-50 rounded-full px-3 py-1 mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-emerald-700 text-xs font-semibold">
                      {t("join.coverage")}
                    </span>
                  </div>
                  <div className="mx-auto p-2 rounded-2xl border-2 border-gold-200 bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/wechat-qr.jpg"
                      alt="NDIS group QR code"
                      className="w-52 h-52 rounded-xl"
                    />
                  </div>
                  <div className="mt-5 font-bold text-navy-900 text-lg">
                    {t("join.cardTitle")}
                  </div>
                  {/* 手机上无法"扫"自己屏幕上的码，提示长按识别 */}
                  <div className="text-gray-500 text-xs mt-1 sm:hidden">
                    {t("join.scanMobile")}
                  </div>
                  <div className="text-gray-500 text-xs mt-1 hidden sm:block">
                    {t("join.scanDesktop")}
                  </div>

                  <div className="border-t border-gray-100 mt-5 pt-5 grid grid-cols-3 gap-2">
                    {[
                      ["1", "join.step1"],
                      ["2", "join.step2"],
                      ["3", "join.step3"],
                    ].map(([n, k]) => (
                      <div key={n} className="flex flex-col items-center gap-1.5">
                        <span className="w-6 h-6 rounded-full bg-navy-900 text-gold-400 text-xs font-bold flex items-center justify-center">
                          {n}
                        </span>
                        <span className="text-gray-500 text-xs">{t(k)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AI ADVISOR PREVIEW ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-3 py-1 mb-4">
                <Zap size={13} className="text-blue-600" />
                <span className="text-blue-700 text-xs font-semibold">
                  {t("aip.badge")}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-navy-900 mb-4">
                {t("aip.title")}
              </h2>
              <p className="text-gray-500 mb-6 leading-relaxed">
                {t("aip.sub")}
              </p>
              <div className="space-y-3 mb-8">
                {["aip.b1", "aip.b2", "aip.b3", "aip.b4"].map((k) => (
                  <div key={k} className="flex items-center gap-2">
                    <CheckCircle size={15} className="text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{t(k)}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/ai-advisor"
                className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-navy-800 transition-colors"
              >
                {t("aip.start")} <ArrowRight size={16} />
              </Link>
            </div>

            {/* Chat mockup */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden">
              <div className="bg-navy-900 px-5 py-3 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gold-500/30 flex items-center justify-center">
                  <Brain size={14} className="text-gold-400" />
                </div>
                <span className="text-white text-sm font-medium">
                  {t("vp.ai.t")}
                </span>
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-green-400 text-xs">{t("aip.online")}</span>
                </div>
              </div>
              <div className="p-5 space-y-4 min-h-[280px]">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="bg-navy-900 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[75%] text-sm">
                    {t("aip.userMsg")}
                  </div>
                </div>
                {/* AI response */}
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center flex-shrink-0">
                    <Brain size={13} className="text-gold-600" />
                  </div>
                  <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] text-sm text-gray-700 leading-relaxed">
                    {lang === "en" ? (
                      <>
                        First decide which services you&apos;ll offer — that sets whether you go <strong>registered</strong> or <strong>unregistered</strong>, and whether you need high-bar categories like SIL/SDA.
                        <br /><br />
                        <strong>Step 1:</strong> submit a Provider registration to the NDIS Commission, and arrange Worker Screening Checks for frontline staff.
                        <br /><br />
                        Most of the cost is in <strong>certification audits (by service type)</strong> and building your compliance system...
                      </>
                    ) : (
                      <>
                        先想清楚做哪类服务——决定你走<strong>注册</strong>还是<strong>未注册</strong>路线、要不要 SIL/SDA 这类高资质类别。
                        <br /><br />
                        <strong>第一步：</strong>到 NDIS Commission 提交 Provider 注册申请，同时给直接服务员工办 Worker Screening Check。
                        <br /><br />
                        成本主要在<strong>认证审核（按服务类别）</strong>和合规体系搭建...
                      </>
                    )}
                    <span className="text-blue-600 cursor-pointer">{t("aip.continueRead")}</span>
                  </div>
                </div>
                {/* Typing indicator */}
                <div className="flex items-center gap-2 pl-9">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-xs">{t("aip.typing")}</span>
                </div>
              </div>
              <div className="border-t border-gray-100 px-4 py-3">
                <Link
                  href="/ai-advisor"
                  className="flex items-center justify-center gap-2 text-navy-900 text-sm font-semibold hover:text-blue-600 transition-colors"
                >
                  {t("aip.continueChat")} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── ECOSYSTEM ─── */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">
              {t("eco.title")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            {[
              {
                name: lang === "en" ? "Business Alliance" : "澳洲商业联盟",
                desc: lang === "en" ? "Main hub" : "华人商业圈子总站",
                href: "https://www.australiabusinessalliance.com",
                active: false,
              },
              {
                name: lang === "en" ? "NDIS Hub" : "澳洲NDIS圈",
                desc: lang === "en" ? "NDIS professionals" : "NDIS行业专业平台",
                href: "/",
                active: true,
              },
              {
                name: lang === "en" ? "Property Circle" : "澳洲房产圈",
                desc: lang === "en" ? "Property investing" : "房产投资智能导航",
                href: "https://auspropertycircle.com",
                active: false,
              },
              {
                name: lang === "en" ? "Build Circle" : "澳洲建房圈",
                desc: lang === "en" ? "Home building" : "建房项目专业平台",
                href: "https://ausbuildcircle.com",
                active: false,
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target={item.active ? "_self" : "_blank"}
                rel="noopener noreferrer"
                className={`flex flex-col items-center px-6 py-4 rounded-2xl border-2 transition-all ${
                  item.active
                    ? "border-navy-900 bg-navy-900 text-white"
                    : "border-gray-100 hover:border-navy-200 text-gray-700 hover:text-navy-900"
                }`}
              >
                <div className="font-bold text-sm mb-0.5">{item.name}</div>
                <div
                  className={`text-xs ${item.active ? "text-blue-200" : "text-gray-400"}`}
                >
                  {item.desc}
                </div>
                {!item.active && (
                  <ExternalLink
                    size={11}
                    className="mt-2 text-gray-300"
                  />
                )}
              </a>
            ))}
          </div>
        </div>
      </section>


      {/* ─── FINAL CTA ─── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-4">
            {t("final.title")}
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            {t("final.sub")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="#join"
              className="inline-flex items-center justify-center gap-2 bg-navy-900 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-navy-800 transition-colors"
            >
              {t("final.join")} <ArrowRight size={16} />
            </Link>
            <Link
              href="/ai-advisor"
              className="inline-flex items-center justify-center gap-2 border-2 border-navy-900 text-navy-900 font-bold px-8 py-3.5 rounded-xl hover:bg-navy-900 hover:text-white transition-colors"
            >
              {t("final.tryAi")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
