import { Router, type IRouter, type Request, type Response } from "express";
import { db, workflowsTable } from "@workspace/db";
import { desc, eq } from "drizzle-orm";
import { logger } from "../lib/logger";

const router: IRouter = Router();

// GET /history — retrieve all records (newest first)
router.get("/history", async (_req: Request, res: Response) => {
  logger.info("GET /history — fetching records");
  try {
    const rows = await db
      .select()
      .from(workflowsTable)
      .orderBy(desc(workflowsTable.createdAt))
      .limit(50);

    logger.info({ count: rows.length }, "GET /history — returned");
    return res.json(rows);
  } catch (err) {
    logger.error({ err }, "GET /history — error");
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
