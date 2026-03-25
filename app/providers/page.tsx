"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  MapPin,
  Star,
  CheckCircle,
  MessageCircle,
  ChevronRight,
  Filter,
  ArrowRight,
  Brain,
  X,
  UserPlus,
} from "lucide-react";
import {
  PROVIDERS,
  SERVICE_TYPES,
  LOCATIONS,
  LANGUAGES,
  type Provider,
} from "@/lib/providers-data";

function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-navy-50 border border-navy-100 flex items-center justify-center flex-shrink-0">
            <span className="text-navy-900 font-bold text-lg">
              {provider.name[0]}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-navy-900">
              {provider.chineseName || provider.name}
            </h3>
            <p className="text-gray-400 text-xs">{provider.name}</p>
          </div>
        </div>
        {provider.verified && (
          <div className="verified-badge flex items-center gap-1 px-2 py-1 rounded-full flex-shrink-0">
            <CheckCircle size={11} className="text-white" />
            <span className="text-white text-xs font-medium">已核实</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 mb-3">
        <Star size={13} className="text-gold-500 fill-gold-500" />
        <span className="text-sm font-semibold text-gray-700">
          {provider.rating}
        </span>
        <span className="text-gray-400 text-xs">({provider.reviewCount} 评价)</span>
        {provider.ndisRegistered && (
          <span className="ml-2 text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
            NDIS注册
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {provider.type.map((t) => (
          <span
            key={t}
            className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="space-y-1.5 mb-3">
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

      {provider.specialties.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {provider.specialties.slice(0, 3).map((s) => (
            <span
              key={s}
              className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Link
          href={`/providers/${provider.id}`}
          className="flex-1 text-center text-sm font-semibold text-navy-900 border-2 border-navy-100 py-2 rounded-xl hover:border-navy-900 hover:bg-navy-900 hover:text-white transition-all"
        >
          查看详情
        </Link>
        <Link
          href={`/ai-advisor?q=${encodeURIComponent(`帮我评估${provider.chineseName || provider.name}这个Provider是否适合我`)}`}
          className="px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
          title="问AI"
        >
          <Brain size={15} className="text-gray-500" />
        </Link>
      </div>
    </div>
  );
}

function RegisterModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    business: "",
    type: "",
    location: "",
    phone: "",
    email: "",
    language: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "provider_register", data: form }),
      });
    } catch {
      // Silent — user still sees success
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white rounded-t-3xl px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-navy-900">
              申请加入成员目录
            </h2>
            <p className="text-gray-500 text-sm">审核通过后正式展示在目录中</p>
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
            <h3 className="text-xl font-bold text-navy-900 mb-2">
              提交成功！
            </h3>
            <p className="text-gray-500 mb-6">
              我们会在1-2个工作日内与你联系，完善你的Provider页面并开始推送客户线索。
            </p>
            <button
              onClick={onClose}
              className="bg-navy-900 text-white px-6 py-2.5 rounded-xl font-semibold text-sm"
            >
              好的，关闭
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="bg-navy-50 rounded-2xl p-4 text-sm text-navy-800">
              提交申请后，我们会在1-2个工作日内审核你的信息。审核通过后，你的机构将正式展示在成员目录中。
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-1">
                你的姓名 *
              </label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="中文姓名"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-navy-900 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-1">
                公司/机构名称 *
              </label>
              <input
                required
                type="text"
                value={form.business}
                onChange={(e) => setForm({ ...form, business: e.target.value })}
                placeholder="例：Harmony NDIS Services"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-navy-900 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-1">
                服务类型 *
              </label>
              <select
                required
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-navy-900 transition-colors bg-white"
              >
                <option value="">选择主要服务类型</option>
                {SERVICE_TYPES.slice(1).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-1">
                  所在城市 *
                </label>
                <select
                  required
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-navy-900 transition-colors bg-white"
                >
                  <option value="">选择城市</option>
                  {LOCATIONS.slice(1).map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-navy-900 mb-1">
                  服务语言 *
                </label>
                <select
                  required
                  value={form.language}
                  onChange={(e) =>
                    setForm({ ...form, language: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-navy-900 transition-colors bg-white"
                >
                  <option value="">选择语言</option>
                  {LANGUAGES.slice(1).map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-1">
                联系电话 *
              </label>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="04XX XXX XXX"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-navy-900 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-1">
                联系邮箱 *
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-navy-900 transition-colors"
              />
            </div>

            <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-500">
              ✓ 免费入驻  ✓ 接收匹配客户线索通知  ✓ 中文团队1对1支持
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-navy-900 text-white font-bold py-3 rounded-xl hover:bg-navy-800 disabled:bg-gray-400 transition-colors"
            >
              {submitting ? "提交中..." : "提交申请，免费入驻"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function ProvidersContent() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("全部");
  const [locationFilter, setLocationFilter] = useState("全部地区");
  const [languageFilter, setLanguageFilter] = useState("全部语言");
  const [showRegister, setShowRegister] = useState(
    searchParams.get("register") === "true"
  );

  const filteredProviders = PROVIDERS.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.chineseName &&
        p.chineseName.toLowerCase().includes(search.toLowerCase())) ||
      p.description.toLowerCase().includes(search.toLowerCase());

    const matchService =
      serviceFilter === "全部" || p.type.includes(serviceFilter);

    const matchLocation =
      locationFilter === "全部地区" ||
      p.location.toLowerCase().includes(
        locationFilter.replace(/.*\s/, "").toLowerCase()
      );

    const matchLanguage =
      languageFilter === "全部语言" || p.languages.includes(languageFilter);

    return matchSearch && matchService && matchLocation && matchLanguage;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}

      {/* Header */}
      <div className="bg-navy-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-blue-300 text-sm mb-3">
            <Link href="/" className="hover:text-white transition-colors">
              首页
            </Link>
            <ChevronRight size={13} />
            <span>圈内成员</span>
          </div>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">NDIS 行业成员目录</h1>
              <p className="text-blue-200">
                经审核认证的NDIS从业者与机构，按服务类型、地区、语言筛选
              </p>
            </div>
            <button
              onClick={() => setShowRegister(true)}
              className="flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-5 py-2.5 rounded-xl transition-colors"
            >
              <UserPlus size={15} />
              申请加入
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filters */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜索Provider名称或服务内容..."
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-navy-900 transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
              <div className="flex items-center gap-1.5">
                <Filter size={13} className="text-gray-400" />
                <select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                  className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-navy-900 bg-white transition-colors"
                >
                  {SERVICE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-navy-900 bg-white transition-colors"
              >
                {LOCATIONS.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-navy-900 bg-white transition-colors"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            找到 <strong className="text-navy-900">{filteredProviders.length}</strong> 个Provider
          </p>
          {filteredProviders.length < PROVIDERS.length && (
            <button
              onClick={() => {
                setSearch("");
                setServiceFilter("全部");
                setLocationFilter("全部地区");
                setLanguageFilter("全部语言");
              }}
              className="text-xs text-blue-600 hover:underline"
            >
              清除筛选
            </button>
          )}
        </div>

        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Empty state hero */}
            <div className="text-center py-14 px-6">
              <div className="w-16 h-16 rounded-2xl bg-navy-900 flex items-center justify-center mx-auto mb-5">
                <UserPlus size={28} className="text-gold-400" />
              </div>
              <h3 className="text-xl font-bold text-navy-900 mb-2">
                成员目录建立中
              </h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
                我们正在对NDIS从业者进行资质审核，审核通过后将在此展示。
                现在申请，成为首批认证成员。
              </p>
              <button
                onClick={() => setShowRegister(true)}
                className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                <UserPlus size={15} />
                申请加入成员目录
              </button>
            </div>

            {/* Benefits strip */}
            <div className="border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
              {[
                { icon: CheckCircle, title: "认证展示", desc: "通过审核后在目录中优先展示" },
                { icon: Brain, title: "AI智能推荐", desc: "参与者通过AI顾问询问时被推荐" },
                { icon: ArrowRight, title: "圈内转介绍", desc: "加入从业者社群，获得同行转介绍" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 px-6 py-5">
                  <item.icon size={16} className="text-gold-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-navy-900">{item.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        {filteredProviders.length > 0 && (
          <div className="mt-10 bg-navy-900 rounded-2xl p-6 text-center">
            <h3 className="text-white font-bold text-lg mb-2">
              你也在NDIS行业？
            </h3>
            <p className="text-blue-300 text-sm mb-4">
              提交申请，审核通过后加入成员目录，让同行和客户找到你
            </p>
            <button
              onClick={() => setShowRegister(true)}
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              <UserPlus size={15} />
              申请加入
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProvidersPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin w-8 h-8 border-2 border-navy-900 border-t-transparent rounded-full" />
        </div>
      }
    >
      <ProvidersContent />
    </Suspense>
  );
}
