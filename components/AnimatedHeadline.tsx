"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

const ROTATING_ROLES = [
  "NDIS Provider",
  "Support Coordinator",
  "Plan Manager",
  { zh: "入行创业者", en: "New operators" },
  { zh: "养老服务机构", en: "Aged care providers" },
  { zh: "行业顾问", en: "Industry advisors" },
];

export default function AnimatedHeadline() {
  const { lang, t } = useI18n();
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ROTATING_ROLES.length);
        setVisible(true);
      }, 350);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const role = ROTATING_ROLES[index];
  const roleText = typeof role === "string" ? role : lang === "en" ? role.en : role.zh;

  return (
    <div className="font-bold text-white leading-tight mb-6">
      <div className="text-blue-300 text-lg sm:text-xl font-normal mb-2">
        {t("hero.tagline")}
      </div>
      <div className="text-4xl lg:text-5xl xl:text-6xl">
        <div className="relative h-[1.3em] overflow-hidden">
          <span
            className="gradient-text block"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(-12px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }}
          >
            {roleText}
          </span>
        </div>
        <div className="text-white">{t("hero.headlineSuffix")}</div>
      </div>
    </div>
  );
}
