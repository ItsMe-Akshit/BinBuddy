import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { seedItems } from "./data/seedItems.js";
import { seedTickets } from "./data/seedTickets.js";
import { seedSchedule } from "./data/seedSchedule.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "binbuddy.sqlite");

export const db = new DatabaseSync(dbPath);

export function initDatabase() {
  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      stream TEXT NOT NULL,
      binColor TEXT NOT NULL,
      icon TEXT,
      disposalTip TEXT NOT NULL,
      keywords TEXT
    );

    CREATE TABLE IF NOT EXISTS tickets (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      landmark TEXT NOT NULL,
      ward TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT NOT NULL,
      upvotes INTEGER DEFAULT 0,
      reportedBy TEXT,
      reportedAt TEXT NOT NULL,
      photo TEXT,
      assignedWorker TEXT,
      resolutionPhoto TEXT,
      resolutionNote TEXT
    );

    CREATE TABLE IF NOT EXISTS system_config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);

  // Check and seed items
  const itemCount = db.prepare("SELECT COUNT(*) as count FROM items").get().count;
  if (itemCount === 0) {
    console.log("🌱 Seeding 50 household waste items...");
    const insertItem = db.prepare(`
      INSERT INTO items (id, name, category, stream, binColor, icon, disposalTip, keywords)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const item of seedItems) {
      insertItem.run(
        item.id,
        item.name,
        item.category,
        item.stream,
        item.binColor,
        item.icon,
        item.disposalTip,
        JSON.stringify(item.keywords || [])
      );
    }
  }

  // Check and seed tickets
  const ticketCount = db.prepare("SELECT COUNT(*) as count FROM tickets").get().count;
  if (ticketCount === 0) {
    console.log("🌱 Seeding 8 realistic civic ward complaint tickets...");
    const insertTicket = db.prepare(`
      INSERT INTO tickets (id, title, category, landmark, ward, description, status, upvotes, reportedBy, reportedAt, photo, assignedWorker, resolutionPhoto, resolutionNote)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const ticket of seedTickets) {
      insertTicket.run(
        ticket.id,
        ticket.title,
        ticket.category,
        ticket.landmark,
        ticket.ward,
        ticket.description,
        ticket.status,
        ticket.upvotes || 0,
        ticket.reportedBy || "Citizen",
        ticket.reportedAt || new Date().toISOString(),
        ticket.photo || null,
        ticket.assignedWorker || null,
        ticket.resolutionPhoto || null,
        ticket.resolutionNote || null
      );
    }
  }

  console.log("✅ Database initialized successfully with SQLite.");
}
