import React from "react";
import { motion } from "framer-motion";
import { useWard } from "../context/WardContext";
import Highlight from "../components/Highlight";
import { Truck, Phone, Navigation, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default function TruckCountdown() {
  const { selectedWard, activeWardSchedule, truckSecondsRemaining } = useWard();

  const minutes = Math.floor(truckSecondsRemaining / 60);
  const seconds = truckSecondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // Progress along route (assumed 30-minute block)
  const totalDuration = 30 * 60;
  const elapsed = Math.max(0, totalDuration - truckSecondsRemaining);
  const progressPercent = Math.min(100, Math.max(10, (elapsed / totalDuration) * 100));

  const totalStops = activeWardSchedule?.totalStopsToday || 20;
  const completedStops = activeWardSchedule?.completedStopsToday || 12;

  return (
    <section id="truck-tracker" className="py-16 bg-cream-100 dark:bg-[#2A241B] transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 font-sans">
            Real-Time Municipal Fleet Tracking
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-bark-900 dark:text-cream-50 mt-1">
            Ward Tipper <Highlight color="bg-marker">Truck Countdown</Highlight>
          </h2>
          <p className="text-sm text-bark-600 dark:text-cream-200/80 mt-2">
            Simulated GPS dispatch for <span className="font-bold text-bark-900 dark:text-cream-50">{selectedWard}</span>.
            Keep your segregated green & blue bins ready at your doorstep.
          </p>
        </div>

        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-cream-50 dark:bg-[#1E1A14] border border-leaf-300 dark:border-leaf-700/50 shadow-xl">
          {/* Top Info Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6 border-b border-cream-200 dark:border-leaf-700/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 flex-shrink-0">
                <Truck className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <p className="text-xs text-bark-400 dark:text-cream-200/60 font-semibold uppercase">Vehicle Number</p>
                <p className="text-base font-extrabold text-bark-900 dark:text-cream-50 font-mono">
                  {activeWardSchedule?.truckNumber || "KA-04-EC-4210"}
                </p>
                <p className="text-[11px] text-leaf-700 dark:text-leaf-400 font-bold">CNG Eco-Tipper Van</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-leaf-100 dark:bg-leaf-900/30 flex items-center justify-center text-leaf-600 dark:text-leaf-400 flex-shrink-0">
                <Navigation className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-bark-400 dark:text-cream-200/60 font-semibold uppercase">Current Location</p>
                <p className="text-sm font-bold text-bark-900 dark:text-cream-50 truncate max-w-[200px]">
                  {activeWardSchedule?.currentStop || "4th Cross Junction"}
                </p>
                <p className="text-[11px] text-bark-600 dark:text-cream-200/70">
                  {completedStops} of {totalStops} colony stops done
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 flex-shrink-0">
                <Clock className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <p className="text-xs text-bark-400 dark:text-cream-200/60 font-semibold uppercase">Doorstep Arrival ETA</p>
                <div className="text-2xl font-mono font-extrabold text-bark-900 dark:text-cream-50 flex items-baseline gap-1">
                  <span>{formattedTime}</span>
                  <span className="text-xs font-sans font-semibold text-leaf-500">mins:sec</span>
                </div>
              </div>
            </div>
          </div>

          {/* Animated Progress Road */}
          <div className="mt-8 pt-4">
            <div className="flex justify-between text-xs font-bold text-bark-600 dark:text-cream-200/80 mb-2">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-leaf-500" /> Depot Departure (6:30 AM)
              </span>
              <span className="flex items-center gap-1 font-extrabold text-leaf-700 dark:text-leaf-300">
                📍 Your Doorstep: {selectedWard}
              </span>
            </div>

            {/* Road graphic */}
            <div className="relative h-14 bg-bark-900 dark:bg-[#14120E] rounded-2xl overflow-hidden border-2 border-bark-600/40 p-1 flex items-center">
              {/* Dashed center road lane */}
              <div className="absolute inset-x-0 h-0.5 border-b-2 border-dashed border-amber-300/40 top-1/2 -translate-y-1/2" />

              {/* Progress fill road surface */}
              <div
                className="absolute left-0 top-0 bottom-0 bg-leaf-500/20 transition-all duration-700"
                style={{ width: `${progressPercent}%` }}
              />

              {/* Driving Truck Vehicle */}
              <motion.div
                className="absolute z-10 flex flex-col items-center pointer-events-none"
                animate={{ left: `calc(${progressPercent}% - 28px)` }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
              >
                <div className="w-12 h-8 bg-leaf-500 rounded-lg shadow-lg flex items-center justify-center text-white border border-leaf-300 relative">
                  <Truck className="w-5 h-5 -scale-x-100" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-marker animate-ping" />
                </div>
                <span className="text-[9px] font-mono font-bold text-amber-300 mt-0.5 whitespace-nowrap bg-bark-900/90 px-1 rounded">
                  ETA {minutes}m
                </span>
              </motion.div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-bark-600 dark:text-cream-200/70">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-leaf-500 animate-pulse" />
                <span>Driver: <strong className="text-bark-900 dark:text-cream-50">{activeWardSchedule?.driverName || "Suresh Gowda"}</strong></span>
                <span>•</span>
                <a
                  href={`tel:${activeWardSchedule?.driverPhone || "9845012345"}`}
                  className="inline-flex items-center gap-1 text-leaf-700 dark:text-leaf-300 hover:underline font-bold"
                >
                  <Phone className="w-3 h-3" /> Call Driver
                </a>
              </div>
              <div className="flex items-center gap-1 text-[11px] bg-cream-200/50 dark:bg-leaf-900/20 px-2.5 py-1 rounded-lg">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Missed pickup? Flag in Incident Reporter below for return sweep.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
