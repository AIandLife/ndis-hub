"use client";

import Link from "next/link";
import {
  ArrowRight,
  Brain,
  ChevronRight,
  CheckCircle,
  MapPin,
  AlertCircle,
  Heart,
  FileText,
  Users,
  DollarSign,
} from "lucide-react";

const SCENARIOS = [
  {
    icon: Heart,
    title: "孩子刚被诊断",
    desc: "自闭症 / 发育迟缓 / 脑瘫",
    q: "我的孩子刚被诊断出自闭症，我完全不知道从哪里开始，该怎么申请NDIS？",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: FileText,
    title: "想申请NDIS",
    desc: "不知道自己是否符合资格",
    q: "我想了解自己是否符合NDIS申请资格，需要准备哪些材料？",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: DollarSign,
    title: "计划资金不够用",
    desc: "预算快用完 / 不够申请",
    q: "我的NDIS计划资金快用完了，还有两个月才到期，应该怎么办？",
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    icon: Users,
    title: "找不到好的Provider",
    desc: "想找中文服务的Provider",
    q: "我需要找一个能提供中文服务的Support Coordinator，在悉尼，怎么找？",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    icon: AlertCircle,
    title: "Provider有问题",
    desc: "服务没提供 / 乱收费",
    q: "我的Provider一直不来提供服务，已经三周了，我应该怎么投诉？",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: MapPin,
    title: "养老与NDIS衔接",
    desc: "即将65岁 / 过渡问题",
    q: "我的家人今年63岁，是NDIS参与者，我想了解65岁之后NDIS和养老如何衔接？",
    color: "text-teal-500",
    bg: "bg-teal-50",
  },
];

const FAQ = [
  {
    q: "我的孩子有自闭症，但还没有正式诊断，能申请NDIS吗？",
    a: "0-9岁的儿童可以通过Early Childhood通道获得早期支持，不需要等待正式诊断。联系当地的Early Childhood Partner（ECP）即可开始流程。拨打NDIS热线 1800 800 110 查询你当地的ECP。",
  },
  {
    q: "NDIS申请需要花多长时间？",
    a: "从提交申请（Access Request）到获得计划，通常需要3-6个月。期间包括资格审核（4-6周）和计划制定会议。准备充分的材料可以加快流程。",
  },
  {
    q: "语言不好，申请NDIS会很困难吗？",
    a: "不会。NDIS提供免费翻译服务（通过TIS National，电话131 450）。所有会议都可以申请中文翻译陪同，完全免费。",
  },
  {
    q: "Core Support、Capacity Building、Capital是什么意思？",
    a: "这是NDIS计划资金的三大类：Core支持最灵活，用于日常活动协助和社区参与；Capacity Building用于提升你的独立能力（如职业培训、治疗）；Capital支持用于购买设备或家居改造，专款专用。",
  },
  {
    q: "我可以自己选择Provider吗？",
    a: "可以。只要你的计划是计划管理（Plan-managed）或自管（Self-managed），你可以自由选择任何Provider，不需要经过NDIS批准。如果是NDIA管理，只能选择注册Provider。",
  },
  {
    q: "Provider的服务质量有问题，我该怎么办？",
    a: "第一步：直接与Provider沟通，书面记录问题。第二步：联系NDIS Quality and Safeguards Commission投诉（1800 035 544）。你的SC也可以帮助你处理Provider问题。",
  },
];

export default function FamiliesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-3">
            <Link href="/" className="hover:text-white transition-colors">
              首页
            </Link>
            <ChevronRight size={13} />
            <span>参与者与家属指南</span>
          </div>
          <h1 className="text-3xl font-bold mb-3">NDIS 参与者与家属中文指南</h1>
          <p className="text-blue-200 max-w-2xl">
            用中文，搞清楚你和家人的NDIS权利与下一步。
            选择你的情况，AI顾问给你有方向的回答。
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">


        {/* Scenario Picker */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-navy-900 mb-2">
            你目前的情况是？
          </h2>
          <p className="text-gray-500 text-sm mb-5">
            点击最接近你情况的选项，AI顾问会直接给你针对性的回答。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SCENARIOS.map((s, i) => (
              <Link
                key={i}
                href={`/ai-advisor?q=${encodeURIComponent(s.q)}`}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:border-navy-900 hover:shadow-md transition-all group card-hover"
              >
                <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                  <s.icon className={s.color} size={18} />
                </div>
                <div className="font-bold text-navy-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {s.title}
                </div>
                <div className="text-gray-400 text-xs mb-3">{s.desc}</div>
                <div className="flex items-center gap-1 text-xs font-semibold text-navy-900 group-hover:text-blue-600 transition-colors">
                  问AI顾问 <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* AI Chat CTA */}
        <div className="bg-navy-900 rounded-2xl p-6 flex items-center gap-5 mb-10 flex-wrap">
          <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center flex-shrink-0">
            <Brain size={22} className="text-gold-400" />
          </div>
          <div className="flex-1">
            <div className="text-white font-bold mb-1">直接用中文提问</div>
            <div className="text-blue-300 text-sm">
              描述你的具体情况，AI顾问给你有方向的回答——不是教科书，是下一步怎么做。
            </div>
          </div>
          <Link
            href="/ai-advisor"
            className="bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors flex-shrink-0 flex items-center gap-1.5"
          >
            开始对话 <ArrowRight size={14} />
          </Link>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-navy-900 mb-5">常见问题</h2>
          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-start gap-3">
                  <span className="text-gold-500 font-bold text-sm mt-0.5 flex-shrink-0">Q</span>
                  <div>
                    <div className="font-semibold text-navy-900 mb-2 text-sm">
                      {item.q}
                    </div>
                    <div className="text-gray-600 text-sm leading-relaxed">
                      {item.a}
                    </div>
                    <Link
                      href={`/ai-advisor?q=${encodeURIComponent(item.q)}`}
                      className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-navy-900 mt-2 transition-colors"
                    >
                      问AI深入解答 <ChevronRight size={11} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Find Provider */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
            <MapPin size={16} />
            需要找中文 Provider？
          </h3>
          <p className="text-emerald-700 text-sm mb-4">
            平台收录了经核实的华人NDIS服务提供商，按服务类型、地区、语言筛选，找到靠谱的中文服务。
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/providers"
              className="inline-flex items-center gap-2 bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-emerald-800 transition-colors"
            >
              搜索华人Provider <ArrowRight size={14} />
            </Link>
            <Link
              href="/journey"
              className="inline-flex items-center gap-2 border-2 border-emerald-700 text-emerald-700 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-emerald-700 hover:text-white transition-colors"
            >
              先看NDIS全流程图
            </Link>
          </div>
        </div>

        {/* Rights reminder */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-bold text-navy-900 mb-4">你的NDIS权利</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "有权申请免费中文翻译陪同所有NDIS会议",
              "有权自由选择和更换Provider（计划管理/自管）",
              "有权对NDIS决定提出内部审查",
              "有权投诉Provider质量问题",
              "有权获得清晰的服务协议和收费说明",
              "有权在任何时候申请计划审查",
            ].map((right, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                {right}
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
            NDIS热线：<strong>1800 800 110</strong> ｜ 翻译服务：<strong>131 450</strong> ｜ 投诉：<strong>1800 035 544</strong>
          </div>
        </div>

      </div>
    </div>
  );
}
