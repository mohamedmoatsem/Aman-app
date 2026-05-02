import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/community", async (_req, res) => {
  try {
    const result = await db.execute(sql`
      SELECT id, title, content, created_at
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

    const result = await db.execute(sql`
      INSERT INTO community_posts (title, content)
      VALUES (${title}, ${content})
      RETURNING id, title, content, created_at
    `);

    res.status(201).json(result.rows?.[0] ?? {});
  } catch (err: any) {
    console.error("[community POST] error:", err?.message);
    res.status(500).json({ error: "Failed to create community post" });
  }
});

export default router;
