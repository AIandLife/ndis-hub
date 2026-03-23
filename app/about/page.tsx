import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Shield,
  Users,
  Brain,
  Heart,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">关于澳洲NDIS圈</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            我们是一群在澳洲生活的华人，深刻理解语言和文化障碍带来的困扰——
            所以我们建立了这个平台。
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission */}
        <div className="bg-white rounded-3xl p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-navy-900 mb-4">我们的使命</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            澳大利亚的NDIS体系是世界上最先进的残障支持体系之一，但对华人社区来说，
            语言障碍、文化差异和信息碎片化让这个体系变得难以触达。
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            每次我们的线下活动，都有数百位华人家庭带着问题而来——
            "我的孩子被诊断了，第一步怎么做？"
            "Provider没有提供服务，怎么投诉？"
            "我想进入这个行业，需要什么资质？"
          </p>
          <p className="text-gray-600 leading-relaxed">
            澳洲NDIS圈的使命是：
            <strong className="text-navy-900">
              让每一位华人家庭和从业者，都能用中文找到NDIS的方向。
            </strong>
          </p>
        </div>

        {/* What we offer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          {[
            {
              icon: Brain,
              title: "AI驱动，专业准确",
              desc: "基于NDIS官方文件的中文知识库，AI顾问提供有方向性的回答，而不是泛泛的《请咨询专业人士》。",
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              icon: Users,
              title: "真实社群",
              desc: "线上平台连接线下社群。我们的活动每次吸引数百位华人NDIS从业者和家属参与。",
              color: "text-purple-600",
              bg: "bg-purple-50",
            },
            {
              icon: Shield,
              title: "内容可信",
              desc: "所有内容来源于NDIS官方文件和经验丰富的华人顾问审核。AI答案提供明确免责声明。",
              color: "text-green-600",
              bg: "bg-green-50",
            },
            {
              icon: Heart,
              title: "华人生态",
              desc: "澳洲NDIS圈是澳洲商业联盟生态的一部分，与房产、移民等华人服务平台形成互联生态。",
              color: "text-red-600",
              bg: "bg-red-50",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-100 p-6"
            >
              <div
                className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-4`}
              >
                <item.icon className={item.color} size={18} />
              </div>
              <h3 className="font-bold text-navy-900 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
          <h3 className="font-semibold text-amber-900 mb-3">重要免责声明</h3>
          <p className="text-amber-800 text-sm leading-relaxed">
            澳洲NDIS圈提供的所有信息（包括AI顾问回答、文章、Provider信息）
            均仅供参考，不构成法律、医疗或财务建议。
            NDIS政策可能随时更新，请以
            <a
              href="https://ndis.gov.au"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-700 underline mx-1"
            >
              NDIS官方网站
            </a>
            最新信息为准。
            重要决定（如申诉、投诉、计划审查）请咨询持牌NDIS专业人士。
          </p>
        </div>

        {/* Ecosystem */}
        <div className="bg-navy-900 rounded-3xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">澳洲商业联盟生态</h2>
          <p className="text-blue-300 mb-6 text-sm">
            澳洲NDIS圈是澳洲商业联盟的垂直生态成员，
            共同为华人在澳发展提供专业支持。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://auscircle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              访问澳洲商业联盟 <ExternalLink size={14} />
            </a>
            <a
              href="https://aussie-property.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              澳洲房产AI <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <p className="text-gray-500 mb-4">
            有合作意向或想联系我们？
          </p>
          <Link
            href="/ai-advisor"
            className="inline-flex items-center gap-2 bg-navy-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-navy-800 transition-colors"
          >
            先试试AI顾问 <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
