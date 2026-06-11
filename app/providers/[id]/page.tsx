"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  MapPin,
  MessageCircle,
  Phone,
  Mail,
  CheckCircle,
  ChevronRight,
  ArrowRight,
  Brain,
  Shield,
  Award,
  Clock,
} from "lucide-react";
import { PROVIDERS } from "@/lib/providers-data";

// 真实评价待认领机构入驻后接入；不放假评价。
const REVIEWS: { author: string; rating: number; date: string; content: string }[] = [];

const SIMILAR_TIPS = [
  "预约前准备好你的NDIS计划副本",
  "明确列出你需要的支持类型和频率",
  "询问他们的可用时间和响应方式",
  "了解他们的服务协议条款",
];

export default function ProviderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const provider = PROVIDERS.find((p) => p.id === params.id);

  if (!provider) {
    notFound();
  }

  const otherProviders = PROVIDERS.filter(
    (p) => p.id !== provider.id && p.type.some((t) => provider.type.includes(t))
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-navy-900 transition-colors">
              首页
            </Link>
            <ChevronRight size={13} />
            <Link
              href="/providers"
              className="hover:text-navy-900 transition-colors"
            >
              圈内成员
            </Link>
            <ChevronRight size={13} />
            <span className="text-navy-900 font-medium">
              {provider.chineseName || provider.name}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-navy-50 border border-navy-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-navy-900 font-bold text-2xl">
                    {provider.name[0]}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <h1 className="text-2xl font-bold text-navy-900">
                        {provider.chineseName || provider.name}
                      </h1>
                      {provider.chineseName && (
                        <p className="text-gray-400 text-sm">{provider.name}</p>
                      )}
                    </div>
                    {provider.verified && (
                      <div className="verified-badge flex items-center gap-1.5 px-3 py-1.5 rounded-full">
                        <CheckCircle size={13} className="text-white" />
                        <span className="text-white text-sm font-medium">
                          平台已核实
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Rating（仅已认领且有评分时展示） */}
                  {provider.rating ? (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={15}
                            className={
                              star <= Math.round(provider.rating ?? 0)
                                ? "text-gold-500 fill-gold-500"
                                : "text-gray-200 fill-gray-200"
                            }
                          />
                        ))}
                      </div>
                      <span className="font-bold text-gray-800">
                        {provider.rating}
                      </span>
                      <span className="text-gray-400 text-sm">
                        ({provider.reviewCount ?? 0} 位用户评价)
                      </span>
                    </div>
                  ) : (
                    <div className="mt-2 text-xs text-gray-400">
                      行业公开资源 · 平台持续收录
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {[
                  {
                    icon: MapPin,
                    label: "服务地区",
                    value: provider.location,
                  },
                  {
                    icon: MessageCircle,
                    label: "服务语言",
                    value: provider.languages.join("、"),
                  },
                  {
                    icon: Award,
                    label: "NDIS注册",
                    value: provider.ndisRegistered ? "已注册Provider" : "未注册",
                  },
                  {
                    icon: Clock,
                    label: "服务类型",
                    value: provider.type.length + " 项服务",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3"
                  >
                    <item.icon size={15} className="text-navy-600 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-400">{item.label}</div>
                      <div className="text-sm font-medium text-gray-700">
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Service Types */}
              <div className="mb-5">
                <h3 className="font-semibold text-navy-900 mb-2 text-sm">
                  服务类型
                </h3>
                <div className="flex flex-wrap gap-2">
                  {provider.type.map((t) => (
                    <span
                      key={t}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              {provider.specialties.length > 0 && (
                <div className="mb-5">
                  <h3 className="font-semibold text-navy-900 mb-2 text-sm">
                    专长领域
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {provider.specialties.map((s) => (
                      <span
                        key={s}
                        className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="font-semibold text-navy-900 mb-2 text-sm">
                  关于我们
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {provider.description}
                </p>
              </div>
            </div>

            {/* Tips for contacting */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                <Shield size={15} />
                联系前建议准备
              </h3>
              <ul className="space-y-2">
                {SIMILAR_TIPS.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-amber-800">
                    <span className="text-amber-600 font-bold mt-0.5">✓</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews（仅已认领且有评分时展示） */}
            {provider.rating ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-bold text-navy-900 mb-5 flex items-center justify-between">
                <span>用户评价</span>
                <div className="flex items-center gap-1.5">
                  <Star size={15} className="text-gold-500 fill-gold-500" />
                  <span className="text-gray-700 font-bold">{provider.rating}</span>
                  <span className="text-gray-400 text-sm font-normal">
                    / 5.0
                  </span>
                </div>
              </h3>
              <div className="space-y-5">
                {REVIEWS.slice(0, (provider.reviewCount ?? 0) > 20 ? 3 : 2).map(
                  (review, i) => (
                    <div
                      key={i}
                      className="border-b border-gray-50 last:border-0 pb-5 last:pb-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-navy-50 flex items-center justify-center text-sm font-semibold text-navy-700">
                            {review.author[0]}
                          </div>
                          <span className="font-medium text-sm text-gray-800">
                            {review.author}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                size={11}
                                className={
                                  s <= review.rating
                                    ? "text-gold-500 fill-gold-500"
                                    : "text-gray-200"
                                }
                              />
                            ))}
                          </div>
                          <span className="text-gray-400 text-xs">
                            {review.date}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {review.content}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
            ) : null}

            {/* AI Ask CTA */}
            <div className="bg-navy-900 rounded-2xl p-5 flex items-center gap-4 flex-wrap">
              <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                <Brain size={18} className="text-gold-400" />
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">
                  不确定这个Provider适不适合你？
                </div>
                <div className="text-blue-300 text-xs mt-0.5">
                  用AI顾问描述你的情况，获得个性化匹配建议
                </div>
              </div>
              <Link
                href={`/ai-advisor?q=${encodeURIComponent(`我想了解 ${provider.chineseName || provider.name} 这个Provider，帮我评估是否适合我的情况`)}`}
                className="flex items-center gap-1.5 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-4 py-2 rounded-xl text-sm transition-colors flex-shrink-0"
              >
                问AI顾问 <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
              <h3 className="font-bold text-navy-900 mb-4">联系方式</h3>

              {provider.phone && (
                <a
                  href={`tel:${provider.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-navy-900 hover:bg-navy-50 transition-all mb-2 group"
                >
                  <Phone
                    size={16}
                    className="text-navy-600 group-hover:text-navy-900"
                  />
                  <div>
                    <div className="text-xs text-gray-400">电话</div>
                    <div className="text-sm font-semibold text-navy-900">
                      {provider.phone}
                    </div>
                  </div>
                </a>
              )}

              {provider.email && (
                <a
                  href={`mailto:${provider.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-navy-900 hover:bg-navy-50 transition-all mb-4 group"
                >
                  <Mail
                    size={16}
                    className="text-navy-600 group-hover:text-navy-900"
                  />
                  <div>
                    <div className="text-xs text-gray-400">邮箱</div>
                    <div className="text-sm font-semibold text-navy-900">
                      {provider.email}
                    </div>
                  </div>
                </a>
              )}

              {!provider.phone && !provider.email && (
                <p className="text-gray-400 text-sm mb-4">
                  联系方式待Provider完善。
                </p>
              )}

              {/* Lead form */}
              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-500 mb-3">
                  提交你的需求，让Provider主动联系你：
                </p>
                <LeadForm providerName={provider.chineseName || provider.name} />
              </div>
            </div>

            {/* Similar Providers */}
            {otherProviders.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-bold text-navy-900 mb-4 text-sm">
                  同类型 Provider
                </h3>
                <div className="space-y-3">
                  {otherProviders.map((p) => (
                    <Link
                      key={p.id}
                      href={`/providers/${p.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-navy-50 flex items-center justify-center flex-shrink-0">
                        <span className="text-navy-700 font-bold text-sm">
                          {p.name[0]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-navy-900 truncate group-hover:text-blue-600 transition-colors">
                          {p.chineseName || p.name}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star
                            size={10}
                            className="text-gold-500 fill-gold-500"
                          />
                          <span className="text-xs text-gray-500">
                            {p.rating} · {p.suburb}
                          </span>
                        </div>
                      </div>
                      <ChevronRight
                        size={14}
                        className="text-gray-300 group-hover:text-navy-900 transition-colors"
                      />
                    </Link>
                  ))}
                </div>
                <Link
                  href="/providers"
                  className="block mt-3 text-center text-xs font-semibold text-navy-900 hover:text-blue-600 transition-colors"
                >
                  查看全部 Provider →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadForm({ providerName }: { providerName: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-3">
        <CheckCircle size={24} className="text-green-500 mx-auto mb-2" />
        <p className="text-sm text-gray-700 font-medium">需求已提交！</p>
        <p className="text-xs text-gray-400 mt-1">Provider会尽快与你联系</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        required
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="你的姓名"
        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-navy-900 transition-colors"
      />
      <input
        required
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="联系电话"
        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-navy-900 transition-colors"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="简单描述你的需求..."
        rows={2}
        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-navy-900 transition-colors resize-none"
      />
      <button
        type="submit"
        className="w-full bg-navy-900 text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-navy-800 transition-colors"
      >
        提交需求给 {providerName}
      </button>
    </form>
  );
}
