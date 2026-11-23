import React from "react";
import { motion } from "framer-motion";

export default function Highlight({ children, color = "bg-marker" }) {
  return (
    <span className="relative inline-block px-1.5 py-0.5">
      <motion.span
        className={`absolute inset-x-0 bottom-1 top-2 -z-10 origin-left -skew-x-6 rounded-sm ${color} opacity-90 shadow-sm`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
      <span className="relative z-10 font-bold text-bark-900 dark:text-cream-50">
        {children}
      </span>
    </span>
  );
}
