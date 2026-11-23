import React, { useState } from "react";
import { useWard } from "../context/WardContext";
import { useTickets } from "../context/TicketContext";
import Highlight from "../components/Highlight";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Camera,
  MapPin,
  Upload,
  UserCheck,
  Truck,
  AlertTriangle,
  X
} from "lucide-react";

const WORKERS_ROSTER = [
  "Ramesh Kumar (Sanitary Squad #3)",
  "Deepak Yadav (Tipper Truck Crew #7)",
  "Sunil Naik (Rapid Action Squad #1)",
  "Mahesh Babu (Sweeping Team #5)",
  "Anil Sharma (Biohazard Response)"
];

export default function SanitationManifest() {
  const { selectedWard, activeWardSchedule, userRole } = useWard();
  const { tickets, handleStatusChange } = useTickets();

  // Active tickets needing crew action in this ward
  const pendingGrievances = tickets.filter(
    (t) => (t.ward === selectedWard || selectedWard === "All") && t.status !== "Cleaned"
  );

  // Resolved Modal State
  const [resolvingTicket, setResolvingTicket] = useState(null);
  const [resolutionPhoto, setResolutionPhoto] = useState(null);
  const [resolutionNote, setResolutionNote] = useState("");
  const [selectedCrewMember, setSelectedCrewMember] = useState(WORKERS_ROSTER[0]);
  const [submittingResolution, setSubmittingResolution] = useState(false);

  // Simulated route stops checklist
  const [routeStops, setRouteStops] = useState([
    { id: 1, name: "Ward Depot Inspection & Scale In", time: "06:15 AM", done: true },
    { id: 2, name: "Colony Park Gate 2 Community Dumpster", time: "06:45 AM", done: true },
    { id: 3, name: "4th Cross & 2nd Main Commercial Line", time: "07:30 AM", done: true },
    { id: 4, name: "St. Jude Convent School Bus Stop Hotspot", time: "08:15 AM", done: false },
    { id: 5, name: "Sunrise Layout 2nd Avenue Footpath Debris", time: "09:00 AM", done: false },
    { id: 6, name: "Oakwood Apartments Lane 7-10 Return Sweep", time: "10:15 AM", done: false },
    { id: 7, name: "Dry Resource Recovery Facility (MRF) Drop", time: "11:30 AM", done: false }
  ]);

  const toggleStop = (id) => {
    setRouteStops((prev) =>
      prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s))
    );
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setResolutionPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  const submitResolution = async () => {
    if (!resolvingTicket) return;
    try {
      setSubmittingResolution(true);
      await handleStatusChange(resolvingTicket.id, "Cleaned", {
        assignedWorker: resolvingTicket.assignedWorker || selectedCrewMember,
        resolutionPhoto: resolutionPhoto || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
        resolutionNote: resolutionNote || "Hotspot cleared, waste segregated into MRF trucks, area disinfected."
      });
      setResolvingTicket(null);
      setResolutionPhoto(null);
      setResolutionNote("");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingResolution(false);
    }
  };

  return (
    <section id="manifest" className="py-20 bg-cream-100 dark:bg-[#2A241B] transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Crew Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bark-600 text-white text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-leaf-300" />
              <span>Municipal Sanitation Worker Portal</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-bark-900 dark:text-cream-50 mt-1">
              Field Crew <Highlight color="bg-marker">Route Manifest</Highlight>
            </h2>
            <p className="text-sm text-bark-600 dark:text-cream-200/80 mt-2 max-w-xl">
              Real-time route dispatcher for <strong className="text-bark-900 dark:text-cream-50">{selectedWard}</strong>.
              Assign pending complaints to sanitary squads, track daily route sequence, and upload resolution photos.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-cream-50 dark:bg-[#1E1A14] border border-leaf-300 dark:border-leaf-700/40 text-xs">
            <div className="flex items-center gap-2 text-bark-600 dark:text-cream-200">
              <Truck className="w-4 h-4 text-leaf-500" />
              <span>Assigned Tipper: <strong>{activeWardSchedule?.truckNumber}</strong></span>
            </div>
            <div className="flex items-center gap-2 mt-1 text-bark-600 dark:text-cream-200">
              <UserCheck className="w-4 h-4 text-leaf-500" />
              <span>Supervisor: <strong>{activeWardSchedule?.driverName}</strong></span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Route Stops Checklist (1 Col) */}
          <div className="p-6 rounded-3xl bg-cream-50 dark:bg-[#1E1A14] border border-leaf-300/70 dark:border-leaf-700/40 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-cream-200 dark:border-leaf-700/30 mb-4">
              <h3 className="font-display font-extrabold text-xl text-bark-900 dark:text-cream-50 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                <span>Today's Route Stops</span>
              </h3>
              <span className="text-xs font-mono font-bold text-leaf-700 dark:text-leaf-300">
                {routeStops.filter((s) => s.done).length} / {routeStops.length} Done
              </span>
            </div>

            <div className="space-y-3">
              {routeStops.map((stop) => (
                <div
                  key={stop.id}
                  onClick={() => toggleStop(stop.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    stop.done
                      ? "bg-leaf-300/20 dark:bg-leaf-900/20 border-leaf-400/50 opacity-80"
                      : "bg-cream-100 dark:bg-[#2A241B] border-cream-200 dark:border-leaf-700/30 hover:border-leaf-400"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      type="button"
                      className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
                        stop.done
                          ? "bg-leaf-500 border-leaf-500 text-white"
                          : "border-bark-400/40 bg-white dark:bg-[#1E1A14]"
                      }`}
                    >
                      {stop.done && <CheckCircle2 className="w-4 h-4" />}
                    </button>
                    <div className="min-w-0">
                      <p className={`text-xs font-bold truncate ${stop.done ? "line-through text-bark-400 dark:text-cream-200/50" : "text-bark-900 dark:text-cream-50"}`}>
                        {stop.name}
                      </p>
                      <span className="text-[10px] text-bark-400 dark:text-cream-200/50 font-mono">
                        Target: {stop.time}
                      </span>
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${stop.done ? "bg-leaf-400/20 text-leaf-700 dark:text-leaf-300" : "bg-amber-100 text-amber-800"}`}>
                    {stop.done ? "Cleared" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Ward Grievances & Resolution Controls (2 Cols) */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-cream-50 dark:bg-[#1E1A14] border border-leaf-300/70 dark:border-leaf-700/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-cream-200 dark:border-leaf-700/30 mb-4">
                <h3 className="font-display font-extrabold text-xl text-bark-900 dark:text-cream-50 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span>Pending Ward Grievances ({pendingGrievances.length})</span>
                </h3>
                <span className="text-xs text-bark-400 dark:text-cream-200/60 font-semibold">
                  Sorted by Priority Score
                </span>
              </div>

              {pendingGrievances.length === 0 ? (
                <div className="text-center py-12 text-bark-400 dark:text-cream-200/50 text-xs">
                  <CheckCircle2 className="w-10 h-10 text-leaf-500 mx-auto mb-2" />
                  <p className="font-bold text-sm text-bark-900 dark:text-cream-50">All grievances cleared in {selectedWard}!</p>
                  <p>Great job! No pending reports currently need dispatch.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingGrievances.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="p-4 rounded-2xl bg-cream-100 dark:bg-[#2A241B] border border-cream-200 dark:border-leaf-700/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold">
                            {ticket.id}
                          </span>
                          <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase">
                            {ticket.category}
                          </span>
                          {ticket.isEscalated && (
                            <span className="text-[10px] font-bold text-amber-600 bg-amber-100 dark:bg-amber-900/30 px-1.5 py-0.2 rounded">
                              🔥 High Priority
                            </span>
                          )}
                        </div>

                        <h4 className="font-bold text-sm text-bark-900 dark:text-cream-50 truncate">
                          {ticket.title}
                        </h4>
                        <p className="text-xs text-bark-600 dark:text-cream-200/70 flex items-center gap-1 mt-0.5 truncate">
                          <MapPin className="w-3 h-3 text-leaf-500 flex-shrink-0" />
                          <span className="truncate">{ticket.landmark}</span>
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {ticket.status === "Reported" ? (
                          <button
                            onClick={() =>
                              handleStatusChange(ticket.id, "Assigned", {
                                assignedWorker: selectedCrewMember
                              })
                            }
                            className="btn-magnetic px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>Assign to Squad</span>
                          </button>
                        ) : (
                          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-full">
                            In Progress: {ticket.assignedWorker?.split(" ")[0]}
                          </span>
                        )}

                        <button
                          onClick={() => setResolvingTicket(ticket)}
                          className="btn-magnetic px-4 py-1.5 rounded-full bg-leaf-500 hover:bg-leaf-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Mark Resolved</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-cream-200 dark:border-leaf-700/30 text-xs text-bark-600 dark:text-cream-200/70 flex items-center justify-between">
              <span>Sanitation manifest synchronized with Municipal Control Room</span>
              <span className="font-mono font-bold text-leaf-700 dark:text-leaf-300">
                Shift: Morning (06:00 - 14:00)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mark Resolved Modal */}
      {resolvingTicket && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-cream-50 dark:bg-[#1E1A14] rounded-3xl p-6 sm:p-8 shadow-2xl border border-leaf-300 dark:border-leaf-700/50 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-cream-200 dark:border-leaf-700/30">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-leaf-700 dark:text-leaf-300">
                  Resolution Verification
                </span>
                <h4 className="font-display font-extrabold text-xl text-bark-900 dark:text-cream-50">
                  Resolve Ticket #{resolvingTicket.id}
                </h4>
              </div>
              <button
                onClick={() => setResolvingTicket(null)}
                className="p-1 rounded-lg text-bark-400 hover:text-bark-900 dark:text-cream-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-cream-100 dark:bg-[#2A241B] text-xs">
              <p className="font-bold text-bark-900 dark:text-cream-50">{resolvingTicket.title}</p>
              <p className="text-bark-600 dark:text-cream-200/70 mt-0.5">📍 {resolvingTicket.landmark}</p>
            </div>

            {/* Resolution Photo Upload */}
            <div>
              <label className="block text-xs font-bold uppercase text-bark-600 dark:text-cream-200/70 mb-1.5">
                Upload Cleaned Evidence Photo *
              </label>
              {resolutionPhoto ? (
                <div className="relative rounded-2xl overflow-hidden h-36 border border-leaf-400">
                  <img src={resolutionPhoto} alt="Resolution" className="w-full h-full object-cover" />
                  <button
                    onClick={() => setResolutionPhoto(null)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-cream-200 dark:border-leaf-700/40 rounded-2xl cursor-pointer hover:border-leaf-500 bg-cream-100/50 dark:bg-[#2A241B]/50 transition-colors">
                  <Camera className="w-7 h-7 text-bark-400 mb-1" />
                  <span className="text-xs font-bold text-bark-600 dark:text-cream-200">
                    Snap or upload after-cleanup photo
                  </span>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              )}
            </div>

            {/* Resolution Note */}
            <div>
              <label className="block text-xs font-bold uppercase text-bark-600 dark:text-cream-200/70 mb-1.5">
                Resolution Note & Disposal Method
              </label>
              <textarea
                rows={2}
                value={resolutionNote}
                onChange={(e) => setResolutionNote(e.target.value)}
                placeholder="e.g. 3 cartloads lifted, drain unclogged with rake, disinfected with lime..."
                className="w-full px-3 py-2 rounded-xl bg-cream-100 dark:bg-[#2A241B] border border-cream-200 dark:border-leaf-700/40 text-xs font-semibold text-bark-900 dark:text-cream-50"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setResolvingTicket(null)}
                className="px-4 py-2 rounded-full text-xs font-bold text-bark-600 dark:text-cream-200"
              >
                Cancel
              </button>
              <button
                onClick={submitResolution}
                disabled={submittingResolution}
                className="btn-magnetic px-6 py-2 rounded-full bg-leaf-500 hover:bg-leaf-700 text-white font-bold text-xs shadow-md"
              >
                {submittingResolution ? "Saving..." : "Confirm & Mark Cleaned ✓"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
