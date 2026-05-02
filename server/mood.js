import { Router } from "express";
import sql from "./db.js";

const router = Router();

// 1. تسجيل حالة مزاجية جديدة
router.post("/mood", async (req, res) => {
  const { mood, note, userId } = req.body;

  if (!mood) {
    return res.status(400).json({ error: "الحالة المزاجية مطلوبة" });
  }

  try {
    const [newEntry] = await sql`
      INSERT INTO mood_entries (user_id, mood, note)
      VALUES (${userId || null}, ${mood}, ${note || ''})
      RETURNING *
    `;
    res.status(201).json(newEntry);
  } catch (error) {
    console.error("خطأ في تسجيل المزاج:", error);
    res.status(500).json({ error: "فشل في حفظ الحالة المزاجية" });
  }
});

// 2. جلب تاريخ المزاج لمستخدم معين
router.get("/mood/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const entries = await sql`
      SELECT * FROM mood_entries 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT 30
    `;
    res.json(entries);
  } catch (error) {
    console.error("خطأ في جلب سجل المزاج:", error);
    res.status(500).json({ error: "فشل في تحميل سجل المزاج" });
  }
});

export default router;
