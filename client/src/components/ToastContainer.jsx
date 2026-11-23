import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../context/ToastContext";
import { CheckCircle2, AlertTriangle, Info, Flame, X } from "lucide-react";

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-leaf-500 flex-shrink-0" />;
      case "escalate":
        return <Flame className="w-5 h-5 text-amber-500 animate-bounce flex-shrink-0" />;
      case "error":
        return <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />;
      case "info":
      default:
        return <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />;
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 md:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9, transition: { duration: 0.2 } }}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-cream-100 dark:bg-[#2A241B] border border-leaf-300 dark:border-leaf-700/60 shadow-xl backdrop-blur-md"
          >
            {getIcon(toast.type)}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-bark-900 dark:text-cream-50 font-sans leading-tight">
                {toast.title}
              </h4>
              <p className="text-xs text-bark-600 dark:text-cream-200/80 mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-bark-400 hover:text-bark-900 dark:text-cream-200 dark:hover:text-cream-50 p-1 rounded-lg transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
