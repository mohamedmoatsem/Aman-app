import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/workshops", async (_req, res) => {
  try {
    const result = await db.execute(sql`
      SELECT id, title, description, date, instructor, created_at
      FROM workshops
      ORDER BY date ASC
      LIMIT 50
    `);
    res.json(result.rows ?? []);
  } catch (err: any) {
    console.error("[workshops GET] error:", err?.message);
    res.status(500).json({ error: "Failed to fetch workshops" });
  }
});

export default router;
