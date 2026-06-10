"use client";

import { useState, useEffect } from "react";

const ROTATING_ROLES = [
  "NDIS Provider",
  "Support Coordinator",
  "Plan Manager",
  "入行创业者",
  "养老服务机构",
  "行业顾问",
];

export default function AnimatedHeadline() {
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

  return (
    <div className="font-bold text-white leading-tight mb-6">
      <div className="text-blue-300 text-lg sm:text-xl font-normal mb-2">
        专为澳洲 NDIS 行业从业者打造
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
            {ROTATING_ROLES[index]}
          </span>
        </div>
        <div className="text-white">都在澳洲 NDIS 圈</div>
      </div>
    </div>
  );
}
