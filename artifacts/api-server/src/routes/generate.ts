import { Router, type IRouter, type Request, type Response } from "express";
import { logger } from "../lib/logger";

const router: IRouter = Router();

// ── Logic helpers (unchanged) ─────────────────────────────────────────────────

function detectRisk(text: string): "High" | "Medium" | "Low" {
  const lower = text.toLowerCase();
  if (lower.includes("payment") || lower.includes("billing") || lower.includes("credit card")) return "High";
  if (lower.includes("login") || lower.includes("auth") || lower.includes("password") || lower.includes("signup")) return "Medium";
  return "Low";
}

function assessEffort(description: string): "High" | "Medium" | "Low" {
  const len = description.trim().length;
  if (len > 150) return "High";
  if (len > 50) return "Medium";
  return "Low";
}

function derivePriority(effort: "High" | "Medium" | "Low", risk: "High" | "Medium" | "Low"): "High" | "Medium" | "Low" {
  if (effort === "High" || risk === "High") return "High";
  if (effort === "Medium" || risk === "Medium") return "Medium";
  return "Low";
}

const TASK_TEMPLATES = [
  { name: "Design UI", baseEffort: "Low" as const },
  { name: "Build API", baseEffort: "Medium" as const },
  { name: "Frontend Integration", baseEffort: "Medium" as const },
  { name: "Write Tests", baseEffort: "Low" as const },
  { name: "QA & Review", baseEffort: "Low" as const },
];

// ── PRD builder ───────────────────────────────────────────────────────────────

interface PRD {
  problem: string;
  goals: string;
  personas: string;
  useCases: string[];
  metrics: string[];
}

function buildPRD(title: string, description: string, users: string, goal: string): PRD {
  const titleLower = title.toLowerCase();

  // Problem Statement
  const audience = users || "users";
  const problem = `${description.trim()} This gap currently affects ${audience}, making it harder for them to ${goal || "get the most out of the product"}.`;

  // Goals
  const goals = `Deliver "${title}" so that ${audience} can ${goal || "accomplish their tasks more effectively"}. The feature should be reliable, intuitive, and accessible from day one.`;

  // Personas
  const personaList = users
    ? users.split(/,|and/).map((u) => u.trim()).filter(Boolean)
    : ["General product users"];
  const personas = personaList
    .map((p) => `${p.charAt(0).toUpperCase()}${p.slice(1)} — who need ${title.toLowerCase()} to improve their workflow.`)
    .join(" ");

  // Use Cases (rule-based from title keywords)
  const useCases: string[] = [
    `A ${personaList[0] || "user"} can access and use "${title}" directly from the main interface.`,
    `The system processes the "${title}" feature correctly under normal and edge-case conditions.`,
    `${personaList.length > 1 ? `A ${personaList[1]}` : "An admin or power user"} can configure or manage "${title}" settings according to their needs.`,
  ];

  // Success Metrics (keyword-based on goal)
  const goalLower = goal.toLowerCase();
  let metrics: string[];

  if (goalLower.includes("retention") || goalLower.includes("churn")) {
    metrics = [
      "7-day user retention increases by ≥ 10% within 60 days of launch.",
      "Churn rate decreases by at least 5% quarter-over-quarter.",
      `Feature adoption rate reaches 30%+ of ${audience} within the first 30 days.`,
    ];
  } else if (goalLower.includes("engagement") || goalLower.includes("active")) {
    metrics = [
      "Daily active usage of the feature exceeds 25% of the total user base.",
      "Average session duration increases by 15% after launch.",
      "User satisfaction score (CSAT) for the feature is ≥ 4.2 / 5.",
    ];
  } else if (goalLower.includes("revenue") || goalLower.includes("conversion") || goalLower.includes("monetis")) {
    metrics = [
      "Conversion rate improves by ≥ 5% within the first quarter post-launch.",
      "Monthly recurring revenue (MRR) grows by 8–12% attributable to the feature.",
      "Average revenue per user (ARPU) increases by 7%.",
    ];
  } else if (goalLower.includes("speed") || goalLower.includes("performance") || goalLower.includes("latency")) {
    metrics = [
      "Feature response time is under 200ms at the 95th percentile.",
      "Page load time reduced by ≥ 30% compared to the current baseline.",
      "System uptime for the feature remains ≥ 99.9%.",
    ];
  } else if (goalLower.includes("ux") || goalLower.includes("experience") || goalLower.includes("satisfaction")) {
    metrics = [
      "Net Promoter Score (NPS) increases by ≥ 8 points after launch.",
      "Support tickets related to this workflow decrease by 20%.",
      "Task completion rate for the primary use case reaches ≥ 90%.",
    ];
  } else {
    metrics = [
      `Feature adoption rate reaches ≥ 30% of ${audience} within 30 days.`,
      "User satisfaction score for the feature is ≥ 4 / 5 in post-launch surveys.",
      "Zero critical bugs reported within the first two weeks after release.",
    ];
  }

  return { problem, goals, personas, useCases, metrics };
}

// ── POST /generate ────────────────────────────────────────────────────────────

router.post("/generate", (req: Request, res: Response) => {
  const { title, description, users, goal } = req.body as {
    title?: string;
    description?: string;
    users?: string;
    goal?: string;
  };

  logger.info({ title, users, goal }, "POST /generate — request received");

  // Validation
  if (!title?.trim() || !description?.trim()) {
    logger.warn("Validation failed: title or description missing");
    return res.status(400).json({ error: "Both 'title' and 'description' are required." });
  }

  try {
    const risk    = detectRisk(description);
    const effort  = assessEffort(description);

    // Tasks with logic layer (unchanged)
    const items = TASK_TEMPLATES.map((t) => {
      const taskEffort: "High" | "Medium" | "Low" =
        effort === "High" && t.baseEffort !== "Low" ? "High" : t.baseEffort;
      const priority = derivePriority(taskEffort, risk);
      return { name: t.name, effort: taskEffort, priority, risk };
    });

    // Summary (kept for backwards compatibility)
    const summary = `Feature: "${title}" targeting ${users || "all users"} with the goal of ${goal || "improving the product"}.`;

    // Structured PRD (new)
    const prd = buildPRD(title, description, users || "", goal || "");

    // Insights (unchanged)
    const insights: string[] = [
      `Overall effort assessed as ${effort} based on feature complexity.`,
      `Risk level is ${risk}${risk === "High" ? " — security review recommended before release" : risk === "Medium" ? " — extra care needed around authentication flows" : " — standard development process applies"}.`,
      `${items.filter((i) => i.priority === "High").length} of ${items.length} tasks are high priority.`,
      users ? `Target audience: ${users}.` : "No specific target users defined.",
    ];

    const response = {
      summary,
      prd,
      items,
      insights,
      metadata: { priority: derivePriority(effort, risk), risk },
    };

    logger.info({ taskCount: items.length, risk, effort }, "POST /generate — response sent");
    return res.json(response);
  } catch (err) {
    logger.error({ err }, "POST /generate — unexpected error");
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
