import React from "react";
import { motion } from "framer-motion";

const PARTICLES = [
  { icon: "🍃", x: "8%", y: "15%", duration: 7, delay: 0, size: "text-2xl" },
  { icon: "♻️", x: "88%", y: "12%", duration: 8.5, delay: 0.5, size: "text-3xl" },
  { icon: "🌱", x: "82%", y: "65%", duration: 6.8, delay: 1, size: "text-2xl" },
  { icon: "🌿", x: "12%", y: "75%", duration: 9, delay: 1.5, size: "text-2xl" },
  { icon: "🍂", x: "48%", y: "85%", duration: 7.2, delay: 2, size: "text-xl" },
  { icon: "✨", x: "65%", y: "22%", duration: 6, delay: 0.8, size: "text-lg" },
  { icon: "🌾", x: "28%", y: "10%", duration: 8, delay: 1.2, size: "text-xl" }
];

export default function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {PARTICLES.map((p, idx) => (
        <motion.div
          key={idx}
          className={`absolute ${p.size} opacity-40 dark:opacity-25 filter drop-shadow-sm`}
          style={{ left: p.x, top: p.y }}
          animate={{
            y: ["0px", "-24px", "0px"],
            x: ["0px", "14px", "0px"],
            rotate: [0, 15, -10, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        >
          {p.icon}
        </motion.div>
      ))}
    </div>
  );
}
