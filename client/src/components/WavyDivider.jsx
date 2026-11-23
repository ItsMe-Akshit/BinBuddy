import React from "react";

export default function WavyDivider({ flip = false, className = "", color = "fill-cream-100 dark:fill-[#2A241B]" }) {
  return (
    <div className={`w-full overflow-hidden leading-none select-none ${flip ? "rotate-180" : ""} ${className}`}>
      <svg
        className={`relative block w-full h-8 md:h-12 ${color}`}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z" />
      </svg>
    </div>
  );
}
