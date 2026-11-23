import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { searchItems } from "../utils/api";
import Highlight from "../components/Highlight";
import { ItemSkeleton } from "../components/SkeletonLoader";
import {
  Search,
  X,
  Trash2,
  AlertTriangle,
  Lightbulb,
  CheckCircle,
  Sparkles,
  Filter
} from "lucide-react";

const POPULAR_SEARCHES = [
  "broken tube light",
  "pizza box",
  "milk pouch",
  "battery",
  "used sanitary pad",
  "banana peel",
  "power bank"
];

const STREAM_TABS = [
  { id: "all", label: "All Items" },
  { id: "wet", label: "🟢 Wet Waste" },
  { id: "dry", label: "🔵 Dry Recyclables" },
  { id: "sanitary", label: "🔴 Sanitary" },
  { id: "ewaste", label: "🟡 E-Waste" },
  { id: "hazard", label: "⚠️ Toxic Hazard" }
];

export default function WasteLookup() {
  const [query, setQuery] = useState("");
  const [selectedStream, setSelectedStream] = useState("all");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function fetchAll() {
      setLoading(true);
      try {
        const data = await searchItems(query);
        if (active) setItems(data);
      } catch (err) {
        console.error("Error loading items:", err);
      } finally {
        if (active) setLoading(false);
      }
    }

    const timer = setTimeout(fetchAll, 150);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query]);

  // Filter items by stream tab
  const filteredItems = useMemo(() => {
    if (selectedStream === "all") return items;
    return items.filter((item) => item.stream === selectedStream);
  }, [items, selectedStream]);

  const getBinBadge = (stream, binColor) => {
    switch (stream) {
      case "wet":
        return {
          bg: "bg-green-100 dark:bg-green-950/40",
          text: "text-green-800 dark:text-green-300",
          border: "border-green-300 dark:border-green-800",
          dot: "bg-green-600",
          label: "Green Wet Bin"
        };
      case "dry":
        return {
          bg: "bg-blue-100 dark:bg-blue-950/40",
          text: "text-blue-800 dark:text-blue-300",
          border: "border-blue-300 dark:border-blue-800",
          dot: "bg-blue-600",
          label: "Blue Dry Bin"
        };
      case "sanitary":
        return {
          bg: "bg-red-100 dark:bg-red-950/40",
          text: "text-red-800 dark:text-red-300",
          border: "border-red-300 dark:border-red-800",
          dot: "bg-red-600",
          label: "Red Sanitary Bin"
        };
      case "ewaste":
        return {
          bg: "bg-amber-100 dark:bg-amber-950/40",
          text: "text-amber-800 dark:text-amber-300",
          border: "border-amber-300 dark:border-amber-800",
          dot: "bg-amber-500",
          label: "Amber E-Waste Bin"
        };
      case "hazard":
      default:
        return {
          bg: "bg-rose-100 dark:bg-rose-950/50",
          text: "text-rose-900 dark:text-rose-300",
          border: "border-rose-400 dark:border-rose-800",
          dot: "bg-rose-600 animate-ping",
          label: "⚠️ Hazard Chemical Bin"
        };
    }
  };

  return (
    <section id="lookup" className="py-20 bg-cream-100 dark:bg-[#2A241B] transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-leaf-700 dark:text-leaf-300 font-sans">
            Instant 50-Item Civic Waste Dictionary
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-bark-900 dark:text-cream-50 mt-1">
            Waste <Highlight color="bg-marker">Segregation Lookup</Highlight>
          </h2>
          <p className="text-sm text-bark-600 dark:text-cream-200/80 mt-2">
            Never guess which bin an item belongs to. Type any household object to see its color-coded bin badge,
            handling instructions, and environmental hazard rating.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <Search className="absolute left-5 w-5 h-5 text-bark-400 dark:text-cream-200/60" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Try typing "broken tube light", "pizza box", "milk pouch"…'
              className="w-full pl-13 pr-12 py-4 rounded-2xl bg-cream-50 dark:bg-[#1E1A14] border-2 border-leaf-300 dark:border-leaf-700/50 text-base font-semibold text-bark-900 dark:text-cream-50 placeholder-bark-400/70 dark:placeholder-cream-200/40 shadow-lg focus:outline-none focus:border-leaf-500 focus:ring-4 focus:ring-leaf-400/20 transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 p-1.5 rounded-full text-bark-400 hover:text-bark-900 dark:text-cream-200/60 dark:hover:text-cream-50 hover:bg-cream-200 dark:hover:bg-[#2A241B] transition-colors"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Quick Suggestions Chips */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 justify-center">
            <span className="text-xs font-semibold text-bark-400 dark:text-cream-200/60">Quick search:</span>
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="text-xs px-2.5 py-1 rounded-full bg-cream-50 dark:bg-[#1E1A14] border border-cream-200 dark:border-leaf-700/40 text-bark-600 dark:text-cream-200/80 hover:text-leaf-700 dark:hover:text-leaf-300 hover:border-leaf-300 transition-colors font-medium"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Stream Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {STREAM_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStream(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedStream === tab.id
                  ? "bg-leaf-500 text-white shadow-md shadow-leaf-500/25 scale-105"
                  : "bg-cream-50 dark:bg-[#1E1A14] text-bark-600 dark:text-cream-200/80 border border-cream-200 dark:border-leaf-700/30 hover:bg-cream-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="mt-6 flex justify-between items-center text-xs font-semibold text-bark-400 dark:text-cream-200/60 max-w-7xl mx-auto">
          <span>
            Found <strong className="text-bark-900 dark:text-cream-50">{filteredItems.length}</strong> items mapped
          </span>
          {query && (
            <span>
              Searching for: "<strong className="text-leaf-700 dark:text-leaf-300">{query}</strong>"
            </span>
          )}
        </div>

        {/* Grid of Results */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <ItemSkeleton key={i} />)
          ) : filteredItems.length === 0 ? (
            <div className="col-span-full text-center py-16 p-8 rounded-3xl bg-cream-50 dark:bg-[#1E1A14] border border-cream-200 dark:border-leaf-700/30">
              <Trash2 className="w-12 h-12 text-bark-400 dark:text-cream-200/40 mx-auto mb-3" />
              <h3 className="font-display font-bold text-xl text-bark-900 dark:text-cream-50">
                No waste stream match found
              </h3>
              <p className="text-xs text-bark-600 dark:text-cream-200/70 mt-1 max-w-md mx-auto">
                Can't find "{query}"? You can lodge an inquiry or report an unclassified dumping issue on our ward board.
              </p>
              <button
                onClick={() => setQuery("")}
                className="mt-4 px-4 py-2 rounded-full bg-leaf-500 text-white text-xs font-bold"
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const badge = getBinBadge(item.stream, item.binColor);
              const isHazard = item.stream === "hazard";

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className={`p-5 rounded-3xl bg-cream-50 dark:bg-[#1E1A14] border transition-all duration-300 flex flex-col justify-between hover:shadow-lg ${
                    isHazard
                      ? "border-rose-400/70 dark:border-rose-800/80 ring-1 ring-rose-400/30"
                      : "border-leaf-300/60 dark:border-leaf-700/30"
                  }`}
                >
                  <div>
                    {/* Header: Name and Bouncing Bin Badge */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-bark-400 dark:text-cream-200/60">
                          {item.category}
                        </span>
                        <h4 className="font-display font-extrabold text-lg text-bark-900 dark:text-cream-50 leading-tight">
                          {item.name}
                        </h4>
                      </div>

                      {/* Animated Dropping Bin Badge */}
                      <div
                        className={`animate-bounceBadge flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 shadow-sm ${badge.bg} ${badge.text} ${badge.border}`}
                      >
                        <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
                        <span>{badge.label}</span>
                      </div>
                    </div>

                    {/* Disposal Tip with Icon */}
                    <div className="mt-3 p-3 rounded-2xl bg-cream-100/70 dark:bg-[#2A241B]/70 border border-cream-200 dark:border-leaf-700/20 text-xs">
                      <div className="flex items-start gap-2">
                        {isHazard ? (
                          <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5 animate-pulse" />
                        ) : (
                          <Lightbulb className="w-4 h-4 text-leaf-500 flex-shrink-0 mt-0.5" />
                        )}
                        <p className={`leading-relaxed ${isHazard ? "font-semibold text-rose-900 dark:text-rose-200" : "text-bark-600 dark:text-cream-200/80"}`}>
                          {item.disposalTip}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer Stream Tag */}
                  <div className="mt-4 pt-3 border-t border-cream-200/60 dark:border-leaf-700/20 flex items-center justify-between text-[11px] text-bark-400 dark:text-cream-200/60 font-medium">
                    <span>Item Ref: #{item.id}</span>
                    <span className="capitalize font-semibold text-leaf-700 dark:text-leaf-300">
                      Stream: {item.stream}
                    </span>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
