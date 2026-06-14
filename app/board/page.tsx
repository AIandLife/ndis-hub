"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ChevronRight,
  MapPin,
  Megaphone,
  MessageCircle,
  Plus,
  X,
  CheckCircle,
  Clock,
} from "lucide-react";
import { fetchApprovedProviders } from "@/lib/resources";
import ConnectModal, { type ConnectTarget } from "@/components/ConnectModal";
import { useI18n } from "@/lib/i18n";
import { cityLabel } from "@/lib/labels";

// 分类值(数据，中文)→ 显示 key 映射
const CAT_KEY: Record<string, string> = {
  全部: "board.cat.all",
  "找员工/招聘": "board.cat.staff",
  "找客户/转介": "board.cat.clients",
  找供应商: "board.cat.suppliers",
  找合作伙伴: "board.cat.partners",
  买卖生意: "board.cat.trade",
  "找房源/场地": "board.cat.space",
  其他: "board.cat.other",
};

// 对接大厅：全行业的「在找什么」聚合在这一页。
// 数据两路：demands 表（任何人自助挂的需求）+ 圈内成员档案里的「需」。
// 想对接 → 进群找 Terry —— 每条需求都是转介的起点。

const CATEGORIES = [
  "全部",
  "找员工/招聘",
  "找客户/转介",
  "找供应商",
  "找合作伙伴",
  "买卖生意",
  "找房源/场地",
  "其他",
];

interface BoardItem {
  id: string;
  need: string; // 中文（原文/翻译）
  needEn?: string; // 英文
  detail?: string;
  detailEn?: string;
  who: string;
  city: string;
  category: string;
  source: "demand" | "member";
  date?: string;
}

// 圈内成员需求的粗分类（关键词推断）
function guessCategory(text: string): string {
  if (/招|员工|support worker|护士|治疗师|人才|木工|加入团队/i.test(text))
    return "找员工/招聘";
  if (/客户|转介|referral|获客|客源/i.test(text)) return "找客户/转介";
  if (/供应商|采购|建材|供货/i.test(text)) return "找供应商";
  if (/买家|卖|收购|并购|转让/i.test(text)) return "买卖生意";
  if (/房源|场地|物业|租/i.test(text)) return "找房源/场地";
  if (/合作|伙伴|合伙|对接/i.test(text)) return "找合作伙伴";
  return "其他";
}

function PostDemandModal({ onClose }: { onClose: () => void }) {
  const { t, lang } = useI18n();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "找合作伙伴",
    city: "悉尼 Sydney",
    name: "",
    wechat: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await Promise.allSettled([
        fetch("/api/demands", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }),
        fetch("/api/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "demand_post", data: form }),
        }),
      ]);
    } catch {
      // 用户侧照常显示成功
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white rounded-t-3xl px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-navy-900">{t("post.title")}</h2>
            <p className="text-gray-500 text-sm">
              {t("post.sub")}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={28} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-2">{t("post.done")}</h3>
            <p className="text-gray-500 mb-6 text-sm">
              {t("post.doneSub")}
            </p>
            <Link
              href="/#join"
              className="inline-block bg-gold-500 hover:bg-gold-400 text-navy-950 px-6 py-2.5 rounded-xl font-bold text-sm transition-colors"
            >
              {t("hero.ctaJoinMobile")}
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-1">
                {t("post.qTitle")} *
              </label>
              <input
                required
                type="text"
                maxLength={80}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Two Support Workers in Sydney with SIL experience"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-navy-900 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-1">
                {t("post.qDetail")} *
              </label>
              <textarea
                required
                rows={3}
                maxLength={600}
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Background, requirements, how you'd like to work together..."
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-navy-900 transition-colors resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-1">
                  {t("post.qCategory")} *
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-navy-900 transition-colors bg-white"
                >
                  {CATEGORIES.slice(1).map((c) => (
                    <option key={c} value={c}>
                      {t(CAT_KEY[c] || "")}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-1">
                  {t("post.qCity")} *
                </label>
                <select
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-navy-900 transition-colors bg-white"
                >
                  {[
                    "悉尼 Sydney",
                    "墨尔本 Melbourne",
                    "布里斯班 Brisbane",
                    "珀斯 Perth",
                    "阿德莱德 Adelaide",
                    "堪培拉 Canberra",
                    "全澳洲",
                  ].map((c) => (
                    <option key={c} value={c}>
                      {cityLabel(c, lang)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-1">
                  {t("post.qName")} *
                </label>
                <input
                  required
                  type="text"
                  maxLength={40}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Name / company"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-navy-900 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-1">
                  {t("post.qContact")} *
                </label>
                <input
                  required
                  type="text"
                  maxLength={40}
                  value={form.wechat}
                  onChange={(e) => setForm({ ...form, wechat: e.target.value })}
                  placeholder="WeChat / WhatsApp / phone"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-navy-900 transition-colors"
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-500">
              {t("post.contactHint")}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-navy-900 text-white font-bold py-3 rounded-xl hover:bg-navy-800 disabled:bg-gray-400 transition-colors"
            >
              {submitting ? t("post.submitting") : t("post.submit")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function BoardPage() {
  const { t, lang } = useI18n();
  const [items, setItems] = useState<BoardItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [category, setCategory] = useState("全部");
  const [showPost, setShowPost] = useState(false);
  const [connectTarget, setConnectTarget] = useState<ConnectTarget | null>(null);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("post") === "1") {
      setShowPost(true);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const out: BoardItem[] = [];
      // 1) demands 表（服务端已过滤联系方式；tr=中/英双语）
      try {
        const r = await fetch("/api/demands");
        const { demands } = await r.json();
        for (const d of demands || []) {
          const tr = d.tr || {};
          out.push({
            id: `d-${d.id}`,
            need: tr.zh?.title || d.title,
            needEn: tr.en?.title || d.title,
            detail: tr.zh?.description || d.description,
            detailEn: tr.en?.description || d.description,
            who: d.submitter_name,
            city: d.city,
            category: d.category,
            source: "demand",
            date: d.created_at?.slice(0, 10),
          });
        }
      } catch {
        /* ignore */
      }
      // 2) 圈内成员档案里的「需」（needsZh/needsEn 已批量翻译）
      try {
        const providers = await fetchApprovedProviders();
        for (const p of providers) {
          if (p.needs && p.needs.length > 8) {
            out.push({
              id: `m-${p.id}`,
              need: p.needsZh || p.needs,
              needEn: p.needsEn || p.needs,
              who: p.chineseName || p.name,
              city: p.location,
              category: guessCategory(p.needs),
              source: "member",
            });
          }
        }
      } catch {
        /* ignore */
      }
      setItems(out);
      setLoaded(true);
    })();
  }, []);

  const filtered = useMemo(
    () => items.filter((i) => category === "全部" || i.category === category),
    [items, category]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {showPost && <PostDemandModal onClose={() => setShowPost(false)} />}
      {connectTarget && (
        <ConnectModal
          target={connectTarget}
          onClose={() => setConnectTarget(null)}
        />
      )}

      {/* Header */}
      <div className="bg-navy-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-3">
            <Link href="/" className="hover:text-white transition-colors">
              {t("common.home")}
            </Link>
            <ChevronRight size={13} />
            <span>{t("board.title")}</span>
          </div>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{t("board.title")}</h1>
              <p className="text-blue-200 max-w-2xl">
                {t("board.sub")}
              </p>
            </div>
            <button
              onClick={() => setShowPost(true)}
              className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-5 py-2.5 rounded-xl transition-colors whitespace-nowrap"
            >
              <Plus size={15} />
              {t("board.post")}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                category === c
                  ? "bg-navy-900 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-navy-900 hover:text-navy-900"
              }`}
            >
              {t(CAT_KEY[c] || "")}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-500 mb-4">
          {loaded ? (
            <>
              <strong className="text-navy-900">{filtered.length}</strong> {t("board.count")}
            </>
          ) : (
            <span className="inline-block h-4 w-24 bg-gray-200 rounded animate-pulse" />
          )}
        </p>

        {!loaded ? (
          // 加载骨架（消除"先空白再填充"的闪烁）
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse"
              >
                <div className="flex gap-2 mb-3">
                  <div className="h-5 w-16 bg-gray-200 rounded-full" />
                  <div className="h-5 w-20 bg-gray-100 rounded-full" />
                </div>
                <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
                <div className="h-3 w-full bg-gray-100 rounded mb-1" />
                <div className="h-3 w-2/3 bg-gray-100 rounded mb-5" />
                <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                  <div className="h-3 w-20 bg-gray-100 rounded" />
                  <div className="h-7 w-20 bg-gray-200 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100 p-6 card-hover flex flex-col"
              >
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-xs bg-navy-50 text-navy-700 px-2.5 py-1 rounded-full font-semibold">
                    {t(CAT_KEY[item.category] || "") || item.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin size={11} />
                    {cityLabel(item.city, lang)}
                  </span>
                  {item.date && (
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock size={11} />
                      {item.date}
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-2 mb-2">
                  <Megaphone size={16} className="text-gold-500 flex-shrink-0 mt-1" />
                  <p className="text-navy-900 font-semibold leading-relaxed">
                    {lang === "en" && item.needEn ? item.needEn : item.need}
                  </p>
                </div>
                {item.detail && (
                  <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2 pl-6">
                    {lang === "en" && item.detailEn ? item.detailEn : item.detail}
                  </p>
                )}

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                  <span className="text-xs text-gray-400">
                    {item.who}
                    {item.source === "member" && (
                      <span className="ml-1.5 text-emerald-600">· {t("board.member")}</span>
                    )}
                  </span>
                  <button
                    onClick={() =>
                      setConnectTarget({
                        type: item.source === "demand" ? "demand" : "member",
                        id: item.id.slice(2),
                        name: item.who,
                        need: lang === "en" && item.needEn ? item.needEn : item.need,
                      })
                    }
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-navy-950 bg-gold-500 hover:bg-gold-400 px-4 py-1.5 rounded-lg transition-colors"
                  >
                    <MessageCircle size={13} />
                    {t("board.canHelp")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 text-center py-14 px-6">
            <h3 className="text-xl font-bold text-navy-900 mb-2">
              {t("board.emptyTitle")}
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              {t("board.emptySub")}
            </p>
            <button
              onClick={() => setShowPost(true)}
              className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              <Plus size={15} />
              {t("board.post")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
