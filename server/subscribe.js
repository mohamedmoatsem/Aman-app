import { Router } from "express";
import sql from "./db.js";

const router = Router();

// مسار تسجيل بريد إلكتروني جديد
// ملاحظة: غيرنا المسار من "/subscribe" إلى "/" لمنع التكرار
router.post("/", async (req, res) => {
  const { email } = req.body;

  // 1. تحقق بسيط من وجود البريد وصحته
  if (!email || !email.includes('@')) {
    return res.status(400).json({ 
      error: "يرجى إدخال بريد إلكتروني صحيح" 
    });
  }

  try {
    // 2. التحقق مما إذا كان البريد مسجلاً مسبقاً
    const existing = await sql`
      SELECT * FROM subscriptions WHERE email = ${email}
    `;

    if (existing.length > 0) {
      return res.status(400).json({ 
        error: "هذا البريد مسجل لدينا بالفعل" 
      });
    }

    // 3. إدراج البريد الجديد في قاعدة البيانات
    const [subscription] = await sql`
      INSERT INTO subscriptions (email) 
      VALUES (${email}) 
      RETURNING *
    `;

    res.status(201).json({
      message: "تم الاشتراك بنجاح في قائمة أمان البريدية",
      data: subscription
    });

  } catch (error) {
    console.error("خطأ في عملية الاشتراك:", error.message);
    res.status(500).json({ 
      error: "فشل في تسجيل الاشتراك حالياً، يرجى المحاولة لاحقاً" 
    });
  }
});

export default router;
