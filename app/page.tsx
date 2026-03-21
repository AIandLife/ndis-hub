"use client";

import Link from "next/link";
import {
  Brain,
  MapPin,
  Users,
  TrendingUp,
  ChevronRight,
  Star,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  MessageCircle,
  ExternalLink,
  Bell,
  BarChart3,
} from "lucide-react";
import { PROVIDERS, WEEKLY_DEMAND } from "@/lib/providers-data";
import { SAMPLE_QUESTIONS } from "@/lib/ndis-knowledge";

const STATS = [
  { value: "450,000+", label: "澳洲NDIS参与者" },
  { value: "$42B", label: "年度NDIS预算" },
  { value: "80%+", label: "华人家庭信息获取难" },
  { value: "3小时", label: "2026年新评估时长" },
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
    icon: MapPin,
    title: "精准 Provider 匹配",
    desc: "按服务类型、地区、语言筛选华人Provider。填需求，我们帮你配。",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    href: "/providers",
  },
  {
    icon: Users,
    title: "行业圈子",
    desc: "与其他华人Provider、参与者家属、Support Coordinator交流，不再单打独斗。",
    color: "text-purple-600",
    bg: "bg-purple-50",
    href: "/resources",
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
  const featuredProviders = PROVIDERS.filter((p) => p.featured).slice(0, 3);
  const sampleQs = SAMPLE_QUESTIONS.slice(0, 4);

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
                澳洲首个华人NDIS专业平台 · 2026改革实时更新
              </span>
            </div>

            {/* Headline */}
            <h1 className="hero-title text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
              NDIS 复杂？
              <br />
              <span className="gradient-text">让 AI 帮你找方向</span>
            </h1>

            <p className="text-lg text-blue-100 mb-8 max-w-2xl leading-relaxed">
              无论你是参与者家属、服务提供商，还是想进入这个行业的创业者——
              用中文，在这里找到你需要的答案和人脉。
            </p>

            {/* Quick AI input */}
            <div className="bg-white rounded-2xl p-1.5 mb-6 shadow-2xl max-w-2xl">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="输入你的NDIS问题，例如：我孩子刚诊断自闭症..."
                  className="flex-1 px-4 py-3 text-gray-800 text-sm outline-none rounded-xl bg-transparent"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const val = (e.target as HTMLInputElement).value;
                      if (val.trim()) {
                        window.location.href = `/ai-advisor?q=${encodeURIComponent(val)}`;
                      }
                    }
                  }}
                />
                <Link
                  href="/ai-advisor"
                  className="bg-navy-900 text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors flex items-center gap-1 whitespace-nowrap"
                >
                  AI 问答 <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Sample questions */}
            <div className="flex flex-wrap gap-2">
              {sampleQs.map((q, i) => (
                <Link
                  key={i}
                  href={`/ai-advisor?q=${encodeURIComponent(q)}`}
                  className="text-xs bg-white/10 hover:bg-white/20 text-white/80 hover:text-white px-3 py-1.5 rounded-full border border-white/20 transition-colors"
                >
                  {q.length > 22 ? q.slice(0, 22) + "…" : q}
                </Link>
              ))}
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
              澳洲NDIS信息碎片化，中文资源极度匮乏——我们是你的专属导航。
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

      {/* ─── PROVIDER RADAR (KEY DIFFERENTIATOR) ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-navy-900 to-navy-950 rounded-3xl p-8 lg:p-12 text-white overflow-hidden relative">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full translate-y-12 -translate-x-12" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center">
                  <BarChart3 className="text-gold-400" size={20} />
                </div>
                <div>
                  <div className="font-bold text-xl">
                    Provider 客户雷达
                  </div>
                  <div className="text-blue-300 text-sm">
                    本周实时需求数据 · 每日更新
                  </div>
                </div>
                <div className="ml-auto hidden sm:flex items-center gap-1.5 bg-green-500/20 rounded-full px-3 py-1">
                  <div className="pulse-dot" />
                  <span className="text-green-400 text-xs font-medium">
                    实时
                  </span>
                </div>
              </div>

              <p className="text-blue-200 mb-8 max-w-xl">
                这是华人NDIS参与者本周在平台上提交的真实服务需求——
                这些家庭正在等待合适的Provider联系他们。
              </p>

              {/* Demand stats grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  {
                    label: "Support Coordinator",
                    count: WEEKLY_DEMAND.total.coordinator,
                    change: "+12%",
                    icon: Users,
                  },
                  {
                    label: "Plan Manager",
                    count: WEEKLY_DEMAND.total.planManager,
                    change: "+8%",
                    icon: TrendingUp,
                  },
                  {
                    label: "治疗类服务",
                    count: WEEKLY_DEMAND.total.therapy,
                    change: "+19%",
                    icon: Brain,
                  },
                  {
                    label: "日常护理",
                    count: WEEKLY_DEMAND.total.care,
                    change: "+5%",
                    icon: Shield,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <item.icon size={16} className="text-blue-300" />
                      <span className="text-green-400 text-xs font-medium">
                        {item.change}
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">
                      {item.count}
                    </div>
                    <div className="text-blue-300 text-xs">{item.label}</div>
                    <div className="text-gray-500 text-xs">个家庭在找</div>
                  </div>
                ))}
              </div>

              {/* City breakdown */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { city: "悉尼", total: 87, color: "bg-blue-500" },
                  { city: "墨尔本", total: 71, color: "bg-purple-500" },
                  { city: "布里斯班", total: 46, color: "bg-teal-500" },
                ].map((city, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white font-medium">
                        {city.city}
                      </span>
                      <span className="text-gold-400 font-bold">
                        {city.total}
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5">
                      <div
                        className={`${city.color} h-1.5 rounded-full`}
                        style={{ width: `${(city.total / 100) * 100}%` }}
                      />
                    </div>
                    <div className="text-blue-400 text-xs mt-1">个需求</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link
                  href="/providers?register=true"
                  className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-6 py-3 rounded-xl transition-colors"
                >
                  <Bell size={16} />
                  免费注册，接收客户线索
                </Link>
                <div className="text-blue-300 text-sm">
                  ✓ 免费入驻  ✓ 按匹配付费  ✓ 中文团队支持
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

      {/* ─── FEATURED PROVIDERS ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-navy-900 mb-2">
                精选华人 Provider
              </h2>
              <p className="text-gray-500">
                经平台核实的优质华人服务提供商
              </p>
            </div>
            <Link
              href="/providers"
              className="flex items-center gap-2 text-sm font-semibold text-navy-900 border-2 border-navy-900 px-4 py-2 rounded-xl hover:bg-navy-900 hover:text-white transition-colors"
            >
              查看全部 <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProviders.map((provider) => (
              <div
                key={provider.id}
                className="bg-white rounded-2xl border border-gray-100 p-6 card-hover"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-navy-50 border border-navy-100 flex items-center justify-center">
                    <span className="text-navy-900 font-bold text-lg">
                      {provider.name[0]}
                    </span>
                  </div>
                  {provider.verified && (
                    <div className="verified-badge flex items-center gap-1 px-2 py-1 rounded-full">
                      <CheckCircle size={11} className="text-white" />
                      <span className="text-white text-xs font-medium">
                        已核实
                      </span>
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-navy-900 mb-0.5">
                  {provider.chineseName || provider.name}
                </h3>
                <p className="text-gray-400 text-xs mb-3">{provider.name}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <Star
                    size={13}
                    className="text-gold-500 fill-gold-500"
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    {provider.rating}
                  </span>
                  <span className="text-gray-400 text-xs">
                    ({provider.reviewCount} 评价)
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {provider.type.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Info */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <MapPin size={11} />
                    {provider.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <MessageCircle size={11} />
                    {provider.languages.join("、")}
                  </div>
                </div>

                <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">
                  {provider.description}
                </p>

                <Link
                  href={`/providers/${provider.id}`}
                  className="w-full block text-center text-sm font-semibold text-navy-900 border-2 border-navy-100 py-2 rounded-xl hover:border-navy-900 hover:bg-navy-900 hover:text-white transition-all"
                >
                  查看详情
                </Link>
              </div>
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
                像问朋友一样，
                <br />
                问NDIS问题
              </h2>
              <p className="text-gray-500 mb-6 leading-relaxed">
                基于NDIS官方文件和华人社区实战经验的AI顾问。
                不像官网那样冷冰冰，不会只说"请咨询专业人士"——
                给你有方向的答案，告诉你下一步怎么走。
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "专业中文NDIS知识库，来源官方文件",
                  "分层回答：方向 → 步骤 → 专业转介",
                  "2026年改革政策实时更新",
                  "免责声明保障，重要决定转专业顾问",
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
                    我孩子刚被诊断为自闭症，不知道从哪里开始，好焦虑...
                  </div>
                </div>
                {/* AI response */}
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center flex-shrink-0">
                    <Brain size={13} className="text-gold-600" />
                  </div>
                  <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%] text-sm text-gray-700 leading-relaxed">
                    理解你的心情，这是很多华人家庭都面临的情况。
                    <br /><br />
                    <strong>第一步先做这件事：</strong>找GP拿正式诊断转介信，然后预约儿科医生或心理学家做评估报告。这是申请NDIS的基础材料。
                    <br /><br />
                    同时，如果孩子不到9岁，可以直接走 <strong>Early Childhood通道</strong>，不需要等正式诊断就能获得一些早期支持...
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
              澳洲创业圈生态矩阵
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            {[
              {
                name: "澳洲创业圈",
                desc: "华人商业圈子总站",
                href: "https://auscircle.com",
                active: false,
              },
              {
                name: "澳洲NDIS圈",
                desc: "NDIS行业专业平台",
                href: "/",
                active: true,
              },
              {
                name: "澳洲房产AI",
                desc: "房产投资智能导航",
                href: "https://aussie-property.vercel.app",
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
            你是 NDIS Provider 吗？
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            每周有 249+ 华人家庭在平台上寻找服务——
            免费入驻，接收与你匹配的客户线索。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/providers?register=true"
              className="inline-flex items-center justify-center gap-2 bg-navy-900 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-navy-800 transition-colors"
            >
              免费注册入驻 <ArrowRight size={16} />
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
