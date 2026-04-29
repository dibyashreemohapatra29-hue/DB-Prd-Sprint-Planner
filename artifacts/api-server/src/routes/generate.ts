import { Router, type IRouter, type Request, type Response } from "express";
import { db, workflowsTable } from "@workspace/db";
import { logger } from "../lib/logger";
import { supabase } from "../lib/supabase";

const router: IRouter = Router();

// ── Groq ──────────────────────────────────────────────────────────────────────

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL   = "compound-beta-mini";

const SYSTEM_PROMPT = `You are a PRD to Sprint planner for product managers. You take structured input and return a comprehensive, detailed PRD along with tasks and sprint plans.

Input format:
Feature Title:
Target Users:
Business Goals:
Description:

Your output must be valid JSON only — no markdown fences, no explanation outside the JSON — matching exactly this structure:
{
  "prd": "<FULL PRD DOCUMENT AS A PLAIN TEXT STRING>",
  "tasks": [
    { "name": "Task name", "effort": "Low|Medium|High" },
    { "name": "Task name", "effort": "Low|Medium|High" },
    { "name": "Task name", "effort": "Low|Medium|High" },
    { "name": "Task name", "effort": "Low|Medium|High" },
    { "name": "Task name", "effort": "Low|Medium|High" }
  ],
  "insights": ["Insight 1", "Insight 2"]
}

Rules for the "prd" field:
- Write the FULL PRD document as a single string value
- Use \\n for line breaks and ## for section headings
- Include ALL of these sections without skipping any:
  ## Objectives
  ## Scope
  ## User Stories
  ## Technical Requirements
  ## Dependencies
  ## Risks & Mitigations
  ## Success Metrics
  ## Sprint Plan
- Each section must be detailed and complete — do NOT compress or summarize
- Preserve all formatting using \\n for newlines

Rules for tasks:
- Return 3–5 tasks
- effort values must be exactly: Low, Medium, or High`;

interface GroqTask { name: string; effort: "Low" | "Medium" | "High"; }

interface GroqResult {
  prd: string;
  tasks: GroqTask[];
  insights: string[];
}

async function callGroq(
  title: string,
  description: string,
  users: string,
  goal: string,
): Promise<GroqResult | null> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("[Groq] GROQ_API_KEY not set — skipping Groq call");
    return null;
  }

  const userMessage = `Feature Title: ${title}
Target Users: ${users || "General users"}
Business Goals: ${goal || "Improve the product"}
Description: ${description}`;

  console.log("[Groq] Calling Groq API...");
  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user",   content: userMessage },
        ],
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[Groq] API error ${response.status}:`, errText);
      return null;
    }

    const json = await response.json() as { choices?: { message?: { content?: string } }[] };
    const raw  = json.choices?.[0]?.message?.content ?? "";
    console.log("[Groq] Raw response received, parsing...");

    const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed  = JSON.parse(cleaned) as { prd?: unknown; tasks?: unknown; insights?: unknown };

    const prd      = typeof parsed.prd === "string" ? parsed.prd : "";
    const rawTasks = Array.isArray(parsed.tasks) ? (parsed.tasks as GroqTask[]).slice(0, 5) : [];
    const tasks    = rawTasks.map((t) => ({
      name:   typeof t.name   === "string" ? t.name   : "Task",
      effort: (["Low", "Medium", "High"].includes(t.effort) ? t.effort : "Medium") as "Low" | "Medium" | "High",
    }));
    const insights = Array.isArray(parsed.insights)
      ? (parsed.insights as unknown[]).filter((s): s is string => typeof s === "string")
      : [];

    console.log(`[Groq] Parsed successfully — ${tasks.length} task(s)`);
    return { prd, tasks, insights };
  } catch (err) {
    console.error("[Groq] Failed to parse response:", err);
    return null;
  }
}

// ── Fallback logic helpers ────────────────────────────────────────────────────

function detectRisk(text: string): "High" | "Medium" | "Low" {
  const lower = text.toLowerCase();
  if (lower.includes("payment") || lower.includes("billing") || lower.includes("credit card")) return "High";
  if (lower.includes("login") || lower.includes("auth") || lower.includes("password") || lower.includes("signup")) return "Medium";
  return "Low";
}

function assessEffort(description: string): "High" | "Medium" | "Low" {
  const len = description.trim().length;
  if (len > 150) return "High";
  if (len > 50)  return "Medium";
  return "Low";
}

function derivePriority(
  effort: "High" | "Medium" | "Low",
  risk:   "High" | "Medium" | "Low",
): "High" | "Medium" | "Low" {
  if (effort === "High" || risk === "High") return "High";
  if (effort === "Medium" || risk === "Medium") return "Medium";
  return "Low";
}

const TASK_TEMPLATES = [
  { name: "Design UI",              baseEffort: "Low"    as const },
  { name: "Build API",              baseEffort: "Medium" as const },
  { name: "Frontend Integration",   baseEffort: "Medium" as const },
  { name: "Write Tests",            baseEffort: "Low"    as const },
  { name: "QA & Review",            baseEffort: "Low"    as const },
];

interface PRD {
  problem:  string;
  goals:    string;
  personas: string;
  useCases: string[];
  metrics:  string[];
}

function buildPRD(title: string, description: string, users: string, goal: string): PRD {
  const audience    = users || "users";
  const problem     = `${description.trim()} This gap currently affects ${audience}, making it harder for them to ${goal || "get the most out of the product"}.`;
  const goals       = `Deliver "${title}" so that ${audience} can ${goal || "accomplish their tasks more effectively"}. The feature should be reliable, intuitive, and accessible from day one.`;
  const personaList = users ? users.split(/,|and/).map((u) => u.trim()).filter(Boolean) : ["General product users"];
  const personas    = personaList.map((p) => `${p.charAt(0).toUpperCase()}${p.slice(1)} — who need ${title.toLowerCase()} to improve their workflow.`).join(" ");
  const useCases: string[] = [
    `A ${personaList[0] || "user"} can access and use "${title}" directly from the main interface.`,
    `The system processes the "${title}" feature correctly under normal and edge-case conditions.`,
    `${personaList.length > 1 ? `A ${personaList[1]}` : "An admin or power user"} can configure or manage "${title}" settings according to their needs.`,
  ];
  const goalLower = goal.toLowerCase();
  let metrics: string[];
  if (goalLower.includes("retention") || goalLower.includes("churn")) {
    metrics = ["7-day user retention increases by ≥ 10% within 60 days of launch.", "Churn rate decreases by at least 5% quarter-over-quarter.", `Feature adoption rate reaches 30%+ of ${audience} within the first 30 days.`];
  } else if (goalLower.includes("engagement") || goalLower.includes("active")) {
    metrics = ["Daily active usage of the feature exceeds 25% of the total user base.", "Average session duration increases by 15% after launch.", "User satisfaction score (CSAT) for the feature is ≥ 4.2 / 5."];
  } else if (goalLower.includes("revenue") || goalLower.includes("conversion") || goalLower.includes("monetis")) {
    metrics = ["Conversion rate improves by ≥ 5% within the first quarter post-launch.", "Monthly recurring revenue (MRR) grows by 8–12% attributable to the feature.", "Average revenue per user (ARPU) increases by 7%."];
  } else if (goalLower.includes("speed") || goalLower.includes("performance") || goalLower.includes("latency")) {
    metrics = ["Feature response time is under 200ms at the 95th percentile.", "Page load time reduced by ≥ 30% compared to the current baseline.", "System uptime for the feature remains ≥ 99.9%."];
  } else if (goalLower.includes("ux") || goalLower.includes("experience") || goalLower.includes("satisfaction")) {
    metrics = ["Net Promoter Score (NPS) increases by ≥ 8 points after launch.", "Support tickets related to this workflow decrease by 20%.", "Task completion rate for the primary use case reaches ≥ 90%."];
  } else {
    metrics = [`Feature adoption rate reaches ≥ 30% of ${audience} within 30 days.`, "User satisfaction score for the feature is ≥ 4 / 5 in post-launch surveys.", "Zero critical bugs reported within the first two weeks after release."];
  }
  return { problem, goals, personas, useCases, metrics };
}

// ── POST /generate ────────────────────────────────────────────────────────────

router.post("/generate", async (req: Request, res: Response) => {
  const { title, description, users, goal } = req.body as {
    title?:       string;
    description?: string;
    users?:       string;
    goal?:        string;
  };

  logger.info({ title, users, goal }, "POST /generate — request received");

  if (!title?.trim() || !description?.trim()) {
    logger.warn("Validation failed: title or description missing");
    return res.status(400).json({ error: "Both 'title' and 'description' are required." });
  }

  try {
    const risk   = detectRisk(description);
    const effort = assessEffort(description);

    const groqResult = await callGroq(title, description, users ?? "", goal ?? "");

    let prd:      string | PRD;
    let items:    { task?: string; name?: string; sprint?: number; effort: string; priority: string; risk: string }[];
    let groqInsights: string[];

    if (groqResult) {
      prd          = groqResult.prd;
      groqInsights = groqResult.insights;
      items        = groqResult.tasks.map((t, i) => ({
        task:     t.name,
        sprint:   i < 2 ? 1 : i < 4 ? 2 : 3,
        effort:   t.effort,
        priority: derivePriority(t.effort, risk),
        risk,
      }));
    } else {
      console.log("[Groq] Using fallback logic layer");
      groqInsights = [];
      prd          = buildPRD(title, description, users ?? "", goal ?? "");
      items        = TASK_TEMPLATES.map((t) => {
        const taskEffort: "High" | "Medium" | "Low" =
          effort === "High" && t.baseEffort !== "Low" ? "High" : t.baseEffort;
        const priority = derivePriority(taskEffort, risk);
        return { task: t.name, sprint: 1, effort: taskEffort, priority, risk };
      });
    }

    const summary  = `Feature: "${title}" targeting ${users || "all users"} with the goal of ${goal || "improving the product"}.`;
    const insights: string[] = [
      ...groqInsights,
      `Overall effort assessed as ${effort} based on feature complexity.`,
      `Risk level is ${risk}${risk === "High" ? " — security review recommended before release" : risk === "Medium" ? " — extra care needed around authentication flows" : " — standard development process applies"}.`,
      `${items.filter((i) => i.priority === "High").length} of ${items.length} tasks are high priority.`,
      ...(users ? [`Target audience: ${users}.`] : ["No specific target users defined."]),
    ];
    const metadata = { priority: derivePriority(effort, risk), risk, effort };

    await db.insert(workflowsTable).values({
      featureTitle: title.trim(),
      description:  description.trim(),
      targetUsers:  users?.trim()  ?? "",
      businessGoal: goal?.trim()   ?? "",
      summary,
      prd,
      items,
      insights,
      metadata,
    });

    console.log("[Supabase] Saving workflow to Supabase...");
    const { error: supabaseError } = await supabase.from("workflows").insert({
      title:       title.trim(),
      description: description.trim(),
      users:       users?.trim()  ?? "",
      goal:        goal?.trim()   ?? "",
      output:      { summary, prd, items, insights, metadata },
      created_at:  new Date().toISOString(),
    });

    if (supabaseError) {
      console.error("[Supabase] Error saving workflow:", supabaseError.message);
    } else {
      console.log("[Supabase] Workflow saved successfully.");
    }

    logger.info({ taskCount: items.length, risk, effort, groq: !!groqResult }, "POST /generate — saved and responded");
    return res.json({ summary, prd, items, insights, metadata });
  } catch (err) {
    logger.error({ err }, "POST /generate — unexpected error");
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
