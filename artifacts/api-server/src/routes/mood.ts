import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

const MOOD_SCORES: Record<number, number> = { 0: 1, 1: 2, 2: 3, 3: 5 };

// Ensure columns exist (run once silently)
async function ensureSchema() {
  try {
    await db.execute(sql`
      ALTER TABLE mood_logs
        ADD COLUMN IF NOT EXISTS mood_index INTEGER,
        ADD COLUMN IF NOT EXISTS mood_label TEXT
    `);
  } catch {
    // Ignore — columns may already exist
  }
}
ensureSchema();

router.post("/mood", async (req, res) => {
  try {
    const { userId, moodIndex, moodLabel } = req.body as {
      userId: string;
      moodIndex: number;
      moodLabel: string;
    };

    if (!userId || typeof moodIndex !== "number" || moodIndex < 0 || moodIndex > 3) {
      return res.status(400).json({ error: "بيانات غير صحيحة" });
    }

    const score = MOOD_SCORES[moodIndex] ?? 3;

    // Check if already logged today
    const existing = await db.execute(sql`
      SELECT id FROM mood_logs
      WHERE user_id = ${userId}
        AND log_date::date = CURRENT_DATE
      LIMIT 1
    `);

    if (existing.rows?.length > 0) {
      const id = (existing.rows[0] as any).id;
      await db.execute(sql`
        UPDATE mood_logs
        SET score = ${score}, mood_index = ${moodIndex}, mood_label = ${moodLabel ?? ""}
        WHERE id = ${id}
      `);
      return res.status(200).json({ updated: true });
    }

    const result = await db.execute(sql`
      INSERT INTO mood_logs (user_id, score, mood_index, mood_label)
      VALUES (${userId}, ${score}, ${moodIndex}, ${moodLabel ?? ""})
      RETURNING id, user_id, score, log_date
    `);

    return res.status(201).json({ log: result.rows?.[0], updated: false });
  } catch (err: any) {
    console.error("[mood] error:", err?.message || err);
    return res.status(500).json({ error: "حدث خطأ، حاول مرة ثانية" });
  }
});

router.get("/mood/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "userId مطلوب" });

    const result = await db.execute(sql`
      SELECT id, user_id AS "userId", score, mood_index AS "moodIndex",
             mood_label AS "moodLabel", log_date AS "logDate"
      FROM mood_logs
      WHERE user_id = ${userId}
      ORDER BY log_date DESC
      LIMIT 30
    `);

    return res.json({ logs: result.rows ?? [] });
  } catch (err: any) {
    console.error("[mood/history] error:", err?.message || err);
    return res.status(500).json({ error: "حدث خطأ" });
  }
});

export default router;
