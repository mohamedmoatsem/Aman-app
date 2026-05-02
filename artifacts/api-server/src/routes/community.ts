import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

// ── Run once: ensure author_name column exists ────────────────────────────────
async function ensureSchema() {
  try {
    await db.execute(sql`
      ALTER TABLE community_posts
      ADD COLUMN IF NOT EXISTS author_name TEXT NOT NULL DEFAULT 'مجهول'
    `);
    // Clean up any accidental test posts with single-char titles
    await db.execute(sql`
      DELETE FROM community_posts WHERE length(title) < 3 OR length(content) < 10
    `);
  } catch (err: any) {
    console.warn("[community] schema migration warning:", err?.message);
  }
}
ensureSchema();

// ── GET /community ────────────────────────────────────────────────────────────
router.get("/community", async (_req, res) => {
  try {
    const result = await db.execute(sql`
      SELECT
        id,
        title,
        content,
        author_name  AS "authorName",
        created_at   AS "createdAt"
      FROM community_posts
      ORDER BY created_at DESC
      LIMIT 50
    `);
    res.json(result.rows ?? []);
  } catch (err: any) {
    console.error("[community GET] error:", err?.message);
    res.status(500).json({ error: "Failed to fetch community posts" });
  }
});

// ── POST /community ───────────────────────────────────────────────────────────
router.post("/community", async (req, res) => {
  try {
    const { title, content, authorName } = req.body as {
      title: string;
      content: string;
      authorName: string;
    };

    if (!title?.trim() || !content?.trim() || !authorName?.trim()) {
      return res.status(400).json({ error: "البيانات ناقصة" });
    }
    if (title.trim().length < 3) {
      return res.status(400).json({ error: "العنوان قصير جداً" });
    }
    if (content.trim().length < 10) {
      return res.status(400).json({ error: "المحتوى قصير جداً" });
    }

    const result = await db.execute(sql`
      INSERT INTO community_posts (title, content, author_name)
      VALUES (${title.trim()}, ${content.trim()}, ${authorName.trim()})
      RETURNING
        id,
        title,
        content,
        author_name AS "authorName",
        created_at  AS "createdAt"
    `);

    res.status(201).json(result.rows?.[0] ?? {});
  } catch (err: any) {
    console.error("[community POST] error:", err?.message);
    res.status(500).json({ error: "Failed to create community post" });
  }
});

export default router;
