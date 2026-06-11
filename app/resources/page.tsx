"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ChevronRight,
  BookOpen,
  TrendingUp,
  Briefcase,
  Video,
  ArrowRight,
  Calendar,
  Clock,
  ExternalLink,
} from "lucide-react";
import JoinBanner from "@/components/JoinBanner";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

const ARTICLES: Article[] = [
  {
    id: "1",
    title: "2026年NDIS改革完整解读：3小时面谈评估，Provider/SC该怎么应对",
    excerpt:
      "评估改为3小时面谈制，对 Provider、Support Coordinator 的经营意味着什么？如何调整服务流程、帮团队和客户提前准备、避免计划缩水带来的收入波动。从业者视角的中文解读。",
    category: "改革速递",
    date: "2025-03-20",
    readTime: "8分钟",
    tags: ["2026改革", "评估", "经营应对"],
    featured: true,
  },
  {
    id: "2",
    title: "Provider/SC 实操：如何专业协助自闭症家庭完成 NDIS 申请",
    excerpt:
      "ASD 家庭是很多华人 Provider/SC 的核心客户群。这篇从从业者角度拆解服务流程：哪些材料最关键、如何专业地与规划师对接、Early Childhood 通道的合规要点——把它当成你的服务能力，而不是替家庭做决定。",
    category: "行业知识",
    date: "2025-03-15",
    readTime: "12分钟",
    tags: ["自闭症", "服务流程", "合规"],
    featured: true,
  },
  {
    id: "3",
    title: "Plan Manager / SC 必懂：三种计划管理方式的差异与获客切入",
    excerpt:
      "Agency管理、Plan管理、自管——作为从业者，你要清楚每种方式下你的角色和获客切入点在哪。本文从经营角度对比三者的差异、适合的客户群和你的服务机会。",
    category: "行业知识",
    date: "2025-03-10",
    readTime: "6分钟",
    tags: ["计划管理", "Plan Manager", "获客"],
  },
  {
    id: "4",
    title: "华人Provider如何在NDIS行业建立可持续生意？",
    excerpt:
      "越来越多华人进入NDIS行业，但如何区分优质Provider和劣质Provider？这篇文章从合规、运营、客户关系三个角度分享华人Provider的成功经验。",
    category: "生意辅导",
    date: "2025-03-05",
    readTime: "10分钟",
    tags: ["Provider", "合规", "生意经营"],
  },
  {
    id: "5",
    title: "同时做 NDIS 和养老的 Provider：65岁过渡期怎么承接客户",
    excerpt:
      "客户接近65岁要从 NDIS 转入 Aged Care——这是流失还是机会？本文从同时持牌 NDIS + My Aged Care 的 Provider 角度，讲清两个体系的衔接、如何平滑承接、用同一套团队做大客户生命周期价值。",
    category: "养老专区",
    date: "2025-02-28",
    readTime: "9分钟",
    tags: ["养老", "客户承接", "双牌照"],
  },
  {
    id: "6",
    title: "如何成为NDIS注册Provider：完整申请流程和常见误区",
    excerpt:
      "想进入NDIS行业？注册流程比你想象的要复杂。本文详解注册类型选择、Worker Screening Check、Practice Standards等关键环节，以及很多人踩过的坑。",
    category: "生意辅导",
    date: "2025-02-20",
    readTime: "11分钟",
    tags: ["注册Provider", "入行", "创业"],
  },
];

const CATEGORIES = ["全部", "改革速递", "行业知识", "生意辅导", "养老专区"];

const UPCOMING_EVENTS = [
  {
    title: "NDIS华人从业者交流沙龙 · 悉尼站",
    date: "2025年4月12日（周六）",
    time: "14:00 - 17:00",
    location: "悉尼 Chatswood 活动中心",
    spots: 8,
    type: "线下",
  },
  {
    title: "2026改革应对策略 · 线上分享会",
    date: "2025年4月18日（周五）",
    time: "20:00 - 21:30",
    location: "Zoom线上",
    spots: 50,
    type: "线上",
  },
  {
    title: "NDIS Provider注册实操工作坊 · 墨尔本站",
    date: "2025年4月26日（周六）",
    time: "10:00 - 16:00",
    location: "墨尔本 Box Hill 社区中心",
    spots: 3,
    type: "线下",
  },
];

function ResourcesContent() {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "all";
  const [activeCategory, setActiveCategory] = useState(
    defaultTab === "business" ? "生意辅导" : "全部"
  );

  const filteredArticles = ARTICLES.filter(
    (a) => activeCategory === "全部" || a.category === activeCategory
  );

  const featuredArticles = ARTICLES.filter((a) => a.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-3">
            <Link href="/" className="hover:text-white transition-colors">
              首页
            </Link>
            <ChevronRight size={13} />
            <span>知识库</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">知识库 & 资源</h1>
          <p className="text-blue-200">
            NDIS中文深度文章、行业改革速递、活动报名
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Articles */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-navy-900 mb-5">精选文章</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {featuredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl border border-gray-100 p-6 card-hover"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold bg-gold-50 text-gold-700 px-2.5 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-gray-400 text-xs">{article.date}</span>
                  <span className="text-gray-400 text-xs flex items-center gap-1">
                    <Clock size={10} /> {article.readTime}
                  </span>
                </div>
                <h3 className="font-bold text-navy-900 text-lg mb-2 leading-snug">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/ai-advisor?q=${encodeURIComponent(article.title + "，帮我详细解释")}`}
                    className="flex items-center gap-1 text-sm font-semibold text-navy-900 hover:text-blue-600 transition-colors"
                  >
                    AI深入解读 <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles List */}
          <div className="lg:col-span-2">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    activeCategory === cat
                      ? "bg-navy-900 text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-navy-900 hover:text-navy-900"
                  }`}
                >
                  {cat === "全部" ? (
                    <span className="flex items-center gap-1.5">
                      <BookOpen size={13} /> 全部
                    </span>
                  ) : cat === "生意辅导" ? (
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={13} /> {cat}
                    </span>
                  ) : cat === "改革速递" ? (
                    <span className="flex items-center gap-1.5">
                      <TrendingUp size={13} /> {cat}
                    </span>
                  ) : (
                    cat
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-2xl border border-gray-100 p-5 card-hover"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        article.category === "改革速递"
                          ? "bg-amber-50 text-amber-700"
                          : article.category === "生意辅导"
                            ? "bg-purple-50 text-purple-700"
                            : article.category === "养老专区"
                              ? "bg-teal-50 text-teal-700"
                              : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {article.category}
                    </span>
                    <span className="text-gray-400 text-xs">{article.date}</span>
                    <span className="text-gray-400 text-xs flex items-center gap-1 ml-auto">
                      <Clock size={10} /> {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-bold text-navy-900 mb-2 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-50 text-gray-400 px-1.5 py-0.5 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/ai-advisor?q=${encodeURIComponent(article.title)}`}
                      className="flex items-center gap-1 text-xs font-semibold text-navy-900 hover:text-blue-600 transition-colors"
                    >
                      AI解读 <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-navy-900 mb-4 flex items-center gap-2">
                <Calendar size={15} className="text-navy-900" />
                近期活动
              </h3>
              <div className="space-y-4">
                {UPCOMING_EVENTS.map((event, i) => (
                  <div
                    key={i}
                    className="border-l-2 border-navy-200 pl-4"
                  >
                    <div className="font-semibold text-navy-900 text-sm mb-1">
                      {event.title}
                    </div>
                    <div className="text-xs text-gray-500 space-y-0.5">
                      <div>{event.date}</div>
                      <div>{event.time}</div>
                      <div className="flex items-center gap-1.5">
                        <span>{event.location}</span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-xs ${
                            event.type === "线上"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-green-50 text-green-600"
                          }`}
                        >
                          {event.type}
                        </span>
                      </div>
                    </div>
                    {event.spots <= 5 && (
                      <div className="text-xs text-red-500 mt-1 font-medium">
                        仅剩 {event.spots} 个名额
                      </div>
                    )}
                    <button className="mt-2 text-xs font-semibold text-navy-900 hover:text-blue-600 transition-colors flex items-center gap-1">
                      报名参加 <ArrowRight size={11} />
                    </button>
                  </div>
                ))}
              </div>
              <Link
                href="https://www.australiabusinessalliance.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-1 text-xs text-gray-400 hover:text-navy-900 transition-colors"
              >
                更多活动在澳洲商业联盟 <ExternalLink size={10} />
              </Link>
            </div>

            {/* Business Coaching */}
            <div className="bg-gradient-to-br from-navy-900 to-navy-950 rounded-2xl p-5 text-white">
              <div className="w-9 h-9 rounded-xl bg-gold-500/20 flex items-center justify-center mb-4">
                <Video size={16} className="text-gold-400" />
              </div>
              <h3 className="font-bold mb-2">NDIS 生意辅导课程</h3>
              <p className="text-blue-300 text-xs mb-4 leading-relaxed">
                专为华人Provider设计。从注册到合规，从定价到营销，
                有专业导师带你系统学习。
              </p>
              <ul className="space-y-1.5 mb-5">
                {[
                  "Provider注册完整流程",
                  "合规风险与应对策略",
                  "NDIS定价与服务协议",
                  "如何获取并留住客户",
                ].map((item) => (
                  <li key={item} className="text-xs text-blue-200 flex items-center gap-1.5">
                    <span className="text-gold-400">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/courses"
                className="block w-full text-center bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold py-2.5 rounded-xl text-sm transition-colors"
              >
                了解课程详情
              </Link>
            </div>

            {/* Official Links */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-navy-900 mb-4 text-sm">官方资源</h3>
              <ul className="space-y-2">
                {[
                  { label: "NDIS 官方网站", href: "https://ndis.gov.au" },
                  { label: "NDIS Quality Commission", href: "https://ndiscommission.gov.au" },
                  { label: "My Aged Care", href: "https://myagedcare.gov.au" },
                  { label: "TIS 翻译服务（免费）", href: "https://tisnational.gov.au" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-sm text-gray-600 hover:text-navy-900 transition-colors"
                    >
                      {link.label}
                      <ExternalLink size={11} className="text-gray-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin w-8 h-8 border-2 border-navy-900 border-t-transparent rounded-full" />
        </div>
      }
    >
      <>
        <ResourcesContent />
        <JoinBanner />
      </>
    </Suspense>
  );
}
