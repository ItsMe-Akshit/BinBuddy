import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTickets } from "../context/TicketContext";
import { useWard, WARDS } from "../context/WardContext";
import Highlight from "../components/Highlight";
import { TicketSkeleton } from "../components/SkeletonLoader";
import {
  Flame,
  ThumbsUp,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  ArrowRight,
  ShieldAlert,
  ChevronDown,
  Filter,
  Eye,
  X
} from "lucide-react";

const COLUMNS = [
  { id: "Reported", title: "Reported Grievances", color: "border-amber-400 bg-amber-500/10 text-amber-700 dark:text-amber-300" },
  { id: "Assigned", title: "Assigned to Crew", color: "border-blue-400 bg-blue-500/10 text-blue-700 dark:text-blue-300" },
  { id: "Cleaned", title: "Cleaned & Verified", color: "border-leaf-500 bg-leaf-500/10 text-leaf-700 dark:text-leaf-300" }
];

export default function WardKanbanBoard() {
  const { tickets, loading, handleUpvote, handleStatusChange, upvotedIds } = useTickets();
  const { selectedWard, setSelectedWard } = useWard();

  const [activePhotoModal, setActivePhotoModal] = useState(null);
  const [boardWardFilter, setBoardWardFilter] = useState("All");
  const [poppingTicketId, setPoppingTicketId] = useState(null);
  const [floatingVotes, setFloatingVotes] = useState([]);

  // Drag and drop tracking
  const [draggedTicketId, setDraggedTicketId] = useState(null);

  // Filter tickets by board filter
  const displayedTickets = tickets.filter((t) => {
    if (boardWardFilter === "All") return true;
    return t.ward === boardWardFilter;
  });

  const onDragStart = (e, ticketId) => {
    e.dataTransfer.setData("text/plain", ticketId);
    setDraggedTicketId(ticketId);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = async (e, targetStatus) => {
    e.preventDefault();
    const ticketId = e.dataTransfer.getData("text/plain") || draggedTicketId;
    if (ticketId) {
      await handleStatusChange(ticketId, targetStatus);
    }
    setDraggedTicketId(null);
  };

  const triggerUpvoteWithAnimation = async (e, ticketId) => {
    e.stopPropagation();
    setPoppingTicketId(ticketId);

    // Add floating +1 particle
    const voteKey = `${ticketId}-${Date.now()}`;
    setFloatingVotes((prev) => [...prev, { id: voteKey, ticketId }]);
    setTimeout(() => {
      setFloatingVotes((prev) => prev.filter((v) => v.id !== voteKey));
    }, 1200);

    setTimeout(() => setPoppingTicketId(null), 400);
    await handleUpvote(ticketId);
  };

  return (
    <section id="kanban" className="py-20 bg-cream-50 dark:bg-[#1E1A14] paper-texture transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-leaf-700 dark:text-leaf-300 font-sans">
              Civic Transparency & Priority Dispatch
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-bark-900 dark:text-cream-50 mt-1">
              Public Ward <Highlight color="bg-marker">Status Board</Highlight>
            </h2>
            <p className="text-sm text-bark-600 dark:text-cream-200/80 mt-2 max-w-xl">
              Real-time civic Kanban. Drag cards across statuses or support hotspot complaints with community upvotes.
              Tickets auto-rank by priority heuristic formula: <span className="font-mono text-xs font-bold text-leaf-700 dark:text-leaf-300">score = upvotes×2 + age×1.5 + weight</span>.
            </p>
          </div>

          {/* Filter by Ward */}
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-leaf-500" />
            <select
              value={boardWardFilter}
              onChange={(e) => setBoardWardFilter(e.target.value)}
              className="px-4 py-2 rounded-full bg-cream-100 dark:bg-[#2A241B] border border-leaf-300 dark:border-leaf-700/50 text-xs font-bold text-bark-900 dark:text-cream-100 shadow-sm"
              aria-label="Filter board by ward"
            >
              <option value="All">All Wards (Civic Overview)</option>
              {WARDS.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Kanban Board Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {COLUMNS.map((col) => {
            const columnTickets = displayedTickets.filter((t) => t.status === col.id);

            return (
              <div
                key={col.id}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, col.id)}
                className="flex flex-col rounded-3xl bg-cream-100/70 dark:bg-[#2A241B]/70 border border-leaf-300/60 dark:border-leaf-700/30 p-4 sm:p-5 min-h-[580px] shadow-sm transition-all"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-cream-200 dark:border-leaf-700/30">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${col.color}`}>
                      {col.title}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-bark-400 dark:text-cream-200/60">
                    {columnTickets.length} tickets
                  </span>
                </div>

                {/* Tickets Container with smooth Framer Motion layout animations */}
                <div className="flex-1 flex flex-col gap-4">
                  {loading ? (
                    <TicketSkeleton />
                  ) : columnTickets.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-cream-200/80 dark:border-leaf-700/20 rounded-2xl text-bark-400 dark:text-cream-200/40 text-xs">
                      <span>No tickets in {col.id}</span>
                      <span className="text-[10px] mt-1">Drag tickets here to update status</span>
                    </div>
                  ) : (
                    columnTickets.map((ticket) => {
                      const isUpvoted = upvotedIds.includes(ticket.id);
                      const isPopping = poppingTicketId === ticket.id;

                      return (
                        <motion.div
                          layout
                          key={ticket.id}
                          draggable
                          onDragStart={(e) => onDragStart(e, ticket.id)}
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          className={`group relative p-4 rounded-2xl bg-cream-50 dark:bg-[#1E1A14] border shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing transition-all ${
                            ticket.isEscalated
                              ? "border-amber-400/80 dark:border-amber-600/70 ring-1 ring-amber-400/30"
                              : "border-cream-200 dark:border-leaf-700/30 hover:border-leaf-400"
                          }`}
                        >
                          {/* Top Badges: Category, Escalated Flame & Score */}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-leaf-700 dark:text-leaf-300 bg-leaf-300/30 dark:bg-leaf-900/30 px-2 py-0.5 rounded-md">
                              {ticket.category}
                            </span>

                            <div className="flex items-center gap-1.5">
                              {/* Escalated Flame Badge */}
                              {ticket.isEscalated && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-800 text-[10px] font-extrabold uppercase animate-pulse">
                                  <Flame className="w-3 h-3 fill-red-500" />
                                  <span>Escalated</span>
                                </span>
                              )}

                              {/* Priority Score badge */}
                              <span className="text-[10px] font-mono font-bold text-bark-400 dark:text-cream-200/60 bg-cream-100 dark:bg-[#2A241B] px-1.5 py-0.5 rounded">
                                Score: {ticket.score}
                              </span>
                            </div>
                          </div>

                          {/* Ticket Title */}
                          <h4 className="font-display font-extrabold text-base text-bark-900 dark:text-cream-50 leading-snug group-hover:text-leaf-700 dark:group-hover:text-leaf-400 transition-colors">
                            {ticket.title}
                          </h4>

                          {/* Geotag chip & Ward */}
                          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-bark-600 dark:text-cream-200/70">
                            <span className="inline-flex items-center gap-1 bg-cream-100 dark:bg-[#2A241B] px-2 py-0.5 rounded-md font-medium text-[11px] truncate max-w-[200px]">
                              <MapPin className="w-3 h-3 text-leaf-500 flex-shrink-0" />
                              <span className="truncate">{ticket.landmark}</span>
                            </span>
                            <span className="text-[10px] font-semibold text-bark-400 dark:text-cream-200/50">
                              ({ticket.ward.split(" ")[1] || ticket.ward})
                            </span>
                          </div>

                          {/* Description */}
                          <p className="mt-2 text-xs text-bark-600 dark:text-cream-200/80 line-clamp-2 leading-relaxed">
                            {ticket.description}
                          </p>

                          {/* Photo preview thumbnail */}
                          {ticket.photo && (
                            <div className="mt-3 relative rounded-xl overflow-hidden h-28 border border-cream-200 dark:border-leaf-700/30 group/img">
                              <img
                                src={ticket.photo}
                                alt={ticket.title}
                                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                              />
                              <button
                                onClick={() => setActivePhotoModal(ticket.photo)}
                                className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1"
                              >
                                <Eye className="w-4 h-4" /> View Photo
                              </button>
                            </div>
                          )}

                          {/* Assigned Worker Info if Assigned */}
                          {ticket.assignedWorker && (
                            <div className="mt-2.5 px-2.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40 text-[11px] font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                              <span>Crew: {ticket.assignedWorker}</span>
                            </div>
                          )}

                          {/* Cleaned Note if Resolved */}
                          {ticket.resolutionNote && (
                            <div className="mt-2.5 px-2.5 py-1.5 rounded-xl bg-leaf-50 dark:bg-leaf-950/30 border border-leaf-300 dark:border-leaf-800/40 text-[11px] text-leaf-800 dark:text-leaf-200">
                              <strong>Resolution:</strong> {ticket.resolutionNote}
                            </div>
                          )}

                          {/* Footer: Upvote action & Quick Move */}
                          <div className="mt-4 pt-3 border-t border-cream-200/80 dark:border-leaf-700/20 flex items-center justify-between">
                            {/* Upvote Button with Pop & Floating +1 */}
                            <div className="relative">
                              <button
                                onClick={(e) => triggerUpvoteWithAnimation(e, ticket.id)}
                                disabled={isUpvoted}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                                  isUpvoted
                                    ? "bg-leaf-400/20 text-leaf-700 dark:text-leaf-300 cursor-default"
                                    : "bg-cream-100 dark:bg-[#2A241B] hover:bg-leaf-300/30 text-bark-900 dark:text-cream-50 border border-cream-200 dark:border-leaf-700/40 hover:scale-105 active:scale-95"
                                } ${isPopping ? "animate-popVote" : ""}`}
                              >
                                <ThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? "fill-leaf-500 text-leaf-500" : ""}`} />
                                <span>{ticket.upvotes}</span>
                                {isUpvoted && <span className="text-[10px] font-sans font-normal ml-0.5">Voted</span>}
                              </button>

                              {/* Floating +1 Particle Burst */}
                              <AnimatePresence>
                                {floatingVotes
                                  .filter((v) => v.ticketId === ticket.id)
                                  .map((v) => (
                                    <motion.span
                                      key={v.id}
                                      initial={{ opacity: 1, y: 0, scale: 0.8 }}
                                      animate={{ opacity: 0, y: -30, scale: 1.4 }}
                                      exit={{ opacity: 0 }}
                                      transition={{ duration: 0.9, ease: "easeOut" }}
                                      className="absolute -top-3 left-4 pointer-events-none text-xs font-extrabold text-leaf-500"
                                    >
                                      +1 👍
                                    </motion.span>
                                  ))}
                              </AnimatePresence>
                            </div>

                            {/* Quick Status Shift Controls (for mobile / click) */}
                            <div className="flex items-center gap-1">
                              {ticket.status !== "Reported" && (
                                <button
                                  onClick={() => handleStatusChange(ticket.id, "Reported")}
                                  className="text-[10px] font-bold px-2 py-1 rounded bg-cream-100 dark:bg-[#2A241B] hover:bg-cream-200 text-bark-600 dark:text-cream-200"
                                  title="Move to Reported"
                                >
                                  ← Rep
                                </button>
                              )}
                              {ticket.status !== "Assigned" && (
                                <button
                                  onClick={() => handleStatusChange(ticket.id, "Assigned", { assignedWorker: "Sanitary Rapid Crew" })}
                                  className="text-[10px] font-bold px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/40 hover:bg-blue-200 text-blue-700 dark:text-blue-300"
                                  title="Assign to Crew"
                                >
                                  Assign
                                </button>
                              )}
                              {ticket.status !== "Cleaned" && (
                                <button
                                  onClick={() => handleStatusChange(ticket.id, "Cleaned", { resolutionNote: "Civic spot cleaned & sanitized." })}
                                  className="text-[10px] font-bold px-2 py-1 rounded bg-leaf-500 hover:bg-leaf-700 text-white"
                                  title="Mark as Cleaned"
                                >
                                  Done ✓
                                </button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      {activePhotoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full bg-cream-50 dark:bg-[#1E1A14] rounded-3xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setActivePhotoModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors z-10"
              aria-label="Close photo view"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={activePhotoModal} alt="Expanded evidence view" className="w-full max-h-[80vh] object-contain" />
          </div>
        </div>
      )}
    </section>
  );
}
