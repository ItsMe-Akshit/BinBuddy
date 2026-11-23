import React from "react";
import { motion } from "framer-motion";

export default function AnimatedHeading({ text, className = "", highlightWord = null, highlightColor = "bg-marker" }) {
  const words = text.split(" ");
  return (
    <h1 className={`font-display font-extrabold tracking-tight text-bark-900 dark:text-cream-50 ${className}`}>
      {words.map((w, i) => {
        const isHighlight = highlightWord && w.toLowerCase().includes(highlightWord.toLowerCase());
        return (
          <motion.span
            key={i}
            className="mr-2.5 inline-block"
            initial={{ y: 35, opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {isHighlight ? (
              <span className="relative inline-block px-1">
                <span className={`absolute inset-x-0 bottom-1 top-2 -z-10 origin-left -skew-x-6 rounded-sm ${highlightColor} opacity-90`} />
                {w}
              </span>
            ) : (
              w
            )}
          </motion.span>
        );
      })}
    </h1>
  );
}
