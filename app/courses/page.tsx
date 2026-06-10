"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Video,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  BookOpen,
  Phone,
  MessageCircle,
} from "lucide-react";

const COURSES = [
  {
    id: "1",
    title: "NDIS Provider 注册从零到一",
    subtitle: "适合：想进入NDIS行业的创业者",
    price: "AUD $497",
    originalPrice: "AUD $797",
    duration: "8小时课程 + 资料包",
    students: 143,
    rating: 4.9,
    tag: "最受欢迎",
    tagColor: "bg-gold-500 text-navy-950",
    description:
      "从注册类型选择、Worker Screening Check，到NDIS Practice Standards、服务协议模板——帮你把每一步都做对，不走弯路。",
    modules: [
      "NDIS注册类型选择（注册 vs 未注册）",
      "Worker Screening Check全流程",
      "Quality Standards审核准备",
      "服务协议与价格指南合规",
      "华人Provider常见踩坑清单",
      "上线后第一批客户怎么找",
    ],
    instructor: "资深NDIS顾问 · 10年行业经验",
  },
  {
    id: "2",
    title: "NDIS 生意运营与合规管理",
    subtitle: "适合：已入行的Provider想做大做强",
    price: "AUD $397",
    originalPrice: "AUD $597",
    duration: "6小时课程 + 模板包",
    students: 89,
    rating: 4.8,
    tag: "进阶推荐",
    tagColor: "bg-blue-600 text-white",
    description:
      "如何定价、如何做服务协议、如何应对NDIS审计、如何留住客户——把你的NDIS生意从单打独斗变成系统化运营。",
    modules: [
      "NDIS价格指南解读与定价策略",
      "服务协议设计与风险控制",
      "年度审计如何过关",
      "员工管理与Worker Screening",
      "客户留存与口碑建立",
      "扩张：从个人到团队",
    ],
    instructor: "澳洲注册会计师 + NDIS合规顾问",
  },
  {
    id: "3",
    title: "Support Coordinator 实战技能",
    subtitle: "适合：新手SC或想提升的从业者",
    price: "AUD $297",
    originalPrice: "AUD $447",
    duration: "5小时课程",
    students: 67,
    rating: 4.7,
    tag: "新课上线",
    tagColor: "bg-emerald-600 text-white",
    description:
      "SC的日常：如何制定支持计划、如何协调多个Provider、如何帮助参与者准备计划审查——用华人视角拆解SC的核心技能。",
    modules: [
      "SC职责边界与伦理规范",
      "支持计划制定实战",
      "多Provider协调技巧",
      "计划审查准备与陪同",
      "参与者危机处理",
      "如何与LAC和NDIA沟通",
    ],
    instructor: "持牌Support Coordinator · 8年经验",
  },
];

// 真实学员评价待开课后接入；不放编造的评价。
const TESTIMONIALS: { name: string; role: string; content: string; rating: number }[] = [];

function InquiryForm({ courseTitle }: { courseTitle?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    wechat: "",
    interest: courseTitle || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "course_inquiry", data: form }),
      });
    } catch {
      // Silent — user still sees success
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-6">
        <CheckCircle size={32} className="text-green-500 mx-auto mb-3" />
        <h3 className="font-bold text-navy-900 mb-2">报名信息已提交！</h3>
        <p className="text-gray-500 text-sm">
          导师团队会在1-2个工作日内通过电话或微信与你联系，了解你的情况并推荐合适的课程。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
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
          微信号（可选）
        </label>
        <input
          type="text"
          value={form.wechat}
          onChange={(e) => setForm({ ...form, wechat: e.target.value })}
          placeholder="微信号"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-navy-900 transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-navy-900 mb-1">
          感兴趣的课程
        </label>
        <select
          value={form.interest}
          onChange={(e) => setForm({ ...form, interest: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-navy-900 bg-white transition-colors"
        >
          <option value="">选择课程（可留空）</option>
          {COURSES.map((c) => (
            <option key={c.id} value={c.title}>
              {c.title}
            </option>
          ))}
          <option value="不确定">还不确定，希望咨询</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-navy-900 text-white font-bold py-3 rounded-xl hover:bg-navy-800 disabled:bg-gray-400 transition-colors"
      >
        {submitting ? "提交中..." : "提交，等待导师联系"}
      </button>
      <p className="text-xs text-gray-400 text-center">
        提交即表示同意我们通过电话/微信与你联系
      </p>
    </form>
  );
}

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

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
            <span>生意辅导课程</span>
          </div>
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-gold-500/20 rounded-full px-3 py-1 mb-4">
              <Video size={13} className="text-gold-400" />
              <span className="text-gold-300 text-xs font-medium">
                华人NDIS从业者专属课程
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-3">NDIS 生意辅导课程</h1>
            <p className="text-blue-200">
              用中文，学会如何在澳洲NDIS行业做对、做好、做大。
              从注册入行到合规运营，每一门课程都来自真实从业经验。
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course List */}
          <div className="lg:col-span-2 space-y-6">
            {COURSES.map((course) => (
              <div
                key={course.id}
                className={`bg-white rounded-2xl border-2 transition-all ${
                  selectedCourse === course.id
                    ? "border-navy-900 shadow-lg"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="p-6">
                  {/* Tag + Title */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full ${course.tagColor}`}
                        >
                          {course.tag}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {course.subtitle}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-navy-900">
                        {course.title}
                      </h2>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="inline-block text-sm font-bold text-gold-700 bg-gold-100 px-3 py-1 rounded-full">
                        即将推出
                      </span>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-3 mb-3">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock size={11} />
                      {course.duration}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Modules toggle */}
                  <button
                    onClick={() =>
                      setSelectedCourse(
                        selectedCourse === course.id ? null : course.id
                      )
                    }
                    className="flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-blue-600 transition-colors mb-3"
                  >
                    <BookOpen size={14} />
                    {selectedCourse === course.id ? "收起" : "查看课程大纲"}
                    <ChevronRight
                      size={13}
                      className={`transition-transform ${selectedCourse === course.id ? "rotate-90" : ""}`}
                    />
                  </button>

                  {selectedCourse === course.id && (
                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {course.modules.map((mod, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-sm text-gray-700"
                          >
                            <span className="text-navy-900 font-bold text-xs mt-0.5 flex-shrink-0">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {mod}
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500">
                        导师：{course.instructor}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowForm(true);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="flex-1 bg-navy-900 text-white font-bold py-2.5 rounded-xl hover:bg-navy-800 transition-colors text-sm"
                    >
                      感兴趣？登记，开课先通知你
                    </button>
                    <Link
                      href={`/ai-advisor?q=${encodeURIComponent(`"${course.title}"这门课大概会讲哪些内容？`)}`}
                      className="px-4 py-2.5 border-2 border-navy-900 text-navy-900 rounded-xl text-sm font-semibold hover:bg-navy-900 hover:text-white transition-colors"
                    >
                      问AI讲什么
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Testimonials（有真实评价时才显示） */}
            {TESTIMONIALS.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-4">
                学员评价
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {TESTIMONIALS.map((t, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-gray-100 p-4"
                  >
                    <div className="flex gap-0.5 mb-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={12}
                          className="text-gold-500 fill-gold-500"
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 text-xs leading-relaxed mb-3">
                      {t.content}
                    </p>
                    <div>
                      <div className="font-semibold text-navy-900 text-sm">
                        {t.name}
                      </div>
                      <div className="text-gray-400 text-xs">{t.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Inquiry Form */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
              <h3 className="font-bold text-navy-900 mb-1">报名 / 咨询</h3>
              <p className="text-gray-500 text-xs mb-4">
                填写信息，导师会在1-2个工作日内联系你，根据你的情况推荐合适的课程。
              </p>
              <InquiryForm />
            </div>

            {/* Contact */}
            <div className="bg-navy-900 rounded-2xl p-5 text-white">
              <h3 className="font-semibold mb-3 text-sm">有疑问？直接联系</h3>
              <div className="space-y-2">
                <a
                  href="tel:+61400000000"
                  className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors text-sm"
                >
                  <Phone size={14} />
                  电话咨询（工作日）
                </a>
                <a
                  href="https://www.australiabusinessalliance.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors text-sm"
                >
                  <MessageCircle size={14} />
                  澳洲商业联盟微信群
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-navy-900 mb-3 text-sm">常见问题</h3>
              <div className="space-y-3">
                {[
                  {
                    q: "课程是线上还是线下？",
                    a: "以录播课程为主，购买后可永久观看。部分课程配套线下工作坊。",
                  },
                  {
                    q: "没有NDIS基础可以报名吗？",
                    a: "可以。注册入门课程从零基础开始讲，不需要任何NDIS背景知识。",
                  },
                  {
                    q: "课程语言是中文吗？",
                    a: "全程普通话讲授，配中英对照资料包。",
                  },
                  {
                    q: "购买后可以退款吗？",
                    a: "7天内未观看超过30%可申请全额退款。",
                  },
                ].map((faq, i) => (
                  <div key={i} className="border-b border-gray-50 last:border-0 pb-3 last:pb-0">
                    <div className="text-sm font-semibold text-navy-900 mb-1">
                      {faq.q}
                    </div>
                    <div className="text-xs text-gray-500 leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 bg-gradient-to-r from-navy-900 to-navy-950 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">
            不确定哪门课适合你？
          </h2>
          <p className="text-blue-300 mb-5">
            先问问AI顾问，描述你现在的情况，它会告诉你最适合的学习路径。
          </p>
          <Link
            href="/ai-advisor?q=我想进入NDIS行业，应该先学什么？"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-6 py-3 rounded-xl transition-colors"
          >
            问AI顾问推荐课程 <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
