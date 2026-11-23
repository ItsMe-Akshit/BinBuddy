import express from "express";
import cors from "cors";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { db, initDatabase } from "./db.js";
import { seedSchedule } from "./data/seedSchedule.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.join(__dirname, "../client/dist");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "15mb" }));

// Initialize DB and Seed Data
try {
  initDatabase();
} catch (err) {
  console.error("Database initialization error:", err);
}

// Category weights for Priority Escalator
const CATEGORY_WEIGHTS = {
  "Hazardous / Chemical Spill": 16,
  "Dead Animal / Biohazard": 14,
  "Overflowing Dumpster": 10,
  "Clogged Drain with Plastic": 9,
  "Illegal Construction Debris": 8,
  "Unsegregated Waste Pile": 6,
  "Broken Glass on Footpath": 5,
  "Uncollected Doorstep Trash": 4
};

// Heuristic score calculator: score = upvotes*2 + ageInDays*1.5 + categoryWeight
function calculateScore(ticket) {
  const ageInDays = Math.max(0.1, (Date.now() - new Date(ticket.reportedAt).getTime()) / (1000 * 60 * 60 * 24));
  const categoryWeight = CATEGORY_WEIGHTS[ticket.category] || 4;
  const score = Math.round((ticket.upvotes * 2) + (ageInDays * 1.5) + categoryWeight);
  const isEscalated = score >= 35 || (ticket.category.includes("Hazard") || ticket.category.includes("Chemical"));
  return {
    ...ticket,
    score,
    isEscalated,
    ageInDays: parseFloat(ageInDays.toFixed(1))
  };
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString(), platform: "BinBuddy Civic Engine" });
});

// GET /api/tickets - List all tickets with sorting and optional ward filter
app.get("/api/tickets", (req, res) => {
  try {
    const { ward } = req.query;
    let query = "SELECT * FROM tickets";
    const params = [];
    if (ward && ward !== "All") {
      query += " WHERE ward = ?";
      params.push(ward);
    }
    const tickets = db.prepare(query).all(...params);
    const enriched = tickets.map(calculateScore).sort((a, b) => b.score - a.score);
    res.json(enriched);
  } catch (err) {
    console.error("Error fetching tickets:", err);
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
});

// POST /api/tickets - Create a new complaint ticket
app.post("/api/tickets", (req, res) => {
  try {
    const { title, category, landmark, ward, description, photo, reportedBy } = req.body;
    if (!title || !category || !landmark || !ward || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const id = `TKT-${Math.floor(100 + Math.random() * 900)}`;
    const reportedAt = new Date().toISOString();
    const upvotes = 1;

    const stmt = db.prepare(`
      INSERT INTO tickets (id, title, category, landmark, ward, description, status, upvotes, reportedBy, reportedAt, photo)
      VALUES (?, ?, ?, ?, ?, ?, 'Reported', ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      title,
      category,
      landmark,
      ward,
      description,
      upvotes,
      reportedBy || "Citizen Reporter",
      reportedAt,
      photo || null
    );

    const created = db.prepare("SELECT * FROM tickets WHERE id = ?").get(id);
    res.status(201).json(calculateScore(created));
  } catch (err) {
    console.error("Error creating ticket:", err);
    res.status(500).json({ error: "Failed to create ticket" });
  }
});

// PATCH /api/tickets/:id/status - Update ticket status or resolution
app.patch("/api/tickets/:id/status", (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedWorker, resolutionPhoto, resolutionNote } = req.body;

    const existing = db.prepare("SELECT * FROM tickets WHERE id = ?").get(id);
    if (!existing) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    const newStatus = status || existing.status;
    const newWorker = assignedWorker !== undefined ? assignedWorker : existing.assignedWorker;
    const newResolutionPhoto = resolutionPhoto !== undefined ? resolutionPhoto : existing.resolutionPhoto;
    const newResolutionNote = resolutionNote !== undefined ? resolutionNote : existing.resolutionNote;

    db.prepare(`
      UPDATE tickets
      SET status = ?, assignedWorker = ?, resolutionPhoto = ?, resolutionNote = ?
      WHERE id = ?
    `).run(newStatus, newWorker, newResolutionPhoto, newResolutionNote, id);

    const updated = db.prepare("SELECT * FROM tickets WHERE id = ?").get(id);
    res.json(calculateScore(updated));
  } catch (err) {
    console.error("Error updating ticket:", err);
    res.status(500).json({ error: "Failed to update ticket status" });
  }
});

// POST /api/tickets/:id/upvote - Upvote a ticket
app.post("/api/tickets/:id/upvote", (req, res) => {
  try {
    const { id } = req.params;
    const existing = db.prepare("SELECT * FROM tickets WHERE id = ?").get(id);
    if (!existing) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    db.prepare("UPDATE tickets SET upvotes = upvotes + 1 WHERE id = ?").run(id);
    const updated = db.prepare("SELECT * FROM tickets WHERE id = ?").get(id);
    res.json(calculateScore(updated));
  } catch (err) {
    console.error("Error upvoting ticket:", err);
    res.status(500).json({ error: "Failed to upvote ticket" });
  }
});

// GET /api/schedule - Weekly and monthly pickup schedule + truck simulation data
app.get("/api/schedule", (req, res) => {
  try {
    res.json(seedSchedule);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve schedule" });
  }
});

// GET /api/items?q= - Waste segregation lookup across 50 items
app.get("/api/items", (req, res) => {
  try {
    const q = (req.query.q || "").trim().toLowerCase();
    const allItems = db.prepare("SELECT * FROM items").all().map(item => ({
      ...item,
      keywords: JSON.parse(item.keywords || "[]")
    }));

    if (!q) {
      return res.json(allItems);
    }

    const filtered = allItems.filter(item => {
      const matchName = item.name.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      const matchStream = item.stream.toLowerCase().includes(q);
      const matchKeywords = item.keywords.some(k => k.toLowerCase().includes(q));
      return matchName || matchCat || matchStream || matchKeywords;
    });

    res.json(filtered);
  } catch (err) {
    console.error("Error searching items:", err);
    res.status(500).json({ error: "Failed to query waste items" });
  }
});

// POST /api/notify - Simulated civic notification dispatch
app.post("/api/notify", (req, res) => {
  const { recipient, message, channel, ward } = req.body;
  console.log(`📡 [DISPATCH] [${channel || "SMS/App"}] To: ${recipient || "Ward Crew"} | Ward: ${ward || "General"} | Msg: "${message}"`);
  res.json({
    success: true,
    dispatchedAt: new Date().toISOString(),
    channel: channel || "In-App Push & SMS Alert",
    mockReceiptId: `MSG-${Math.floor(100000 + Math.random() * 900000)}`
  });
});

// Serve production client build if available
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
  console.log(`📦 Serving compiled client from ${clientDistPath}`);
}

app.listen(PORT, () => {
  console.log(`🚀 BinBuddy Civic Backend running on http://localhost:${PORT}`);
});
