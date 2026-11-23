import { initialFallbackTickets, fallbackSchedule } from "./fallbackData";
import { calculateTicketScore } from "./scoring";

const API_BASE = "/api";
const LOCAL_STORAGE_TICKETS_KEY = "binbuddy_tickets_local";

// Helper to initialize local storage
function getStoredTickets() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_TICKETS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Could not read from localStorage:", e);
  }
  return initialFallbackTickets;
}

function saveStoredTickets(tickets) {
  try {
    localStorage.setItem(LOCAL_STORAGE_TICKETS_KEY, JSON.stringify(tickets));
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
  }
}

export async function fetchTickets(ward = "All") {
  try {
    const url = ward && ward !== "All" ? `${API_BASE}/tickets?ward=${encodeURIComponent(ward)}` : `${API_BASE}/tickets`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    saveStoredTickets(data);
    return data;
  } catch (err) {
    console.warn("Backend API unreachable, using local fallback store:", err.message);
    let list = getStoredTickets();
    if (ward && ward !== "All") {
      list = list.filter(t => t.ward === ward);
    }
    return list.map(calculateTicketScore).sort((a, b) => b.score - a.score);
  }
}

export async function createTicket(ticketData) {
  try {
    const res = await fetch(`${API_BASE}/tickets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticketData)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Backend API down, saving ticket locally in localStorage:", err.message);
    const list = getStoredTickets();
    const newTicket = {
      id: `TKT-${Math.floor(100 + Math.random() * 900)}`,
      title: ticketData.title,
      category: ticketData.category,
      landmark: ticketData.landmark,
      ward: ticketData.ward,
      description: ticketData.description,
      status: "Reported",
      upvotes: 1,
      reportedBy: ticketData.reportedBy || "Citizen Reporter",
      reportedAt: new Date().toISOString(),
      photo: ticketData.photo || null,
      assignedWorker: null,
      resolutionPhoto: null,
      resolutionNote: null
    };
    const updatedList = [newTicket, ...list];
    saveStoredTickets(updatedList);
    return calculateTicketScore(newTicket);
  }
}

export async function updateTicketStatus(id, updates) {
  try {
    const res = await fetch(`${API_BASE}/tickets/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Backend API down, updating ticket status locally:", err.message);
    const list = getStoredTickets();
    let updatedTicket = null;
    const newList = list.map(t => {
      if (t.id === id) {
        updatedTicket = { ...t, ...updates };
        return updatedTicket;
      }
      return t;
    });
    saveStoredTickets(newList);
    return calculateTicketScore(updatedTicket);
  }
}

export async function upvoteTicket(id) {
  try {
    const res = await fetch(`${API_BASE}/tickets/${id}/upvote`, {
      method: "POST"
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Backend API down, upvoting locally:", err.message);
    const list = getStoredTickets();
    let updatedTicket = null;
    const newList = list.map(t => {
      if (t.id === id) {
        updatedTicket = { ...t, upvotes: (t.upvotes || 0) + 1 };
        return updatedTicket;
      }
      return t;
    });
    saveStoredTickets(newList);
    return calculateTicketScore(updatedTicket);
  }
}

export async function fetchSchedule() {
  try {
    const res = await fetch(`${API_BASE}/schedule`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Backend schedule down, using offline schedule:", err.message);
    return fallbackSchedule;
  }
}

export async function searchItems(query = "") {
  try {
    const res = await fetch(`${API_BASE}/items?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("Backend search items down, using fallback:", err.message);
    return [];
  }
}

export async function sendNotification(data) {
  try {
    const res = await fetch(`${API_BASE}/notify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (err) {
    return {
      success: true,
      dispatchedAt: new Date().toISOString(),
      channel: data.channel || "Local App Notification",
      mockReceiptId: `LOCAL-${Date.now()}`
    };
  }
}
