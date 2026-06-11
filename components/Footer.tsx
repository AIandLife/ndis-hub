import Link from "next/link";
import { ExternalLink, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center">
                <span className="text-navy-950 font-bold text-sm">N</span>
              </div>
              <div>
                <div className="text-white font-bold text-base">澳洲NDIS圈</div>
                <div className="text-gray-500 text-xs">NDIS Hub AU</div>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              华人 NDIS 从业者的 B2B 资源与人脉平台。找同行、找供应商、找合作。
            </p>
            <p className="text-xs text-gray-600 mt-3">
              本平台内容仅供参考，不构成专业法律或医疗建议。
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">平台功能</h3>
            <ul className="space-y-2">
              {[
                { href: "/ai-advisor", label: "AI 智能顾问" },
                { href: "/journey", label: "NDIS 全流程图" },
                { href: "/providers", label: "圈内成员" },
                { href: "/resources", label: "知识库" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Business */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">商业合作</h3>
            <ul className="space-y-2">
              {[
                { href: "/providers?register=true", label: "免费入驻" },
                { href: "/providers", label: "商家资源库" },
                { href: "/courses", label: "生意辅导课程" },
                { href: "mailto:recommendforterry@gmail.com", label: "联系：Recommend for Terry" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">生态伙伴</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.australiabusinessalliance.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors flex items-center gap-1"
                >
                  澳洲商业联盟 <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://auspropertycircle.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors flex items-center gap-1"
                >
                  澳洲房产圈 <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://ausbuildcircle.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors flex items-center gap-1"
                >
                  澳洲建房圈 <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://ndis.gov.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors flex items-center gap-1"
                >
                  NDIS 官网 <ExternalLink size={11} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © 2026 澳洲NDIS圈 NDIS Hub AU. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            Built with <Heart size={11} className="text-gold-500" /> by 澳洲商业联盟生态
          </p>
        </div>
      </div>
    </footer>
  );
}
