import React, { useState } from "react";
import { useWard, WARDS } from "../context/WardContext";
import Highlight from "../components/Highlight";
import WavyDivider from "../components/WavyDivider";
import { Calendar as CalendarIcon, Clock, Sparkles, ChevronLeft, ChevronRight, Info } from "lucide-react";

export default function ScheduleTracker() {
  const { selectedWard, setSelectedWard, activeWardSchedule, scheduleData } = useWard();
  const [currentMonthDate] = useState(new Date());

  // Generate days for standard calendar display
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth(); // 0-indexed
  const monthName = currentMonthDate.toLocaleString("default", { month: "long" });

  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Stream mapping rules by day of week
  const getStreamsForDay = (dayNumber, dayOfWeekIndex) => {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = dayNames[dayOfWeekIndex];
    const streams = [];

    // Wet waste: Mon, Wed, Fri, Sun (or daily in Ward 7 / 12)
    const isWet =
      activeWardSchedule?.regularDays?.wet?.includes("Daily") ||
      activeWardSchedule?.regularDays?.wet?.some(d => d.includes(dayName));
    if (isWet) streams.push("wet");

    // Dry waste: Tue, Thu, Sat
    const isDry =
      activeWardSchedule?.regularDays?.dry?.includes("Daily") ||
      activeWardSchedule?.regularDays?.dry?.some(d => d.includes(dayName));
    if (isDry) streams.push("dry");

    // Sanitary: Mon, Wed, Fri
    const isSanitary =
      activeWardSchedule?.regularDays?.sanitary?.includes("Daily") ||
      activeWardSchedule?.regularDays?.sanitary?.some(d => d.includes(dayName));
    if (isSanitary) streams.push("sanitary");

    // E-waste: 1st & 3rd Saturday (or designated weekends)
    if (dayOfWeekIndex === 6 && (dayNumber <= 7 || (dayNumber >= 15 && dayNumber <= 21))) {
      streams.push("ewaste");
    }

    return streams;
  };

  const todayDate = new Date().getDate();

  return (
    <section id="schedule" className="py-20 bg-cream-50 dark:bg-[#1E1A14] transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-leaf-700 dark:text-leaf-300 font-sans">
              Doorstep Collection Calendar
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-bark-900 dark:text-cream-50 mt-1">
              Pickup <Highlight color="bg-marker">Schedule Tracker</Highlight>
            </h2>
            <p className="text-sm text-bark-600 dark:text-cream-200/80 mt-2 max-w-xl">
              Strict 3-way segregation schedule. Municipal tipper trucks do not accept mixed unsegregated black bags.
            </p>
          </div>

          {/* Ward selector tab */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-bark-400 dark:text-cream-200/60 uppercase">Ward:</span>
            {WARDS.map((w) => (
              <button
                key={w}
                onClick={() => setSelectedWard(w)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedWard === w
                    ? "bg-leaf-500 text-white shadow-md shadow-leaf-500/20"
                    : "bg-cream-100 dark:bg-[#2A241B] text-bark-600 dark:text-cream-200 hover:bg-cream-200"
                }`}
              >
                {w.split(" ")[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Next Pickup Hero Card */}
        <div className="mb-10 p-6 rounded-3xl bg-gradient-to-r from-leaf-700 via-leaf-500 to-leaf-400 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5" /> Next Doorstep Pickup Tomorrow
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold">
              Green Bin: Wet Organics & Kitchen Scraps
            </h3>
            <p className="text-xs sm:text-sm text-leaf-100 max-w-2xl">
              Place your fruit peels, cooked leftovers, and vegetable trimmings in your green bin before 6:30 AM.
              Rinse dry recyclables (Blue bin) for Wednesday pickup.
            </p>
          </div>
          <div className="flex-shrink-0 text-right md:text-right w-full md:w-auto p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase text-leaf-100">
              <Clock className="w-4 h-4" /> Collection Window
            </div>
            <p className="text-2xl font-mono font-extrabold mt-1">6:30 AM - 9:00 AM</p>
            <p className="text-[11px] text-leaf-200 mt-0.5">Tipper Route: {activeWardSchedule?.currentStop || "Depot"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Monthly Calendar View (2 Cols) */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-cream-100 dark:bg-[#2A241B] border border-leaf-300/60 dark:border-leaf-700/40 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-cream-200 dark:border-leaf-700/30 mb-6">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-leaf-500" />
                <h3 className="font-display font-extrabold text-xl text-bark-900 dark:text-cream-50">
                  {monthName} {year}
                </h3>
              </div>
              <span className="text-xs font-semibold text-bark-400 dark:text-cream-200/60 font-sans">
                {selectedWard}
              </span>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-bark-400 dark:text-cream-200/60 uppercase mb-2">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty offset padding days */}
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="h-16 md:h-20 rounded-2xl bg-cream-50/40 dark:bg-[#1E1A14]/20 opacity-40" />
              ))}

              {/* Real month days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNum = i + 1;
                const dayOfWeek = (firstDayIndex + i) % 7;
                const streams = getStreamsForDay(dayNum, dayOfWeek);
                const isToday = dayNum === todayDate;

                return (
                  <div
                    key={dayNum}
                    className={`h-16 md:h-20 p-2 rounded-2xl flex flex-col justify-between transition-colors border ${
                      isToday
                        ? "bg-leaf-300/40 dark:bg-leaf-900/40 border-leaf-500 ring-2 ring-leaf-400/40 font-bold"
                        : "bg-cream-50 dark:bg-[#1E1A14] border-cream-200/60 dark:border-leaf-700/20 hover:border-leaf-300"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-extrabold ${isToday ? "text-leaf-700 dark:text-leaf-300" : "text-bark-900 dark:text-cream-50"}`}>
                        {dayNum}
                      </span>
                      {isToday && (
                        <span className="text-[9px] px-1 rounded bg-leaf-500 text-white font-mono">Today</span>
                      )}
                    </div>

                    {/* Stream Dots */}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {streams.map((s) => {
                        let dotColor = "bg-green-600";
                        if (s === "dry") dotColor = "bg-blue-600";
                        if (s === "sanitary") dotColor = "bg-red-600";
                        if (s === "ewaste") dotColor = "bg-amber-500";
                        return (
                          <span
                            key={s}
                            className={`w-2.5 h-2.5 rounded-full ${dotColor} shadow-sm`}
                            title={`${s.toUpperCase()} collection day`}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Calendar Legend */}
            <div className="mt-6 pt-4 border-t border-cream-200 dark:border-leaf-700/30 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-green-600" />
                <span className="text-bark-600 dark:text-cream-200 font-semibold">Wet / Organic</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-600" />
                <span className="text-bark-600 dark:text-cream-200 font-semibold">Dry / Recyclables</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-600" />
                <span className="text-bark-600 dark:text-cream-200 font-semibold">Sanitary / Medical</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-bark-600 dark:text-cream-200 font-semibold">E-Waste Drive</span>
              </div>
            </div>
          </div>

          {/* Stream Rules & Timings Card */}
          <div className="p-6 rounded-3xl bg-cream-100 dark:bg-[#2A241B] border border-leaf-300/60 dark:border-leaf-700/40 flex flex-col justify-between shadow-sm space-y-4">
            <div>
              <h3 className="font-display font-extrabold text-xl text-bark-900 dark:text-cream-50 flex items-center gap-2">
                <Info className="w-5 h-5 text-leaf-500" />
                <span>Segregation Guidelines</span>
              </h3>
              <p className="text-xs text-bark-600 dark:text-cream-200/80 mt-1">
                Civic bylaws mandate doorstep segregation. Penalties apply for mixed black bags.
              </p>

              <div className="mt-5 space-y-3.5">
                <div className="p-3.5 rounded-2xl bg-cream-50 dark:bg-[#1E1A14] border-l-4 border-green-600">
                  <div className="flex justify-between items-center text-xs font-bold text-green-700 dark:text-green-400">
                    <span>🟢 Green Bin (Wet)</span>
                    <span>6:30 AM - 9:00 AM</span>
                  </div>
                  <p className="text-xs text-bark-600 dark:text-cream-200/70 mt-1">
                    Kitchen peels, vegetable trims, leftover food, tea bags, garden trimmings. Drain gravy before placing.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-cream-50 dark:bg-[#1E1A14] border-l-4 border-blue-600">
                  <div className="flex justify-between items-center text-xs font-bold text-blue-700 dark:text-blue-400">
                    <span>🔵 Blue Bin (Dry)</span>
                    <span>9:30 AM - 12:00 PM</span>
                  </div>
                  <p className="text-xs text-bark-600 dark:text-cream-200/70 mt-1">
                    Clean paper, flattened cardboard boxes, PET bottles, rinsed milk packets, tin cans, dry plastic.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-cream-50 dark:bg-[#1E1A14] border-l-4 border-red-600">
                  <div className="flex justify-between items-center text-xs font-bold text-red-700 dark:text-red-400">
                    <span>🔴 Red Bin (Sanitary)</span>
                    <span>7:00 AM - 9:30 AM</span>
                  </div>
                  <p className="text-xs text-bark-600 dark:text-cream-200/70 mt-1">
                    Pads, diapers, bandages, expired pills. Securely wrap in newspaper with a distinct red 'X'.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-cream-50 dark:bg-[#1E1A14] border-l-4 border-amber-500">
                  <div className="flex justify-between items-center text-xs font-bold text-amber-700 dark:text-amber-400">
                    <span>🟡 Amber Van (E-Waste)</span>
                    <span>Weekend Drives</span>
                  </div>
                  <p className="text-xs text-bark-600 dark:text-cream-200/70 mt-1">
                    Old phones, chargers, alkaline batteries, cables, LED bulbs, lithium power banks.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-leaf-300/20 dark:bg-leaf-900/20 border border-leaf-300/40 text-center">
              <p className="text-xs font-hand text-leaf-700 dark:text-leaf-300 text-lg">
                "Clean neighborhoods start with clean bins!"
              </p>
            </div>
          </div>
        </div>
      </div>
      <WavyDivider className="mt-16" />
    </section>
  );
}
