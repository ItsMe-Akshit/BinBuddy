import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTickets } from "../context/TicketContext";
import { useWard, WARDS } from "../context/WardContext";
import {
  X,
  Camera,
  MapPin,
  AlertTriangle,
  Upload,
  ThumbsUp,
  Trash2,
  CheckCircle2,
  HelpCircle
} from "lucide-react";

const CATEGORIES = [
  "Overflowing Dumpster",
  "Hazardous / Chemical Spill",
  "Dead Animal / Biohazard",
  "Illegal Construction Debris",
  "Unsegregated Waste Pile",
  "Clogged Drain with Plastic",
  "Broken Glass on Footpath",
  "Uncollected Doorstep Trash"
];

export default function IncidentReporterModal() {
  const { isReporterOpen, setIsReporterOpen, handleCreateTicket, findNearbyTickets, handleUpvote } = useTickets();
  const { selectedWard } = useWard();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [landmark, setLandmark] = useState("");
  const [ward, setWard] = useState(selectedWard);
  const [description, setDescription] = useState("");
  const [photoBase64, setPhotoBase64] = useState(null);
  const [reportedBy, setReportedBy] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Synchronize ward when selectedWard changes
  useEffect(() => {
    setWard(selectedWard);
  }, [selectedWard]);

  // Live duplicate/proximity detection
  const nearbyTickets = findNearbyTickets(landmark, ward);

  // Mock photo upload using native FileReader Base64
  const handlePhotoSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Please upload a photo under 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !landmark || !description) return;

    try {
      setSubmitting(true);
      await handleCreateTicket({
        title,
        category,
        landmark,
        ward,
        description,
        photo: photoBase64,
        reportedBy: reportedBy || "Civic Citizen"
      });
      // Reset form
      setTitle("");
      setLandmark("");
      setDescription("");
      setPhotoBase64(null);
      setReportedBy("");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isReporterOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-bark-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-cream-50 dark:bg-[#1E1A14] rounded-3xl shadow-2xl border border-leaf-300 dark:border-leaf-700/50 overflow-hidden my-8"
        >
          {/* Header */}
          <div className="p-6 bg-cream-100 dark:bg-[#2A241B] border-b border-cream-200 dark:border-leaf-700/30 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-leaf-700 dark:text-leaf-300 font-sans">
                Civic Action & Grievance Dispatch
              </span>
              <h3 className="font-display font-extrabold text-2xl text-bark-900 dark:text-cream-50">
                Report Waste or Hotspot
              </h3>
            </div>
            <button
              onClick={() => setIsReporterOpen(false)}
              className="p-2 rounded-full text-bark-400 hover:text-bark-900 dark:text-cream-200/60 dark:hover:text-cream-50 hover:bg-cream-200 dark:hover:bg-[#1E1A14] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Title & Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-bark-600 dark:text-cream-200/70 mb-1.5">
                  Issue Summary *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Overflowing bin outside colony gate"
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-100 dark:bg-[#2A241B] border border-cream-200 dark:border-leaf-700/40 text-sm font-semibold text-bark-900 dark:text-cream-50 focus:outline-none focus:border-leaf-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-bark-600 dark:text-cream-200/70 mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-100 dark:bg-[#2A241B] border border-cream-200 dark:border-leaf-700/40 text-sm font-semibold text-bark-900 dark:text-cream-50 focus:outline-none focus:border-leaf-500"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Ward & Landmark with Proximity Duplicate Check */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-bark-600 dark:text-cream-200/70 mb-1.5">
                  Ward Jurisdiction *
                </label>
                <select
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-100 dark:bg-[#2A241B] border border-cream-200 dark:border-leaf-700/40 text-sm font-semibold text-bark-900 dark:text-cream-50 focus:outline-none focus:border-leaf-500"
                >
                  {WARDS.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-bark-600 dark:text-cream-200/70 mb-1.5">
                  Exact Landmark / Street *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-leaf-500" />
                  <input
                    type="text"
                    required
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="e.g. Colony Park Gate 2, 4th Cross"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-cream-100 dark:bg-[#2A241B] border border-cream-200 dark:border-leaf-700/40 text-sm font-semibold text-bark-900 dark:text-cream-50 focus:outline-none focus:border-leaf-500"
                  />
                </div>
              </div>
            </div>

            {/* LIVE PROXIMITY / DUPLICATE CHECK ALERT */}
            {nearbyTickets.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700/60 shadow-md space-y-3"
              >
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-extrabold uppercase tracking-wide text-amber-800 dark:text-amber-300">
                      Nearby Existing Ticket Detected ({nearbyTickets.length} Found)
                    </h5>
                    <p className="text-xs text-amber-700 dark:text-amber-200/80 mt-0.5">
                      A neighbor has already reported a similar waste hotspot near this landmark. Upvote their ticket instead of creating a duplicate to accelerate municipal priority escalation!
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  {nearbyTickets.slice(0, 2).map((nearby) => (
                    <div
                      key={nearby.id}
                      className="p-3 rounded-xl bg-white dark:bg-[#2A241B] border border-amber-200 dark:border-amber-800/40 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-bold">
                          {nearby.id} • {nearby.status}
                        </span>
                        <p className="text-xs font-bold text-bark-900 dark:text-cream-50 truncate mt-1">
                          {nearby.title}
                        </p>
                        <p className="text-[11px] text-bark-600 dark:text-cream-200/60 truncate">
                          📍 {nearby.landmark}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          handleUpvote(nearby.id);
                          setIsReporterOpen(false);
                        }}
                        className="btn-magnetic flex-shrink-0 px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Upvote This ({nearby.upvotes})</span>
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase text-bark-600 dark:text-cream-200/70 mb-1.5">
                Description & Hazard Details *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the severity (odor, stray animals, chemical smell, blocked footpath)..."
                className="w-full px-4 py-2.5 rounded-xl bg-cream-100 dark:bg-[#2A241B] border border-cream-200 dark:border-leaf-700/40 text-sm font-semibold text-bark-900 dark:text-cream-50 focus:outline-none focus:border-leaf-500"
              />
            </div>

            {/* Photo Upload via FileReader Base64 */}
            <div>
              <label className="block text-xs font-bold uppercase text-bark-600 dark:text-cream-200/70 mb-1.5">
                Photo Evidence (FileReader Base64)
              </label>

              {photoBase64 ? (
                <div className="relative rounded-2xl overflow-hidden border border-leaf-400 max-h-48 group">
                  <img
                    src={photoBase64}
                    alt="Uploaded waste preview"
                    className="w-full h-48 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setPhotoBase64(null)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 transition-colors"
                    aria-label="Remove photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <span className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/60 text-white text-[10px] font-mono">
                    ✓ Mock Base64 Staged
                  </span>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-cream-200 dark:border-leaf-700/40 rounded-2xl cursor-pointer hover:border-leaf-500 bg-cream-100/50 dark:bg-[#2A241B]/50 transition-colors">
                  <Camera className="w-8 h-8 text-bark-400 dark:text-cream-200/60 mb-2" />
                  <span className="text-xs font-bold text-bark-600 dark:text-cream-200">
                    Click to select camera snapshot or image file
                  </span>
                  <span className="text-[11px] text-bark-400 dark:text-cream-200/40 mt-1">
                    PNG, JPG, WEBP up to 5MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoSelect}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Reporter Name (Optional) */}
            <div>
              <label className="block text-xs font-bold uppercase text-bark-600 dark:text-cream-200/70 mb-1.5">
                Your Name / Apartment (Optional)
              </label>
              <input
                type="text"
                value={reportedBy}
                onChange={(e) => setReportedBy(e.target.value)}
                placeholder="e.g. Maya R. (Flat 402)"
                className="w-full px-4 py-2.5 rounded-xl bg-cream-100 dark:bg-[#2A241B] border border-cream-200 dark:border-leaf-700/40 text-sm font-semibold text-bark-900 dark:text-cream-50 focus:outline-none focus:border-leaf-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-cream-200 dark:border-leaf-700/30 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsReporterOpen(false)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-bark-600 dark:text-cream-200 hover:bg-cream-200 dark:hover:bg-[#2A241B] transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="btn-magnetic px-7 py-2.5 rounded-full bg-leaf-500 hover:bg-leaf-700 text-white font-bold text-xs shadow-lg shadow-leaf-500/25 flex items-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <span>Publishing...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Post to Ward Board</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
