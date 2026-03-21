"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  FileText,
  ClipboardList,
  DollarSign,
  Users,
  Heart,
  RefreshCw,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";

interface Step {
  id: number;
  num: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  description: string;
  keyPoints: string[];
  tips: string[];
  commonIssues: string[];
  link?: string;
}

const JOURNEY_STEPS: Step[] = [
  {
    id: 1,
    num: "01",
    title: "资格申请",
    subtitle: "Access Request",
    icon: FileText,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    description:
      "NDIS申请的第一步是确认你或你的孩子是否符合NDIS资格。这一步需要准备医疗证明材料并提交申请。",
    keyPoints: [
      "年龄：申请时未满65岁",
      "居住：澳洲公民、PR或保护性签证",
      "残障：永久性、显著影响日常生活",
      "需要医疗专业人员的诊断报告",
    ],
    tips: [
      "提前与GP沟通，让他们了解NDIS申请流程",
      "同时准备OT（职业治疗）评估，说明功能影响",
      "可申请TIS翻译服务（131 450），无需支付费用",
      "申请可通过电话、网络或面对面完成",
    ],
    commonIssues: [
      "诊断报告不够详细 → 要求医生具体描述功能限制",
      "等待时间长（4-6周）→ 可跟进进度",
      "被拒绝 → 28天内申请内部审查",
    ],
  },
  {
    id: 2,
    num: "02",
    title: "计划制定",
    subtitle: "Planning Meeting",
    icon: ClipboardList,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    description:
      "资格被批准后，NDIS规划师（Planner）或本地区域协调员（LAC）会联系你，安排计划制定会议，讨论你的需求和目标。",
    keyPoints: [
      "提前列出你的生活目标（短期/长期）",
      "Core支持：日常活动、社区参与",
      "Capacity Building：技能建设、就业",
      "Capital支持：设备、家居改造",
    ],
    tips: [
      "会议前写下所有你认为需要的支持",
      "可以带支持人员（家人、Support Coordinator）参加",
      "如果语言不通，申请翻译",
      "不要只讲诊断，要讲日常生活受到的影响",
    ],
    commonIssues: [
      "计划金额少于预期 → 提供更多证据，申请审查",
      "不清楚要什么 → 提前咨询Support Coordinator",
      "规划师不了解华人文化背景 → 可以书面补充说明",
    ],
  },
  {
    id: 3,
    num: "03",
    title: "计划管理",
    subtitle: "Plan Management",
    icon: DollarSign,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    description:
      "NDIS计划批准后，需要决定如何管理你的资金。三种方式各有优缺点，选择最适合你情况的。",
    keyPoints: [
      "NDIA管理：NDIS直接付款，只能用注册Provider",
      "计划管理（Plan-managed）：Plan Manager代管，更灵活",
      "自管（Self-managed）：自己处理发票，最灵活但要求高",
      "可以不同支持类别用不同管理方式",
    ],
    tips: [
      "大多数华人参与者选择Plan Management，灵活且简单",
      "Plan Manager费用由NDIS额外支付，不占你的核心预算",
      "自管需要保留所有发票备查",
      "可以在计划审查时更改管理方式",
    ],
    commonIssues: [
      "Plan Manager响应慢 → 明确期望，换PM也是选项",
      "发票被拒 → 检查Provider是否注册、服务是否符合计划",
      "预算快用完 → 提前与SC或PM沟通",
    ],
  },
  {
    id: 4,
    num: "04",
    title: "服务协调",
    subtitle: "Support Coordination",
    icon: Users,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    description:
      "Support Coordinator（支持协调员）帮助你找到合适的Provider，协调不同服务，解决问题。他们是你在NDIS系统中的向导。",
    keyPoints: [
      "SC帮助你理解计划和资金",
      "协调不同Provider和服务",
      "处理紧急情况和Provider投诉",
      "准备计划审查材料",
    ],
    tips: [
      "选择中文SC，沟通更顺畅",
      "SC的费用从Capacity Building预算中支出",
      "建立良好的定期沟通习惯",
      "SC不等于Plan Manager，职责不同",
    ],
    commonIssues: [
      "SC太忙，联系不上 → 设置明确的沟通方式和频率",
      "SC不主动 → 你可以更换SC",
      "对SC不满意 → 记录问题，联系NDIS Quality Commission",
    ],
  },
  {
    id: 5,
    num: "05",
    title: "使用服务",
    subtitle: "Service Delivery",
    icon: Heart,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    description:
      "找到合适的Provider后，签署服务协议，开始享受支持服务。这一阶段要注意监控服务质量和预算使用。",
    keyPoints: [
      "与Provider签署正式服务协议",
      "确认收费标准不超过NDIS价格指南",
      "定期检查预算使用情况",
      "记录服务质量，保留沟通记录",
    ],
    tips: [
      "服务协议中明确服务内容、频率、费用",
      "每月与Plan Manager对账预算",
      "如果服务质量不满意，先与Provider沟通",
      "可以在不超过取消政策的情况下更换Provider",
    ],
    commonIssues: [
      "Provider不提供承诺的服务 → 投诉到NDIS Commission",
      "收费超过价格指南 → 要求退款，向NDIS Commission举报",
      "预算用完 → 申请Non-Scheduled Review",
    ],
  },
  {
    id: 6,
    num: "06",
    title: "计划审查",
    subtitle: "Plan Review",
    icon: RefreshCw,
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-200",
    description:
      "NDIS计划通常每1-3年审查一次。这是申请更多支持或调整计划的机会。充分准备，争取最好的结果。",
    keyPoints: [
      "年度审查（Annual Review）是常规流程",
      "可主动申请Non-Scheduled Review（情况变化时）",
      "准备目标实现证据和新的支持需求",
      "2026年新规划框架将改变审查方式",
    ],
    tips: [
      "与SC提前3个月开始准备审查材料",
      "收集使用服务的证据和进展",
      "如果有新的医疗报告，一起提交",
      "了解2026年改革，提前应对新评估方式",
    ],
    commonIssues: [
      "计划金额被削减 → 准备充分证据，申诉",
      "不满意审查结果 → 申请Internal Review → AAT",
      "超龄转Aged Care → 提前6-12个月开始准备",
    ],
  },
];

export default function JourneyPage() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"tips" | "issues">("tips");

  const selectedStep = JOURNEY_STEPS.find((s) => s.id === activeStep);

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
            <span>NDIS 全流程图</span>
          </div>
          <h1 className="text-3xl font-bold mb-3">NDIS 全流程图</h1>
          <p className="text-blue-200 max-w-2xl">
            从申请资格到计划审查，完整的中文导航。点击每个环节查看详细说明、华人实战建议和常见问题解决方案。
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* 2026 Reform Notice */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 mb-8">
          <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-amber-900 mb-1">
              2026年NDIS改革重要提示
            </div>
            <p className="text-amber-800 text-sm">
              澳洲政府正在推进NDIS重大改革：2026年起支持需求评估改为约
              <strong>3小时面谈制</strong>
              ，新规划框架也将同步推出。现有参与者应与你的Support
              Coordinator提前沟通应对策略。
              <a
                href="https://ndis.gov.au"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 underline ml-1"
              >
                了解更多
              </a>
            </p>
          </div>
        </div>

        {/* Journey Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {JOURNEY_STEPS.map((step, i) => (
            <button
              key={step.id}
              id={`step-${step.id}`}
              onClick={() =>
                setActiveStep(activeStep === step.id ? null : step.id)
              }
              className={`relative text-left rounded-2xl border-2 p-5 transition-all journey-node ${
                activeStep === step.id
                  ? `${step.border} ${step.bg} shadow-md`
                  : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
              }`}
            >
              {/* Connector arrow for desktop */}
              {i < JOURNEY_STEPS.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white border-2 border-gray-200 items-center justify-center">
                  <ArrowRight size={10} className="text-gray-400" />
                </div>
              )}

              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-xl ${step.bg} border ${step.border} flex items-center justify-center flex-shrink-0`}
                >
                  <step.icon className={step.color} size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-400 text-xs font-mono">
                      {step.num}
                    </span>
                  </div>
                  <div className="font-bold text-navy-900">{step.title}</div>
                  <div className="text-gray-400 text-xs">{step.subtitle}</div>
                </div>
                <ChevronRight
                  size={16}
                  className={`text-gray-300 flex-shrink-0 transition-transform ${activeStep === step.id ? "rotate-90" : ""}`}
                />
              </div>

              <p className="text-gray-500 text-xs mt-3 leading-relaxed line-clamp-2">
                {step.description}
              </p>
            </button>
          ))}
        </div>

        {/* Detail Panel */}
        {selectedStep && (
          <div className={`rounded-3xl border-2 ${selectedStep.border} ${selectedStep.bg} p-6 lg:p-8 mb-8 animate-fade-in`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl bg-white border ${selectedStep.border} flex items-center justify-center`}>
                <selectedStep.icon className={selectedStep.color} size={22} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-navy-900">
                  {selectedStep.title}
                </h2>
                <p className="text-gray-500 text-sm">
                  {selectedStep.subtitle}
                </p>
              </div>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {selectedStep.description}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Key Points */}
              <div className="bg-white rounded-2xl p-5 border border-white/50">
                <h3 className="font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <Info size={15} className={selectedStep.color} />
                  关键要点
                </h3>
                <ul className="space-y-2">
                  {selectedStep.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle size={13} className={`${selectedStep.color} flex-shrink-0 mt-0.5`} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tabs: Tips / Issues */}
              <div className="bg-white rounded-2xl p-5 border border-white/50">
                <div className="flex gap-2 mb-4">
                  {(["tips", "issues"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        activeTab === tab
                          ? "bg-navy-900 text-white"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {tab === "tips" ? "华人实战建议" : "常见问题解决"}
                    </button>
                  ))}
                </div>

                <ul className="space-y-2">
                  {(activeTab === "tips"
                    ? selectedStep.tips
                    : selectedStep.commonIssues
                  ).map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span
                        className={`${selectedStep.color} flex-shrink-0 font-bold text-xs mt-0.5`}
                      >
                        {activeTab === "tips" ? "✓" : "→"}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* AI CTA */}
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <Link
                href={`/ai-advisor?q=${encodeURIComponent(`关于${selectedStep.title}，我想了解更多`  )}`}
                className="inline-flex items-center gap-2 bg-navy-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-navy-800 transition-colors"
              >
                AI顾问深入解答此环节 <ArrowRight size={14} />
              </Link>
              <Link
                href="/providers"
                className="inline-flex items-center gap-2 border-2 border-navy-900 text-navy-900 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-navy-900 hover:text-white transition-colors"
              >
                找相关 Provider
              </Link>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
          <h3 className="text-lg font-bold text-navy-900 mb-2">
            还是不清楚自己的情况？
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            用中文描述你的情况，AI顾问帮你找到当前最适合的下一步。
          </p>
          <Link
            href="/ai-advisor"
            className="inline-flex items-center gap-2 bg-navy-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-navy-800 transition-colors"
          >
            开始 AI 问答 <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
