import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Highlight from "../components/Highlight";
import {
  Award,
  Sparkles,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  Shield,
  HelpCircle
} from "lucide-react";

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Where should the cheese & oil-soaked bottom of a pizza delivery box go?",
    options: [
      { text: "Blue Bin (Dry Paper Recycling)", isCorrect: false },
      { text: "Green Bin (Wet / Organic Waste)", isCorrect: true, reason: "Grease and food oils contaminate paper recycling pulpers. Soiled cardboard degrades in wet compost!" },
      { text: "Black General Trash Bag", isCorrect: false },
      { text: "Amber E-Waste Bin", isCorrect: false }
    ]
  },
  {
    id: 2,
    question: "A fluorescent tube light shattered in the hallway. What is the correct handling?",
    options: [
      { text: "Toss into blue glass recycling container", isCorrect: false },
      { text: "Wrap securely & place in Red Hazard (Toxic Mercury Vapor)", isCorrect: true, reason: "Fluorescent tubes contain toxic mercury gas. They must never be broken or mixed with regular glass recycling." },
      { text: "Flush fine shards down the sewer drain", isCorrect: false },
      { text: "Bury in garden compost bed", isCorrect: false }
    ]
  },
  {
    id: 3,
    question: "What must you do before disposing of plastic milk pouches?",
    options: [
      { text: "Discard directly with leftover milk into green bin", isCorrect: false },
      { text: "Rinse inside, dry completely, and deposit into Blue Dry Bin", isCorrect: true, reason: "Milk residue rots and contaminates entire plastic bales. Cleaned & dried pouches are 100% recyclable." },
      { text: "Burn it in the garden corner", isCorrect: false },
      { text: "Pack into sanitary red bag", isCorrect: false }
    ]
  },
  {
    id: 4,
    question: "How should expired pharmaceutical antibiotic tablets and blister packs be disposed of?",
    options: [
      { text: "Crush and flush down the toilet drain", isCorrect: false },
      { text: "Red Sanitary / Pharmacy Buy-Back (Never flush)", isCorrect: true, reason: "Flushing medicines contaminates freshwater tables and breeds antibiotic-resistant superbugs." },
      { text: "Mix with wet food scraps in green bin", isCorrect: false },
      { text: "Blue paper recycling stream", isCorrect: false }
    ]
  },
  {
    id: 5,
    question: "Why should lithium-ion power banks and batteries NEVER be put in municipal garbage trucks?",
    options: [
      { text: "They will dissolve in rain water", isCorrect: false },
      { text: "Truck hydraulic compactors crush them, triggering intense lithium fires", isCorrect: true, reason: "Punctured lithium batteries explode into uncontrollable chemical fires inside garbage trucks!" },
      { text: "They attract insects and stray cats", isCorrect: false },
      { text: "They turn kitchen compost sour", isCorrect: false }
    ]
  }
];

const BADGES = [
  { threshold: 100, name: "Seedling", icon: "🌱", color: "text-leaf-500 bg-leaf-100" },
  { threshold: 300, name: "Sprout", icon: "🌿", color: "text-emerald-600 bg-emerald-100" },
  { threshold: 400, name: "Mighty Tree", icon: "🌳", color: "text-green-700 bg-green-200" },
  { threshold: 500, name: "Forest Guardian", icon: "🛡️", color: "text-amber-600 bg-amber-100" }
];

const LEADERBOARD = [
  { rank: 1, name: "Aarav Sharma", ward: "Ward 4 (Greenfield)", score: 500, badge: "🛡️ Forest Guardian" },
  { rank: 2, name: "Priya Menon", ward: "Ward 7 (Riverside)", score: 480, badge: "🌳 Mighty Tree" },
  { rank: 3, name: "Vikram Sen", ward: "Ward 4 (Greenfield)", score: 450, badge: "🌳 Mighty Tree" },
  { rank: 4, name: "Kavita Rao", ward: "Ward 12 (Central Market)", score: 420, badge: "🌿 Sprout" }
];

export default function SegregationQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [shakeCard, setShakeCard] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelect = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    if (option.isCorrect) {
      setScore((prev) => prev + 100);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {
        // Safe fallback
      }
    } else {
      setShakeCard(true);
      setTimeout(() => setShakeCard(false), 500);
    }
  };

  const nextQuestion = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      if (score >= 400) {
        try {
          confetti({ particleCount: 150, spread: 90 });
        } catch (e) {}
      }
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const currentBadge = [...BADGES].reverse().find((b) => score >= b.threshold) || BADGES[0];

  return (
    <section id="quiz" className="py-20 bg-cream-50 dark:bg-[#1E1A14] paper-texture transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-leaf-700 dark:text-leaf-300 font-sans">
            Civic Education Mini-Game
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-bark-900 dark:text-cream-50 mt-1">
            Segregation <Highlight color="bg-marker">Eco-Quiz</Highlight>
          </h2>
          <p className="text-sm text-bark-600 dark:text-cream-200/80 mt-2">
            Test your waste knowledge, earn verified community eco-points, unlock green badges, and climb the civic leaderboard!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Quiz Card (2 Cols) */}
          <div
            className={`lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-cream-100 dark:bg-[#2A241B] border border-leaf-300/70 dark:border-leaf-700/40 shadow-xl transition-all ${
              shakeCard ? "animate-shake" : ""
            }`}
          >
            {!quizFinished ? (
              <div>
                {/* Progress & Live Score Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-cream-200 dark:border-leaf-700/30 mb-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-bark-600 dark:text-cream-200">
                    <span className="w-6 h-6 rounded-full bg-leaf-500 text-white flex items-center justify-center font-mono">
                      {currentIdx + 1}
                    </span>
                    <span>Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-bold font-mono">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{score} Eco-Points</span>
                    </div>

                    <div className="text-xs px-2.5 py-1 rounded-full bg-leaf-300/40 dark:bg-leaf-800/40 font-bold text-leaf-700 dark:text-leaf-300 flex items-center gap-1">
                      <span>{currentBadge.icon}</span>
                      <span>{currentBadge.name}</span>
                    </div>
                  </div>
                </div>

                {/* Question */}
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-bark-900 dark:text-cream-50 leading-snug mb-6">
                  {currentQ.question}
                </h3>

                {/* Multiple Choice Options */}
                <div className="space-y-3">
                  {currentQ.options.map((opt, i) => {
                    const isSelected = selectedOption === opt;
                    let style = "bg-cream-50 dark:bg-[#1E1A14] border-cream-200 dark:border-leaf-700/30 hover:border-leaf-400";

                    if (isAnswered) {
                      if (opt.isCorrect) {
                        style = "bg-green-100 dark:bg-green-950/60 border-green-500 text-green-900 dark:text-green-200 font-bold";
                      } else if (isSelected && !opt.isCorrect) {
                        style = "bg-red-100 dark:bg-red-950/60 border-red-500 text-red-900 dark:text-red-200 font-bold";
                      } else {
                        style = "opacity-50 bg-cream-50 dark:bg-[#1E1A14] border-cream-200";
                      }
                    }

                    return (
                      <button
                        key={i}
                        type="button"
                        disabled={isAnswered}
                        onClick={() => handleSelect(opt)}
                        className={`w-full p-4 rounded-2xl border text-left text-sm font-semibold transition-all flex items-center justify-between gap-3 ${style}`}
                      >
                        <span className="leading-snug">{opt.text}</span>
                        {isAnswered && opt.isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 animate-bounce" />
                        )}
                        {isAnswered && isSelected && !opt.isCorrect && (
                          <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Reason Explanation Box */}
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 rounded-2xl bg-cream-50 dark:bg-[#1E1A14] border border-leaf-300 dark:border-leaf-700/40 text-xs space-y-2"
                  >
                    <div className="flex items-center gap-1.5 font-bold text-leaf-700 dark:text-leaf-300">
                      <HelpCircle className="w-4 h-4" />
                      <span>Why this matters:</span>
                    </div>
                    <p className="text-bark-600 dark:text-cream-200/80 leading-relaxed">
                      {currentQ.options.find((o) => o.isCorrect)?.reason}
                    </p>
                  </motion.div>
                )}

                {/* Next button */}
                {isAnswered && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={nextQuestion}
                      className="btn-magnetic px-6 py-2.5 rounded-full bg-leaf-500 hover:bg-leaf-700 text-white font-bold text-xs shadow-lg"
                    >
                      {currentIdx + 1 < QUIZ_QUESTIONS.length ? "Next Dilemma →" : "See Final Score 🏆"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Quiz Finished Summary */
              <div className="text-center py-8 space-y-5">
                <div className="w-20 h-20 rounded-3xl bg-leaf-400/20 text-5xl flex items-center justify-center mx-auto shadow-inner">
                  {currentBadge.icon}
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-leaf-700 dark:text-leaf-300 font-sans">
                    Quiz Completed!
                  </span>
                  <h3 className="font-display font-extrabold text-3xl text-bark-900 dark:text-cream-50 mt-1">
                    You Unlocked: {currentBadge.name}
                  </h3>
                  <p className="text-sm text-bark-600 dark:text-cream-200/80 mt-1">
                    Final Eco-Score: <strong className="text-leaf-700 dark:text-leaf-300 font-mono text-lg">{score} / 500</strong> points
                  </p>
                </div>

                <p className="text-xs text-bark-600 dark:text-cream-200/70 max-w-md mx-auto">
                  Your points have been credited to your neighborhood ward roster. Keep segregating cleanly to maintain your community status!
                </p>

                <button
                  onClick={restartQuiz}
                  className="btn-magnetic inline-flex items-center gap-2 px-6 py-3 rounded-full bg-leaf-500 hover:bg-leaf-700 text-white font-bold text-xs shadow-lg"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Try Again for High Score</span>
                </button>
              </div>
            )}
          </div>

          {/* Civic Eco-Leaderboard (1 Col) */}
          <div className="p-6 rounded-3xl bg-cream-100 dark:bg-[#2A241B] border border-leaf-300/70 dark:border-leaf-700/40 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200 dark:border-leaf-700/30">
              <h3 className="font-display font-extrabold text-lg text-bark-900 dark:text-cream-50 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>Ward Eco-Champs</span>
              </h3>
              <span className="text-[11px] font-bold text-leaf-700 dark:text-leaf-300">Live Standings</span>
            </div>

            <div className="space-y-3">
              {LEADERBOARD.map((user) => (
                <div
                  key={user.rank}
                  className="p-3 rounded-2xl bg-cream-50 dark:bg-[#1E1A14] border border-cream-200 dark:border-leaf-700/20 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-6 h-6 rounded-full bg-leaf-300/40 dark:bg-leaf-900/40 flex items-center justify-center font-bold font-mono text-[11px] text-leaf-700 dark:text-leaf-300">
                      #{user.rank}
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-bark-900 dark:text-cream-50 truncate">{user.name}</p>
                      <p className="text-[10px] text-bark-400 dark:text-cream-200/60 truncate">{user.ward}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-mono font-extrabold text-leaf-700 dark:text-leaf-400">{user.score} pts</p>
                    <p className="text-[10px] text-bark-400 dark:text-cream-200/50">{user.badge.split(" ")[0]}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-2">
              <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>Ward Roster points redeemable for free municipal compost bags at local depots.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
