"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const NAV = [
  { href: "/providers", key: "nav.providers" },
  { href: "/board", key: "nav.board" },
  { href: "/ai-advisor", key: "nav.aiAdvisor" },
  { href: "/insights", key: "nav.insights" },
  { href: "/about", key: "nav.about" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useI18n();

  const toggleLang = () => setLang(lang === "zh" ? "en" : "zh");

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center">
              <span className="text-gold-500 font-bold text-sm">N</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-navy-900 font-bold text-base leading-tight">
                {lang === "en" ? "NDIS Circle" : "澳洲NDIS圈"}
              </div>
              <div className="text-gray-400 text-xs">NDIS Circle AU</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-gray-600 hover:text-navy-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-2.5 py-2 text-sm text-gray-500 hover:text-navy-900 transition-colors font-semibold"
              aria-label="Switch language"
            >
              <Globe size={15} />
              {t("lang.switch")}
            </button>
            <Link
              href="/providers?register=true"
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-navy-900 transition-colors"
            >
              {t("nav.freeListing")}
            </Link>
            <Link
              href="/#join"
              className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-navy-950 text-sm font-bold rounded-lg transition-colors"
            >
              {t("nav.joinGroup")}
            </Link>
          </div>

          {/* Mobile actions */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-2 py-2 text-sm text-gray-600 font-semibold"
              aria-label="Switch language"
            >
              <Globe size={16} />
              {t("lang.switch")}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          {NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
            >
              {t(link.key)}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100 mt-2 space-y-2">
            <Link
              href="/#join"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 bg-gold-500 text-navy-950 text-sm font-bold rounded-lg text-center"
            >
              {t("hero.ctaJoinMobile")}
            </Link>
            <Link
              href="/providers?register=true"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 border border-navy-200 text-navy-900 text-sm font-semibold rounded-lg text-center"
            >
              {t("nav.freeListing")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
