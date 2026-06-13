"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Clock,
  ArrowRight,
  FileText,
  ClipboardList,
  DollarSign,
  Users,
  Heart,
  RefreshCw,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import JoinBanner from "@/components/JoinBanner";

type Tab = "reform" | "guides" | "journey" | "courses";

// 文章：从业者视角的真实改革解读 / 入行合规指南（非参与者答疑）。
const ARTICLES: {
  tab: "reform" | "guides";
  title: { zh: string; en: string };
  excerpt: { zh: string; en: string };
  read: number;
  q: string; // AI 解读的提问
}[] = [
  {
    tab: "reform",
    title: {
      zh: "2026 改革：评估改 3 小时面谈，Provider/SC 怎么应对",
      en: "2026 reform: 3-hour assessments — how Providers/SCs should respond",
    },
    excerpt: {
      zh: "支持需求评估从文件审核改为约 3 小时面谈。对你经营意味着什么、怎么帮团队和客户提前准备、如何避免计划缩水冲击收入。",
      en: "Support-needs assessment moves to a ~3-hour interview. What it means for your operation, how to prep your team and clients, and how to avoid plan cuts hitting revenue.",
    },
    read: 8,
    q: "2026 年 NDIS 改革把评估改成 3 小时面谈，对 Provider 和 SC 的经营有什么影响？要提前做什么？",
  },
  {
    tab: "reform",
    title: {
      zh: "增长放缓到 8%：行业洗牌期，从业者的机会与风险",
      en: "Growth slowing to 8%: a shake-out — operator risks & opportunities",
    },
    excerpt: {
      zh: "政府把计划成本年增长目标压到 8%。合规更严、价格承压，但优质、专业、合规的机构反而有整合机会。",
      en: "The government is targeting 8% annual cost growth. Tighter compliance and price pressure — but a consolidation opening for quality, compliant operators.",
    },
    read: 6,
    q: "NDIS 把成本年增长压到 8%，对华人 NDIS 从业者意味着什么机会和风险？",
  },
  {
    tab: "guides",
    title: {
      zh: "如何注册成为 NDIS Provider：流程、成本、常见坑",
      en: "How to register as an NDIS Provider: process, cost, common pitfalls",
    },
    excerpt: {
      zh: "注册 vs 未注册怎么选、要不要 SIL/SDA 高资质类别、Worker Screening、Practice Standards 审核，以及很多人踩过的坑。",
      en: "Registered vs unregistered, whether to pursue SIL/SDA, Worker Screening, Practice Standards audits — and the pitfalls many hit.",
    },
    read: 11,
    q: "我想注册成为 NDIS Provider，完整流程、大概成本、和常见的坑是什么？",
  },
  {
    tab: "guides",
    title: {
      zh: "合规红线：做 NDIS 生意绝对不能碰的几件事",
      en: "Compliance red lines: what you must never do in NDIS",
    },
    excerpt: {
      zh: "价格指南上限、利益冲突、Worker Screening、记录与开票合规——以及 2026 年起对「撮合参与者与服务方」平台的强制注册新规。",
      en: "Price-guide caps, conflict of interest, Worker Screening, record/billing compliance — and the 2026 mandatory-registration rule for platforms matching participants with workers.",
    },
    read: 7,
    q: "做 NDIS 生意，哪些是绝对不能碰的合规红线？",
  },
  {
    tab: "guides",
    title: {
      zh: "同时做 NDIS 和养老：双牌照怎么搭，客户怎么承接",
      en: "Doing NDIS + aged care: dual registration and client hand-over",
    },
    excerpt: {
      zh: "很多华人机构两个都做。NDIS（<65）与 My Aged Care（65+）的衔接、双牌照怎么注册、用一套团队做大客户生命周期价值。",
      en: "Many operators do both. How NDIS (<65) and My Aged Care (65+) connect, dual registration, and growing client lifetime value with one team.",
    },
    read: 9,
    q: "我想同时做 NDIS 和养老（Aged Care），双牌照怎么注册？客户 65 岁过渡怎么承接？",
  },
];

const JOURNEY = [
  { num: "01", icon: FileText, zh: "资格申请", en: "Access", zhd: "确认参与者资格、准备医疗证明、提交 Access Request。", end: "Confirm eligibility, prepare evidence, submit the Access Request." },
  { num: "02", icon: ClipboardList, zh: "计划制定", en: "Planning", zhd: "规划师/LAC 安排计划会议，讨论目标与支持需求。SC 常在此切入。", end: "Planner/LAC runs the planning meeting on goals and supports. SCs often engage here." },
  { num: "03", icon: DollarSign, zh: "计划管理", en: "Plan mgmt", zhd: "选 NDIA 管理 / Plan 管理 / 自管。Plan Manager 在此承接业务。", end: "Choose NDIA / Plan-managed / Self-managed. Plan Managers win business here." },
  { num: "04", icon: Users, zh: "服务协调", en: "Coordination", zhd: "SC 帮参与者找 Provider、协调服务。B2B 转介最活跃的环节。", end: "SCs find providers and coordinate services — the most active B2B referral stage." },
  { num: "05", icon: Heart, zh: "使用服务", en: "Service", zhd: "签服务协议、合规收费、记录质量。口碑与续约的关键。", end: "Service agreements, compliant billing, quality records — key to reputation and renewals." },
  { num: "06", icon: RefreshCw, zh: "计划审查", en: "Review", zhd: "1–3 年审查，调整支持与资金。SC 帮客户准备材料、稳住续约。", end: "1–3 year reviews adjust supports and funding. SCs prep clients and secure renewals." },
];

const TABS: { key: Tab; icon: typeof BookOpen }[] = [
  { key: "reform", icon: RefreshCw },
  { key: "guides", icon: BookOpen },
  { key: "journey", icon: Users },
  { key: "courses", icon: GraduationCap },
];

export default function InsightsPage() {
  const { lang, t } = useI18n();
  const [tab, setTab] = useState<Tab>("reform");
  const L = (o: { zh: string; en: string }) => (lang === "en" ? o.en : o.zh);

  const articles = ARTICLES.filter((a) => a.tab === tab);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-3">
            <Link href="/" className="hover:text-white transition-colors">
              {t("common.home")}
            </Link>
            <ChevronRight size={13} />
            <span>{t("ins.title")}</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{t("ins.title")}</h1>
          <p className="text-blue-200 max-w-2xl">{t("ins.sub")}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map(({ key, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                tab === key
                  ? "bg-navy-900 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-navy-900 hover:text-navy-900"
              }`}
            >
              <Icon size={15} />
              {t(`ins.tab.${key}`)}
            </button>
          ))}
        </div>

        {/* Articles (reform / guides) */}
        {(tab === "reform" || tab === "guides") && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {articles.map((a, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 p-6 card-hover flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold bg-gold-50 text-gold-700 px-2.5 py-1 rounded-full">
                    {t(`ins.tab.${a.tab}`)}
                  </span>
                  <span className="text-gray-400 text-xs flex items-center gap-1">
                    <Clock size={11} /> {a.read} {t("ins.readMins")}
                  </span>
                </div>
                <h3 className="font-bold text-navy-900 text-lg mb-2 leading-snug">
                  {L(a.title)}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                  {L(a.excerpt)}
                </p>
                <Link
                  href={`/ai-advisor?q=${encodeURIComponent(a.q)}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-navy-900 hover:text-blue-600 transition-colors self-start"
                >
                  {t("ins.askAi")} <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Client journey */}
        {tab === "journey" && (
          <div>
            <p className="text-gray-500 text-sm mb-6 max-w-3xl">{t("ins.journeyNote")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {JOURNEY.map((s) => (
                <div
                  key={s.num}
                  className="bg-white rounded-2xl border border-gray-100 p-5 card-hover"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center">
                      <s.icon size={18} className="text-navy-700" />
                    </div>
                    <div>
                      <div className="text-gold-600 text-xs font-bold">{s.num}</div>
                      <div className="font-bold text-navy-900">
                        {lang === "en" ? s.en : s.zh}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {lang === "en" ? s.end : s.zhd}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Courses (coming soon) */}
        {tab === "courses" && (
          <div className="bg-white rounded-2xl border border-gray-100 text-center py-16 px-6 max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-gold-100 flex items-center justify-center mx-auto mb-5">
              <GraduationCap size={28} className="text-gold-600" />
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-2">
              {t("ins.courses.soon")}
            </h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto mb-7">
              {t("ins.courses.soonSub")}
            </p>
            <Link
              href="/#join"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              {t("nav.joinGroup")} <ArrowRight size={15} />
            </Link>
          </div>
        )}
      </div>

      <JoinBanner />
    </div>
  );
}
