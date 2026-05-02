import { Router } from "express";
import sql from "./db.js"; // استدعاء مباشر وصحيح للملف المحلي

const router = Router();

// 1. جلب كافة المنشورات من المجتمع
router.get("/community", async (req, res) => {
  try {
    // استعلام مباشر من قاعدة البيانات وترتيبها حسب الأحدث
    const posts = await sql`
      SELECT * FROM community_posts 
      ORDER BY created_at DESC
    `;
    res.json(posts);
  } catch (error) {
    console.error("خطأ في جلب المنشورات:", error);
    res.status(500).json({ error: "فشل في تحميل منشورات المجتمع" });
  }
});

// 2. إضافة منشور جديد للمجتمع
router.post("/community", async (req, res) => {
  const { title, content, authorId } = req.body;

  // تحقق بسيط من البيانات المدخلة
  if (!title || !content) {
    return res.status(400).json({ error: "العنوان والمحتوى مطلوبان" });
  }

  try {
    const [newPost] = await sql`
      INSERT INTO community_posts (title, content, author_id)
      VALUES (${title}, ${content}, ${authorId || null})
      RETURNING *
    `;
    res.status(201).json(newPost);
  } catch (error) {
    console.error("خطأ في إنشاء المنشور:", error);
    res.status(500).json({ error: "فشل في إضافة المنشور للمجتمع" });
  }
});

export default router;
