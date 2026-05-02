import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.post("/", async (req, res) => {
  const { email } = req.body as { email: string };

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "يرجى إدخال بريد إلكتروني صحيح" });
  }

  try {
    const existing = await db.execute(sql`
      SELECT id FROM subscriptions WHERE email = ${email} LIMIT 1
    `);

    if ((existing.rows ?? []).length > 0) {
      return res.status(409).json({ error: "هذا البريد مسجل لدينا بالفعل" });
    }

    const result = await db.execute(sql`
      INSERT INTO subscriptions (email) VALUES (${email}) RETURNING *
    `);

    return res.status(201).json({
      message: "تم الاشتراك بنجاح في قائمة أمان البريدية",
      data: result.rows?.[0],
    });
  } catch (err: any) {
    console.error("[subscribe] error:", err?.message);
    return res.status(500).json({ error: "فشل في تسجيل الاشتراك، يرجى المحاولة لاحقاً" });
  }
});

export default router;
