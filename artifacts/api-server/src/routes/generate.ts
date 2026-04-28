import { Router, type IRouter, type Request, type Response } from "express";
import { logger } from "../lib/logger";

const router: IRouter = Router();

// ── Helpers ──────────────────────────────────────────────────────────────────

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

// ── POST /generate ────────────────────────────────────────────────────────────

router.post("/generate", (req: Request, res: Response) => {
  const { title, description, users, goal } = req.body as {
    title?: string;
    description?: string;
    users?: string;
    goal?: string;
  };

  logger.info({ title, users, goal }, "POST /generate — request received");

  // A. Input validation
  if (!title?.trim() || !description?.trim()) {
    logger.warn("Validation failed: title or description missing");
    return res.status(400).json({
      error: "Both 'title' and 'description' are required.",
    });
  }

  try {
    const risk = detectRisk(description);
    const effort = assessEffort(description);

    // B + C. Build tasks with logic layer
    const items = TASK_TEMPLATES.map((t) => {
      const taskEffort: "High" | "Medium" | "Low" =
        effort === "High" && t.baseEffort !== "Low" ? "High" : t.baseEffort;
      const priority = derivePriority(taskEffort, risk);
      return { name: t.name, effort: taskEffort, priority, risk };
    });

    // Summary + insights
    const summary =
      `Feature: "${title}" targeting ${users || "all users"} with the goal of ${goal || "improving the product"}.`;

    const insights: string[] = [
      `Overall effort assessed as ${effort} based on feature complexity.`,
      `Risk level is ${risk}${risk === "High" ? " — security review recommended before release" : risk === "Medium" ? " — extra care needed around authentication flows" : " — standard development process applies"}.`,
      `${items.filter((i) => i.priority === "High").length} of ${items.length} tasks are high priority.`,
      users ? `Target audience: ${users}.` : "No specific target users defined.",
    ];

    const response = {
      summary,
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
