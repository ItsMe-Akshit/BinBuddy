import React, { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "../context/ToastContext";
import { useWard } from "../context/WardContext";
import Highlight from "../components/Highlight";
import {
  BatteryCharging,
  Calendar,
  Building,
  Users,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Zap,
  ArrowRight
} from "lucide-react";

const UPCOMING_SLOTS = [
  { id: "slot-1", date: "Saturday, 28th Nov", time: "09:00 AM - 01:00 PM", slotsLeft: 3 },
  { id: "slot-2", date: "Saturday, 28th Nov", time: "02:00 PM - 06:00 PM", slotsLeft: 5 },
  { id: "slot-3", date: "Sunday, 29th Nov", time: "09:00 AM - 01:00 PM", slotsLeft: 2 },
  { id: "slot-4", date: "Sunday, 29th Nov", time: "02:00 PM - 06:00 PM", slotsLeft: 6 }
];

export default function EWasteDriveScheduler() {
  const { selectedWard } = useWard();
  const { addToast } = useToast();

  const [societyName, setSocietyName] = useState("");
  const [flatsCount, setFlatsCount] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(UPCOMING_SLOTS[0].id);
  const [pooledKg, setPooledKg] = useState(195);
  const [submitting, setSubmitting] = useState(false);
  const [driveRegistered, setDriveRegistered] = useState(false);

  const TARGET_KG = 250;
  const progressPercent = Math.min(100, Math.round((pooledKg / TARGET_KG) * 100));

  const handleRegister = (e) => {
    e.preventDefault();
    if (!societyName || !flatsCount) return;

    setSubmitting(true);
    setTimeout(() => {
      const estimatedAddition = Math.min(60, Number(flatsCount) * 0.8);
      setPooledKg((prev) => prev + Math.round(estimatedAddition));
      setSubmitting(false);
      setDriveRegistered(true);
      addToast(
        "E-Waste Drive Booked! 🔋",
        `Authorized recycler van scheduled for ${societyName}. ${Math.round(estimatedAddition)} kg added to ward pooling goal!`,
        "success"
      );
    }, 600);
  };

  return (
    <section id="ewaste" className="py-20 bg-cream-100 dark:bg-[#2A241B] transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 font-sans">
            Community Bulk Recycling
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-bark-900 dark:text-cream-50 mt-1">
            Apartment <Highlight color="bg-marker">E-Waste Drive</Highlight>
          </h2>
          <p className="text-sm text-bark-600 dark:text-cream-200/80 mt-2">
            Pool bulk toxic electronics with neighboring societies in <strong className="text-bark-900 dark:text-cream-50">{selectedWard}</strong>.
            When our cluster hits 250 kg, the municipal certified e-van arrives for free doorstep collection!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Progress Goal Card (1 Col) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-cream-50 dark:bg-[#1E1A14] border border-amber-300 dark:border-amber-800/40 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Ward Cluster Pooling Goal
              </span>
              <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 flex items-center justify-center">
                <BatteryCharging className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-display font-extrabold text-4xl text-bark-900 dark:text-cream-50">
                  {pooledKg} <span className="text-lg font-sans font-semibold text-bark-400 dark:text-cream-200/60">/ {TARGET_KG} kg</span>
                </span>
                <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400 font-mono">
                  {progressPercent}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-4 bg-cream-200 dark:bg-[#2A241B] rounded-full overflow-hidden p-0.5 border border-amber-300/40">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-leaf-500 shadow-sm"
                />
              </div>

              <p className="text-xs text-bark-600 dark:text-cream-200/70 mt-3 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-leaf-500" />
                <span>
                  Only <strong>{Math.max(0, TARGET_KG - pooledKg)} kg</strong> more needed to trigger automatic weekend van dispatch!
                </span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-cream-100 dark:bg-[#2A241B] border border-cream-200 dark:border-leaf-700/30 text-xs space-y-2">
              <span className="font-bold text-bark-900 dark:text-cream-50 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                Eligible E-Waste Items:
              </span>
              <p className="text-bark-600 dark:text-cream-200/80 leading-relaxed text-[11px]">
                Defunct laptops, broken mobile phones, tangled chargers, AA/AAA batteries, burned LED bulbs, microwave ovens, televisions, power tools.
              </p>
            </div>
          </div>

          {/* Booking Registration Form (2 Cols) */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-cream-50 dark:bg-[#1E1A14] border border-leaf-300/70 dark:border-leaf-700/40 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-cream-200 dark:border-leaf-700/30 mb-6">
              <div>
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-bark-900 dark:text-cream-50">
                  Register Your Residential Apartment / Society
                </h3>
                <p className="text-xs text-bark-600 dark:text-cream-200/70 mt-0.5">
                  We supply promotional poster PDFs, bin collection cartons, and certified recycling certificates.
                </p>
              </div>
            </div>

            {driveRegistered ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-leaf-100 dark:bg-leaf-950/60 text-leaf-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-display font-extrabold text-2xl text-bark-900 dark:text-cream-50">
                  Drive Scheduled for {societyName}!
                </h4>
                <p className="text-xs text-bark-600 dark:text-cream-200/80 max-w-md mx-auto">
                  Your designated weekend slot has been reserved. Community coordinator confirmation SMS dispatched to your phone.
                </p>
                <button
                  onClick={() => setDriveRegistered(false)}
                  className="px-6 py-2.5 rounded-full bg-leaf-500 text-white text-xs font-bold"
                >
                  Register Another Society
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-bark-600 dark:text-cream-200/70 mb-1.5">
                      Apartment / Community Name *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 w-4 h-4 text-leaf-500" />
                      <input
                        type="text"
                        required
                        value={societyName}
                        onChange={(e) => setSocietyName(e.target.value)}
                        placeholder="e.g. Palm Meadows Residency"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-cream-100 dark:bg-[#2A241B] border border-cream-200 dark:border-leaf-700/40 text-sm font-semibold text-bark-900 dark:text-cream-50 focus:outline-none focus:border-leaf-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-bark-600 dark:text-cream-200/70 mb-1.5">
                      Total Participating Flats *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 w-4 h-4 text-leaf-500" />
                      <input
                        type="number"
                        required
                        min="10"
                        value={flatsCount}
                        onChange={(e) => setFlatsCount(e.target.value)}
                        placeholder="e.g. 120"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-cream-100 dark:bg-[#2A241B] border border-cream-200 dark:border-leaf-700/40 text-sm font-semibold text-bark-900 dark:text-cream-50 focus:outline-none focus:border-leaf-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Weekend Slot Picker */}
                <div>
                  <label className="block text-xs font-bold uppercase text-bark-600 dark:text-cream-200/70 mb-2">
                    Pick Desired Weekend Pickup Slot *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {UPCOMING_SLOTS.map((slot) => {
                      const isSelected = selectedSlot === slot.id;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setSelectedSlot(slot.id)}
                          className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                            isSelected
                              ? "bg-leaf-300/30 dark:bg-leaf-950/40 border-leaf-500 ring-2 ring-leaf-400/40 font-bold"
                              : "bg-cream-100 dark:bg-[#2A241B] border-cream-200 dark:border-leaf-700/30 hover:border-leaf-300"
                          }`}
                        >
                          <div>
                            <p className="text-xs font-bold text-bark-900 dark:text-cream-50">{slot.date}</p>
                            <p className="text-[11px] text-bark-600 dark:text-cream-200/70">{slot.time}</p>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cream-200 dark:bg-bark-600 font-mono text-bark-900 dark:text-cream-50 font-bold">
                            {slot.slotsLeft} spots left
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-magnetic px-8 py-3 rounded-full bg-leaf-500 hover:bg-leaf-700 text-white font-bold text-xs shadow-lg shadow-leaf-500/25 flex items-center gap-2"
                  >
                    <span>{submitting ? "Booking Van Slot..." : "Confirm Community Drive"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
