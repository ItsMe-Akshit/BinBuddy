export const CATEGORY_WEIGHTS = {
  "Hazardous / Chemical Spill": 16,
  "Dead Animal / Biohazard": 14,
  "Overflowing Dumpster": 10,
  "Clogged Drain with Plastic": 9,
  "Illegal Construction Debris": 8,
  "Unsegregated Waste Pile": 6,
  "Broken Glass on Footpath": 5,
  "Uncollected Doorstep Trash": 4
};

export const ESCALATION_THRESHOLD = 35;

/**
 * Priority Escalator Ranking Heuristic:
 * score = upvotes * 2 + ageInDays * 1.5 + categoryWeight
 */
export function calculateTicketScore(ticket) {
  const reportedTime = new Date(ticket.reportedAt).getTime();
  const now = Date.now();
  const ageInDays = Math.max(0.1, (now - reportedTime) / (1000 * 60 * 60 * 24));
  const categoryWeight = CATEGORY_WEIGHTS[ticket.category] || 4;
  const upvotes = Number(ticket.upvotes || 0);

  const score = Math.round((upvotes * 2) + (ageInDays * 1.5) + categoryWeight);
  const isEscalated = score >= ESCALATION_THRESHOLD ||
    ticket.category.includes("Hazard") ||
    ticket.category.includes("Chemical");

  return {
    ...ticket,
    score,
    isEscalated,
    ageInDays: parseFloat(ageInDays.toFixed(1))
  };
}
