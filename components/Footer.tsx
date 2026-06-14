"use client";

import Link from "next/link";
import { ExternalLink, Heart } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function Footer() {
  const { lang, t } = useI18n();
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
                <div className="text-white font-bold text-base">
                  {lang === "en" ? "NDIS Circle" : "澳洲NDIS圈"}
                </div>
                <div className="text-gray-500 text-xs">NDIS Circle AU</div>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              {t("footer.tagline")}
            </p>
            <p className="text-xs text-gray-600 mt-3">
              {t("footer.disclaimer")}
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">{t("footer.platform")}</h3>
            <ul className="space-y-2">
              {[
                { href: "/providers", label: t("nav.providers") },
                { href: "/board", label: t("nav.board") },
                { href: "/ai-advisor", label: t("nav.aiAdvisor") },
                { href: "/insights", label: t("nav.insights") },
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
            <h3 className="text-white font-semibold text-sm mb-4">{t("footer.business")}</h3>
            <ul className="space-y-2">
              {[
                { href: "/providers?register=true", label: t("nav.freeListing") },
                { href: "/providers", label: t("nav.providers") },
                { href: "/board", label: t("nav.board") },
                { href: "mailto:RecommendforTerry@gmail.com", label: (lang === "en" ? "Email: " : "联系邮箱：") + "RecommendforTerry@gmail.com" },
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
            <h3 className="text-white font-semibold text-sm mb-4">{t("footer.ecosystem")}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.australiabusinessalliance.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors flex items-center gap-1"
                >
                  {lang === "en" ? "Australia Business Alliance" : "澳洲商业联盟"} <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://auspropertycircle.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors flex items-center gap-1"
                >
                  {lang === "en" ? "Property Circle" : "澳洲房产圈"} <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://ausbuildcircle.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors flex items-center gap-1"
                >
                  {lang === "en" ? "Build Circle" : "澳洲建房圈"} <ExternalLink size={11} />
                </a>
              </li>
              <li>
                <a
                  href="https://ndis.gov.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors flex items-center gap-1"
                >
                  {lang === "en" ? "NDIS official site" : "NDIS 官网"} <ExternalLink size={11} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © 2026 {lang === "en" ? "NDIS Circle AU" : "澳洲NDIS圈 NDIS Circle AU"}. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            {lang === "en" ? "Built with" : "用心打造"}{" "}
            <Heart size={11} className="text-gold-500" />{" "}
            {lang === "en" ? "by the Australia Business Alliance" : "by 澳洲商业联盟生态"}
          </p>
        </div>
      </div>
    </footer>
  );
}
