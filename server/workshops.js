import { Router } from "express";
import sql from "./db.js";

const router = Router();

// 1. جلب قائمة الورش التدريبية
router.get("/workshops", async (_req, res) => {
  try {
    const workshops = await sql`
      SELECT * FROM workshops 
      ORDER BY date ASC
    `;
    res.json(workshops);
  } catch (error) {
    console.error("خطأ في جلب الورش:", error);
    res.status(500).json({ error: "فشل في تحميل الورش التدريبية" });
  }
});

// 2. التسجيل في ورشة تدريبية
router.post("/workshops/:id/register", async (req, res) => {
  const workshopId = req.params.id;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "معرف المستخدم مطلوب للتسجيل" });
  }

  try {
    // التحقق من وجود الورشة
    const [workshop] = await sql`SELECT * FROM workshops WHERE id = ${workshopId}`;
    if (!workshop) {
      return res.status(404).json({ error: "الورشة غير موجودة" });
    }

    // تسجيل المستخدم (نفترض وجود جدول للارتباط)
    await sql`
      INSERT INTO workshop_registrations (workshop_id, user_id)
      VALUES (${workshopId}, ${userId})
    `;

    res.json({ message: "تم التسجيل في الورشة بنجاح" });
  } catch (error) {
    console.error("خطأ في التسجيل:", error);
    res.status(500).json({ error: "فشل في عملية التسجيل" });
  }
});

export default router;
