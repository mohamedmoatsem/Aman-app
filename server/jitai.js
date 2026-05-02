import { Router } from "express";
import sql from "./db.js";

const router = Router();

// 1. جلب التدخلات النفسية المتاحة للمستخدم
router.get("/jitai/interventions", async (req, res) => {
  try {
    const interventions = await sql`
      SELECT * FROM jitai_interventions 
      WHERE active = true
      ORDER BY priority DESC
    `;
    res.json(interventions);
  } catch (error) {
    console.error("خطأ في جلب التدخلات:", error);
    res.status(500).json({ error: "فشل في تحميل التدخلات النفسية" });
  }
});

// 2. تسجيل استجابة المستخدم لتدخل معين
router.post("/jitai/respond", async (req, res) => {
  const { interventionId, userId, response } = req.body;

  if (!interventionId || !response) {
    return res.status(400).json({ error: "البيانات ناقصة" });
  }

  try {
    const [log] = await sql`
      INSERT INTO jitai_responses (intervention_id, user_id, response)
      VALUES (${interventionId}, ${userId || null}, ${response})
      RETURNING *
    `;
    res.status(201).json(log);
  } catch (error) {
    console.error("خطأ في تسجيل الاستجابة:", error);
    res.status(500).json({ error: "فشل في حفظ استجابة المستخدم" });
  }
});

export default router;
