import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedHeading from "../components/AnimatedHeading";
import Highlight from "../components/Highlight";
import FloatingParticles from "../components/FloatingParticles";
import CountUp from "../components/CountUp";
import TiltCard from "../components/TiltCard";
import { useTickets } from "../context/TicketContext";
import { useWard } from "../context/WardContext";
import {
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Search,
  CheckCircle,
  TrendingUp,
  Award,
  Truck
} from "lucide-react";

const ROTATING_WORDS = ["Segregate", "Report", "Recycle", "Reward"];

export default function HeroSection() {
  const { setIsReporterOpen, stats } = useTickets();
  const { selectedWard, activeWardSchedule } = useWard();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden bg-cream-50 dark:bg-[#1E1A14] paper-texture pt-12 pb-20 md:pt-20 md:pb-32 transition-colors">
      <FloatingParticles />

      {/* Decorative gradient blur rings */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-leaf-300/25 dark:bg-leaf-700/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-marker/30 dark:bg-amber-900/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Ward Badge & Rotating Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-100 dark:bg-[#2A241B] border border-leaf-300 dark:border-leaf-700/50 shadow-sm mb-6">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-leaf-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-leaf-500" />
            </span>
            <span className="text-xs font-bold text-leaf-700 dark:text-leaf-300 uppercase tracking-wide">
              Live in {selectedWard}
            </span>
            <span className="text-bark-400 dark:text-cream-200/40">•</span>
            <div className="h-5 overflow-hidden flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROTATING_WORDS[wordIndex]}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-hand text-base font-bold text-bark-600 dark:text-cream-100"
                >
                  Action: {ROTATING_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Master Heading with Word-by-Word Reveal */}
          <AnimatedHeading
            text="Keep your street clean,"
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-4 font-display text-2xl sm:text-4xl md:text-5xl text-bark-600 dark:text-cream-200"
          >
            one <Highlight color="bg-marker">pickup</Highlight> at a time.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-6 text-base sm:text-lg text-bark-600 dark:text-cream-200/80 max-w-2xl mx-auto font-sans leading-relaxed"
          >
            The citizen-powered civic waste platform. Look up 50+ household waste streams,
            spot and report overflowing dumps, track live municipal tipper trucks, and mobilize community cleanups with priority escalation.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={() => setIsReporterOpen(true)}
              className="btn-magnetic px-8 py-4 rounded-full bg-leaf-500 hover:bg-leaf-700 text-white font-bold text-base shadow-xl shadow-leaf-500/30 flex items-center gap-2 group transition-all"
            >
              <span>Report an Issue</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#lookup"
              className="btn-magnetic px-7 py-4 rounded-full bg-cream-100 dark:bg-[#2A241B] hover:bg-cream-200 dark:hover:bg-[#342d22] text-bark-900 dark:text-cream-50 font-bold text-base border border-cream-200 dark:border-leaf-700/40 shadow-md flex items-center gap-2 transition-all"
            >
              <Search className="w-4 h-4 text-leaf-500" />
              <span>Waste Segregation Lookup</span>
            </a>

            <a
              href="#truck-tracker"
              className="btn-magnetic px-7 py-4 rounded-full bg-white dark:bg-[#1E1A14] text-bark-600 dark:text-cream-200 hover:text-bark-900 dark:hover:text-cream-50 font-semibold text-base border border-bark-400/20 shadow-sm flex items-center gap-2 transition-all"
            >
              <Truck className="w-4 h-4 text-amber-500" />
              <span>Truck Route Status</span>
            </a>
          </motion.div>
        </div>

        {/* Live Ward Stats Counter Cards with 3D Tilt */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <TiltCard delay={0.1}>
            <div className="p-6 rounded-3xl bg-cream-100 dark:bg-[#2A241B] border border-leaf-300/70 dark:border-leaf-700/40 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-leaf-700 dark:text-leaf-300 font-sans">
                  Resolved Cleanups
                </span>
                <div className="w-10 h-10 rounded-2xl bg-leaf-300/40 dark:bg-leaf-700/30 flex items-center justify-center text-leaf-700 dark:text-leaf-300">
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-4xl font-display font-extrabold text-bark-900 dark:text-cream-50">
                  <CountUp end={stats.cleanedCount} suffix=" Wards" />
                </div>
                <p className="text-xs text-bark-600 dark:text-cream-200/70 mt-1">
                  Civic complaints verified & cleaned this month
                </p>
              </div>
            </div>
          </TiltCard>

          <TiltCard delay={0.2}>
            <div className="p-6 rounded-3xl bg-cream-100 dark:bg-[#2A241B] border border-blue-200 dark:border-blue-900/40 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-sans">
                  Material Diverted
                </span>
                <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-300">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-4xl font-display font-extrabold text-bark-900 dark:text-cream-50">
                  <CountUp end={stats.totalKgRecycled} suffix=" kg" />
                </div>
                <p className="text-xs text-bark-600 dark:text-cream-200/70 mt-1">
                  Dry recyclables & organic compost salvaged
                </p>
              </div>
            </div>
          </TiltCard>

          <TiltCard delay={0.3}>
            <div className="p-6 rounded-3xl bg-cream-100 dark:bg-[#2A241B] border border-amber-200 dark:border-amber-900/40 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 font-sans">
                  Eco-Karma Points
                </span>
                <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-300">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-4xl font-display font-extrabold text-bark-900 dark:text-cream-50">
                  <CountUp end={stats.ecoPointsAwarded} suffix=" pts" />
                </div>
                <p className="text-xs text-bark-600 dark:text-cream-200/70 mt-1">
                  Awarded for prompt reporting & segregation
                </p>
              </div>
            </div>
          </TiltCard>

          <TiltCard delay={0.4}>
            <div className="p-6 rounded-3xl bg-cream-100 dark:bg-[#2A241B] border border-red-200 dark:border-red-900/40 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 font-sans">
                  Escalated Priority
                </span>
                <div className="w-10 h-10 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-300">
                  <ShieldAlert className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-4xl font-display font-extrabold text-bark-900 dark:text-cream-50">
                  <CountUp end={stats.escalatedCount} suffix=" Urgent" />
                </div>
                <p className="text-xs text-bark-600 dark:text-cream-200/70 mt-1">
                  High hazard / community upvoted hotspots
                </p>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
