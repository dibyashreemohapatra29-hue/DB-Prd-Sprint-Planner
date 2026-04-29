import { Router, type IRouter, type Request, type Response } from "express";
import { db, workflowsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { logger } from "../lib/logger";
import { supabase } from "../lib/supabase";

const router: IRouter = Router();

// GET /history — fetch all records from Supabase (newest first)
router.get("/history", async (_req: Request, res: Response) => {
  logger.info("GET /history — fetching records from Supabase");
  try {
    const { data, error } = await supabase
      .from("workflows")
      .select("id, title, description, users, goal, output, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      logger.error({ err: error.message }, "GET /history — error");
      return res.status(500).json({ error: "Failed to fetch history" });
    }

    logger.info({ count: data.length }, "GET /history — returned records");
    return res.json(data);
  } catch (err) {
    logger.error({ err }, "GET /history — unexpected error");
    return res.status(500).json({ error: "Failed to fetch history" });
  }
});

// DELETE /workflow/:id — delete a workflow by ID
router.delete("/workflow/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  logger.info({ id }, "DELETE /workflow/:id");

  if (!id) {
    return res.status(400).json({ error: "Missing workflow id" });
  }

  try {
    const { error } = await supabase
      .from("workflows")
      .delete()
      .eq("id", id);

    if (error) {
      logger.error({ err: error.message, id }, "DELETE /workflow/:id — error");
      return res.status(500).json({ error: "Failed to delete workflow" });
    }

    logger.info({ id }, "DELETE /workflow/:id — deleted");
    return res.status(200).json({ success: true });
  } catch (err) {
    logger.error({ err, id }, "DELETE /workflow/:id — unexpected error");
    return res.status(500).json({ error: "Failed to delete workflow" });
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
