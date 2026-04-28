import { Router, type IRouter, type Request, type Response } from "express";
import { db, workflowsTable } from "@workspace/db";
import { desc, eq } from "drizzle-orm";
import { logger } from "../lib/logger";
import { supabase } from "../lib/supabase";

const router: IRouter = Router();

// GET /history — fetch all records from Supabase (newest first)
router.get("/history", async (_req: Request, res: Response) => {
  console.log("[Supabase] GET /history — fetching records from Supabase...");
  try {
    const { data, error } = await supabase
      .from("workflows")
      .select("title, description, users, goal, output, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[Supabase] GET /history — error:", error.message);
      return res.status(500).json({ error: "Failed to fetch history" });
    }

    console.log(`[Supabase] GET /history — returned ${data.length} record(s)`);
    return res.json(data);
  } catch (err) {
    console.error("[Supabase] GET /history — unexpected error:", err);
    return res.status(500).json({ error: "Failed to fetch history" });
  }
});

// GET /history/:id — retrieve one record by ID
router.get("/history/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  logger.info({ id }, "GET /history/:id");
  try {
    const rows = await db
      .select()
      .from(workflowsTable)
      .where(eq(workflowsTable.id, id))
      .limit(1);

    if (rows.length === 0) return res.status(404).json({ error: "Record not found" });
    return res.json(rows[0]);
  } catch (err) {
    logger.error({ err }, "GET /history/:id — error");
    return res.status(500).json({ error: "Failed to fetch record" });
  }
});

export default router;
