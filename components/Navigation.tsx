"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ExternalLink } from "lucide-react";

const navLinks = [
  { href: "/ai-advisor", label: "AI 顾问" },
  { href: "/journey", label: "NDIS 全流程" },
  { href: "/providers", label: "找 Provider" },
  { href: "/resources", label: "知识库" },
  { href: "/about", label: "关于" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

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
                澳洲NDIS圈
              </div>
              <div className="text-gray-400 text-xs">NDIS Hub AU</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-gray-600 hover:text-navy-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://auscircle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-navy-900 transition-colors"
            >
              <span>澳洲创业圈</span>
              <ExternalLink size={12} />
            </a>
            <Link
              href="/providers?register=true"
              className="px-4 py-2 bg-navy-900 text-white text-sm font-semibold rounded-lg hover:bg-navy-800 transition-colors"
            >
              Provider 入驻
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100 mt-2">
            <Link
              href="/providers?register=true"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 bg-navy-900 text-white text-sm font-semibold rounded-lg text-center"
            >
              Provider 免费入驻
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
