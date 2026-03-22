"use client";

import { useState, useEffect } from "react";

const ROTATING_WORDS = [
  "参与者家属",
  "NDIS Provider",
  "入行创业者",
  "Support Coordinator",
  "Plan Manager",
  "养老从业者",
];

export default function AnimatedHeadline() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        // Fade in
        setVisible(true);
      }, 350);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
      <div className="mb-1 text-blue-200 text-xl sm:text-2xl font-normal">
        无论你是
      </div>
      <div className="relative h-[1.3em] overflow-hidden">
        <span
          className="gradient-text block transition-all duration-350"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(-12px)",
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          {ROTATING_WORDS[index]}
        </span>
      </div>
      <div className="text-white mt-1">
        这里有你需要的答案
      </div>
    </div>
  );
}
