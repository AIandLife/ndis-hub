"use client";

import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

// 页面底部统一的进群转化条：所有内容页看完都有下一步，不留死胡同。
export default function JoinBanner() {
  const { t } = useI18n();
  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-navy-900 to-navy-950 rounded-3xl px-6 py-8 sm:px-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-11 h-11 rounded-xl bg-gold-500/20 flex items-center justify-center flex-shrink-0">
            <MessageCircle size={20} className="text-gold-400" />
          </div>
          <div className="flex-1">
            <div className="text-white font-bold text-lg mb-1">
              {t("jb.title")}
            </div>
            <div className="text-blue-300 text-sm">
              {t("jb.sub")}
            </div>
          </div>
          <Link
            href="/#join"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
          >
            {t("nav.joinGroup")} <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
