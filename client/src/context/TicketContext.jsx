import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchTickets, createTicket, updateTicketStatus, upvoteTicket } from "../utils/api";
import { calculateTicketScore } from "../utils/scoring";
import { useToast } from "./ToastContext";

const TicketContext = createContext();
const SESSION_VOTES_KEY = "binbuddy_session_upvoted_ids";

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReporterOpen, setIsReporterOpen] = useState(false);
  const { addToast } = useToast();

  // Track tickets upvoted in this user session
  const [upvotedIds, setUpvotedIds] = useState(() => {
    try {
      const raw = localStorage.getItem(SESSION_VOTES_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const loadTickets = useCallback(async (ward = "All") => {
    try {
      setLoading(true);
      const data = await fetchTickets(ward);
      setTickets(data);
    } catch (err) {
      console.error("Failed to load tickets:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  const handleUpvote = useCallback(async (ticketId) => {
    if (upvotedIds.includes(ticketId)) {
      addToast("Already Supported", "You have already upvoted this ticket in this session.", "info");
      return false;
    }

    try {
      // Optimistic update
      setTickets(prev =>
        prev.map(t => {
          if (t.id === ticketId) {
            const updated = { ...t, upvotes: (t.upvotes || 0) + 1 };
            return calculateTicketScore(updated);
          }
          return t;
        }).sort((a, b) => b.score - a.score)
      );

      const nextUpvoted = [...upvotedIds, ticketId];
      setUpvotedIds(nextUpvoted);
      localStorage.setItem(SESSION_VOTES_KEY, JSON.stringify(nextUpvoted));

      // Call API
      const result = await upvoteTicket(ticketId);

      if (result.isEscalated) {
        addToast("Priority Escalated! 🔥", `Ticket ${ticketId} reached escalation threshold with ${result.upvotes} community votes!`, "escalate");
      } else {
        addToast("Upvoted! +1", "Your community vote boosted this cleanup priority.", "success");
      }

      return true;
    } catch (err) {
      console.error("Upvote failed:", err);
      return false;
    }
  }, [upvotedIds, addToast]);

  const handleStatusChange = useCallback(async (ticketId, newStatus, extraData = {}) => {
    try {
      // Optimistic update
      setTickets(prev =>
        prev.map(t => {
          if (t.id === ticketId) {
            const updated = { ...t, status: newStatus, ...extraData };
            return calculateTicketScore(updated);
          }
          return t;
        })
      );

      const updated = await updateTicketStatus(ticketId, { status: newStatus, ...extraData });
      addToast("Status Updated", `Ticket #${ticketId} is now marked as "${newStatus}".`, "success");
      return updated;
    } catch (err) {
      console.error("Status update error:", err);
      addToast("Update Error", "Could not synchronize ticket status update.", "error");
      return null;
    }
  }, [addToast]);

  const handleCreateTicket = useCallback(async (newTicketData) => {
    try {
      const created = await createTicket(newTicketData);
      setTickets(prev => [created, ...prev].sort((a, b) => b.score - a.score));
      addToast("Complaint Lodged!", `Ticket ${created.id} is live on the Public Ward Kanban.`, "success");
      setIsReporterOpen(false);
      return created;
    } catch (err) {
      console.error("Create ticket failed:", err);
      addToast("Submission Error", "Failed to lodge ticket. Please retry.", "error");
      throw err;
    }
  }, [addToast]);

  // Proximity / Duplicate search helper:
  // Given a landmark or street keyword, finds tickets in the same ward or matching landmark
  const findNearbyTickets = useCallback((landmarkQuery, ward) => {
    if (!landmarkQuery || landmarkQuery.trim().length < 3) return [];
    const queryTokens = landmarkQuery.toLowerCase().split(/\s+/).filter(w => w.length > 2);

    return tickets.filter(t => {
      // Match ward or similar
      const wardMatch = ward && ward !== "All" ? t.ward === ward : true;
      const landmarkLower = t.landmark.toLowerCase();
      const titleLower = t.title.toLowerCase();

      // Check if any significant token is in landmark or title
      const tokenMatch = queryTokens.some(token => landmarkLower.includes(token) || titleLower.includes(token));
      return wardMatch && tokenMatch && t.status !== "Cleaned";
    });
  }, [tickets]);

  // Calculated stats for hero counters
  const cleanedCount = tickets.filter(t => t.status === "Cleaned").length;
  const reportedCount = tickets.filter(t => t.status === "Reported").length;
  const assignedCount = tickets.filter(t => t.status === "Assigned").length;
  const escalatedCount = tickets.filter(t => t.isEscalated && t.status !== "Cleaned").length;
  const totalKgRecycled = 3450 + (cleanedCount * 125);
  const ecoPointsAwarded = 18200 + (cleanedCount * 250);

  return (
    <TicketContext.Provider
      value={{
        tickets,
        loading,
        loadTickets,
        handleUpvote,
        handleStatusChange,
        handleCreateTicket,
        findNearbyTickets,
        upvotedIds,
        isReporterOpen,
        setIsReporterOpen,
        stats: {
          cleanedCount,
          reportedCount,
          assignedCount,
          escalatedCount,
          totalKgRecycled,
          ecoPointsAwarded
        }
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  return useContext(TicketContext);
}
