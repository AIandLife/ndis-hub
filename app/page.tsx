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
  Video,
  MapPin,
  Search,
} from "lucide-react";
import { fetchApprovedProviders } from "@/lib/resources";
import { PROVIDERS, type Provider } from "@/lib/providers-data";

const STATS = [
  { value: "76万+", label: "澳洲NDIS参与者（2025）" },
  { value: "$46B+", label: "年度行业规模" },
  { value: "10%+", label: "年增长，行业仍在扩张" },
  { value: "2026", label: "改革落地年 · 评估改3小时面谈" },
];

const VALUE_PROPS = [
  {
    icon: Brain,
    title: "AI 中文顾问",
    desc: "用中文提问，获得有方向性的NDIS专业回答。不是百科，是导航。",
    color: "text-blue-600",
    bg: "bg-blue-50",
    href: "/ai-advisor",
  },
  {
    icon: Users,
    title: "从业者社群",
    desc: "扫码进群，和悉尼/墨尔本/布里斯班的华人Provider、SC、PM在一个圈子里，不再单打独斗。",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    href: "#join",
  },
  {
    icon: TrendingUp,
    title: "上下游对接",
    desc: "圈内人脉、资源转介、合作撮合——你缺客户/缺供应商/缺合伙人，群里有人接得住。",
    color: "text-purple-600",
    bg: "bg-purple-50",
    href: "#join",
  },
];

const JOURNEY_STEPS = [
  { num: "01", title: "资格申请", desc: "准备诊断材料，提交Access Request" },
  { num: "02", title: "计划制定", desc: "与NDIS规划师讨论目标和支持需求" },
  { num: "03", title: "计划管理", desc: "选择Agency管理、Plan管理或自管" },
  { num: "04", title: "找 Provider", desc: "按需搜索，签署服务协议" },
  { num: "05", title: "使用服务", desc: "享受支持，追踪预算使用" },
  { num: "06", title: "计划审查", desc: "年度审查，调整支持和资金" },
];

export default function HomePage() {
  const [providers, setProviders] = useState<Provider[]>(PROVIDERS);

  useEffect(() => {
    fetchApprovedProviders().then(setProviders);
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
                华人 NDIS 从业者的 B2B 资源圈 · 2026改革实时更新
              </span>
            </div>

            {/* Animated Headline */}
            <AnimatedHeadline />

            <p className="text-lg text-blue-100 mb-8 max-w-2xl leading-relaxed">
              行业知识、合规工具、圈内人脉、上下游合作——用中文，帮NDIS从业者做对、做好、做大。
            </p>

            {/* Primary CTAs for practitioners */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link
                href="#join"
                className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-6 py-3.5 rounded-xl transition-colors"
              >
                <MessageCircle size={16} />
                扫码进 NDIS 从业者群
              </Link>
              <Link
                href="/ai-advisor"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors"
              >
                AI 行业顾问
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors"
              >
                查看入行课程
              </Link>
            </div>

            {/* Compliance-safe positioning line */}
            <div className="flex items-center gap-2 text-blue-300 text-sm">
              <span>面向 NDIS 行业从业者的 B2B 资源与人脉平台</span>
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
                  {stat.value}
                </div>
                <div className="text-sm text-blue-200 mt-1">{stat.label}</div>
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
              为什么来这里？
            </h2>
            <p className="text-gray-500">
              做 NDIS 生意，信息散、资源散、同行难找——这里把人、资源和机会聚到一起。
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
                  {prop.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {prop.desc}
                </p>
                <div
                  className={`flex items-center gap-1 mt-4 text-sm font-medium ${prop.color}`}
                >
                  了解更多 <ChevronRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RESOURCE LIBRARY SHOWCASE ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-navy-50 rounded-full px-3 py-1 mb-3">
                <Search size={13} className="text-navy-700" />
                <span className="text-navy-700 text-xs font-semibold">
                  NDIS 商家资源库
                </span>
              </div>
              <h2 className="text-3xl font-bold text-navy-900 mb-2">
                找同行、找供应商、找合作
              </h2>
              <p className="text-gray-500 max-w-xl">
                NDIS 服务机构与上游供应商的行业名录。带「待认领」的是公开信息整理——
                认领或新增你的生意，让这圈人找到你。
              </p>
            </div>
            <Link
              href="/providers"
              className="flex items-center gap-2 text-sm font-semibold text-navy-900 border-2 border-navy-900 px-4 py-2 rounded-xl hover:bg-navy-900 hover:text-white transition-colors whitespace-nowrap"
            >
              进入资源库 <ArrowRight size={14} />
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
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                    {p.listingType === "public" ? "待认领" : "已认证"}
                  </span>
                </div>
                <h3 className="font-bold text-navy-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {p.name}
                </h3>
                <div className="flex items-center gap-1.5 mb-2">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      p.category === "supplier"
                        ? "bg-purple-50 text-purple-700"
                        : "bg-navy-50 text-navy-700"
                    }`}
                  >
                    {p.category === "supplier" ? "上游供应商" : "服务机构"}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin size={11} />
                    {p.location}
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                  {p.description}
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
              入驻 / 认领你的生意
            </Link>
            <span className="text-gray-400 text-sm">
              免费 · 审核制 · 让上下游找到你
            </span>
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

            <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
              {/* Left: copy */}
              <div className="lg:col-span-3">
                <div className="inline-flex items-center gap-2 bg-gold-500/20 rounded-full px-3 py-1 mb-5">
                  <MessageCircle size={13} className="text-gold-400" />
                  <span className="text-gold-300 text-xs font-semibold">
                    免费 · 华人 NDIS 从业者专属
                  </span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 leading-snug">
                  扫码进群，<br />
                  加入澳洲华人 NDIS 从业者圈
                </h2>
                <p className="text-blue-200 mb-6 leading-relaxed max-w-xl">
                  这里聚集着全澳做 NDIS 的华人 Provider、Support Coordinator、
                  Plan Manager 和正在入行的人。进群你能：
                </p>
                <div className="space-y-2.5 mb-8">
                  {[
                    "第一时间拿到 2026 改革政策解读，不再靠猜",
                    "找上下游合作、转介客户、对接供应商和合伙人",
                    "遇到合规/定价/注册的坑，群里有人踩过帮你绕开",
                    "免费用站内 AI 中文顾问 + NDIS 全流程工具",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-gold-400 flex-shrink-0 mt-0.5" />
                      <span className="text-blue-100 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <Link
                    href="/providers?register=true"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
                  >
                    <Bell size={14} />
                    想进官方成员目录？申请入驻
                  </Link>
                  <span className="text-blue-300 text-xs">
                    ✓ 审核制 ✓ 圈内认证展示 ✓ 优先转介
                  </span>
                </div>
              </div>

              {/* Right: QR card */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-6 text-center shadow-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/wechat-qr.jpg"
                    alt="NDIS 同业交流群二维码"
                    className="w-44 h-44 mx-auto rounded-xl"
                  />
                  <div className="mt-4 font-bold text-navy-900">
                    扫码加入 NDIS 同业交流群
                  </div>
                  <div className="text-gray-500 text-xs mt-1">
                    微信扫一扫，进群和同行交流
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NDIS JOURNEY ─── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-navy-900 mb-2">
                NDIS 全流程图
              </h2>
              <p className="text-gray-500">
                从申请到服务，每一步都有中文指引
              </p>
            </div>
            <Link
              href="/journey"
              className="flex items-center gap-2 text-sm font-semibold text-navy-900 border-2 border-navy-900 px-4 py-2 rounded-xl hover:bg-navy-900 hover:text-white transition-colors"
            >
              查看完整流程图 <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {JOURNEY_STEPS.map((step, i) => (
              <Link
                key={i}
                href={`/journey#step-${i + 1}`}
                className="bg-white rounded-2xl p-4 border border-gray-100 card-hover group text-center"
              >
                <div className="w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center mx-auto mb-3 text-xs font-bold group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors">
                  {step.num}
                </div>
                <div className="text-navy-900 font-semibold text-sm mb-1">
                  {step.title}
                </div>
                <div className="text-gray-400 text-xs leading-relaxed">
                  {step.desc}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI ADVISOR PREVIEW ─── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-3 py-1 mb-4">
                <Zap size={13} className="text-blue-600" />
                <span className="text-blue-700 text-xs font-semibold">
                  AI 驱动 · 中文优先
                </span>
              </div>
              <h2 className="text-3xl font-bold text-navy-900 mb-4">
                做 NDIS 生意的
                <br />
                行业顾问
              </h2>
              <p className="text-gray-500 mb-6 leading-relaxed">
                面向 NDIS 从业者与生意人——入行注册、合规运营、定价、开拓客户、
                上下游对接。给你有方向、能落地的经营答案，不是病人答疑。
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "入行/注册/合规：做这行你必须知道的",
                  "定价与经营：怎么收费、怎么开拓第一批客户",
                  "2026年改革对从业者的影响，实时跟踪",
                  "只讲生意，不针对参与者个人做指导（合规）",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle size={15} className="text-emerald-500 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/ai-advisor"
                className="inline-flex items-center gap-2 bg-navy-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-navy-800 transition-colors"
              >
                开始提问 <ArrowRight size={16} />
              </Link>
            </div>

            {/* Chat mockup */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden">
              <div className="bg-navy-900 px-5 py-3 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gold-500/30 flex items-center justify-center">
                  <Brain size={14} className="text-gold-400" />
                </div>
                <span className="text-white text-sm font-medium">
                  NDIS AI 顾问
                </span>
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-green-400 text-xs">在线</span>
                </div>
              </div>
              <div className="p-5 space-y-4 min-h-[280px]">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="bg-navy-900 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[75%] text-sm">
                    我想注册成为 NDIS Provider，第一步该做什么？成本大概多少？
                  </div>
                </div>
                {/* AI response */}
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center flex-shrink-0">
                    <Brain size={13} className="text-gold-600" />
                  </div>
                  <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] text-sm text-gray-700 leading-relaxed">
                    先想清楚做哪类服务——决定你走<strong>注册</strong>还是<strong>未注册</strong>路线、要不要 SIL/SDA 这类高资质类别。
                    <br /><br />
                    <strong>第一步：</strong>到 NDIS Commission 提交 Provider 注册申请，同时给直接服务员工办 Worker Screening Check。
                    <br /><br />
                    成本主要在<strong>认证审核（按服务类别）</strong>和合规体系搭建...
                    <span className="text-blue-600 cursor-pointer"> 继续阅读</span>
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
                  <span className="text-gray-400 text-xs">AI正在回答...</span>
                </div>
              </div>
              <div className="border-t border-gray-100 px-4 py-3">
                <Link
                  href="/ai-advisor"
                  className="flex items-center justify-center gap-2 text-navy-900 text-sm font-semibold hover:text-blue-600 transition-colors"
                >
                  点击继续对话 <ArrowRight size={14} />
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
              澳洲商业联盟生态矩阵
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            {[
              {
                name: "澳洲商业联盟",
                desc: "华人商业圈子总站",
                href: "https://www.australiabusinessalliance.com",
                active: false,
              },
              {
                name: "澳洲NDIS圈",
                desc: "NDIS行业专业平台",
                href: "/",
                active: true,
              },
              {
                name: "澳洲房产圈",
                desc: "房产投资智能导航",
                href: "https://auspropertycircle.com",
                active: false,
              },
              {
                name: "澳洲建房圈",
                desc: "建房项目专业平台",
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

      {/* ─── COURSES CTA ─── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gold-50 to-amber-50 border border-gold-200 rounded-3xl p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-gold-500/20 rounded-full px-3 py-1 mb-4">
                  <Video size={13} className="text-gold-600" />
                  <span className="text-gold-700 text-xs font-semibold">
                    华人NDIS从业者专属
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-navy-900 mb-3">
                  想进入 NDIS 行业？先学对再入场
                </h2>
                <p className="text-gray-600 mb-4">
                  从注册入行到合规运营，全中文课程。
                  避开华人Provider最常见的坑，用最短时间做对。
                </p>
                <div className="flex flex-wrap gap-4">
                  {[
                    "Provider注册全流程",
                    "合规与定价",
                    "Support Coordinator技能",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-1.5 text-sm text-gray-700">
                      <CheckCircle size={14} className="text-gold-600" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0">
                <Link
                  href="/courses"
                  className="inline-flex items-center justify-center gap-2 bg-navy-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-navy-800 transition-colors"
                >
                  查看所有课程 <ArrowRight size={15} />
                </Link>
                <Link
                  href="/ai-advisor?q=我想进入NDIS行业，应该怎么开始？"
                  className="inline-flex items-center justify-center gap-2 border-2 border-navy-900 text-navy-900 font-semibold px-6 py-3 rounded-xl hover:bg-navy-900 hover:text-white transition-colors text-sm"
                >
                  问AI帮我规划路径
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-navy-900 mb-4">
            你在 NDIS 行业做生意？
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            扫码进澳洲华人 NDIS 从业者群，建立人脉、
            拓展上下游合作，共同把生意做大。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="#join"
              className="inline-flex items-center justify-center gap-2 bg-navy-900 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-navy-800 transition-colors"
            >
              扫码进群 <ArrowRight size={16} />
            </Link>
            <Link
              href="/ai-advisor"
              className="inline-flex items-center justify-center gap-2 border-2 border-navy-900 text-navy-900 font-bold px-8 py-3.5 rounded-xl hover:bg-navy-900 hover:text-white transition-colors"
            >
              先试试 AI 顾问
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
