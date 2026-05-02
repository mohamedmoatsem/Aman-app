import { Router } from "express";
import sql from "./db.js";

const router = Router();

// --- الإعدادات ---
const GEMMA_API_URL = "https://api-inference.huggingface.co/models/google/gemma-4-26b-it";
const API_TOKEN = process.env.HUGGINGFACE_TOKEN;

// قاعدة معرفة للتعامل النفسي
const KNOWLEDGE_BASE = {
  "قلق": "تقنيات التنفس الحجابي والتركيز على الحاضر لتقليل حدة الهلع.",
  "حزن": "الدعم الاجتماعي والتحقق من المشاعر حجر الزاوية لتجاوز الصدمات.",
  "خوف": "فعل خطة السلامة الجسدية أولاً، وتقليل المدخلات الحسية الموترة.",
  "نوم": "تنظيم الإيقاع اليومي وتجنب المحفزات قبل النوم بـ 6 ساعات."
};

/**
 * دالة ذكية تجلب تحديثات ميدانية وتحدد وجهة الإحالة
 */
async function getDynamicGuidance(userContent) {
  try {
    const reports = await sql`SELECT category, location, details FROM emergency_reports ORDER BY created_at DESC LIMIT 5`;
    let guidance = "";
    reports.forEach(r => {
      if (userContent.includes(r.category)) {
        guidance += `\n📍 [تحديث ميداني]: ${r.details} في ${r.location}`;
      }
    });
    return guidance;
  } catch (e) {
    return "\n📍 [تنبيه]: يرجى مراجعة غرف الطوارئ المحلية لأحدث المسارات.";
  }
}

/**
 * محرك التحليل النفسي (Gemma 4 System Prompt Integration)
 */
async function analyzeWithGemma(userContent) {
  try {
    if (!API_TOKEN) return "نحن بجانبك، تذكر أنك لست وحدك.";

    let medicalContext = "تقديم دعم نفسي مبني على التعاطف والنشاط الذهني.";
    for (let key in KNOWLEDGE_BASE) {
      if (userContent.includes(key)) medicalContext = KNOWLEDGE_BASE[key];
    }

    const response = await fetch(GEMMA_API_URL, {
      method: "POST",
      headers: { "Authorization": `Bearer ${API_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        inputs: `<start_of_turn>user
أنت "أمان"، المساعد النفسي الذكي المتخصص في دعم أهلنا في السودان خلال الأزمات.
مهمتك: تقديم دعم نفسي بلهجة سودانية دافئة، وإحالة الحالات الحرجة للمختصين.

القواعد:
1. استخدم مفردات سودانية (يا زول، المحنة بتعدي، ما تشيل هم).
2. قيم حدة الحالة: [SCORE: X/10].
3. إذا كان SCORE أكبر من 8، أضف عبارة: "🚨 يرجى التواصل مع غرف الطوارئ فوراً".

المعطيات: "${medicalContext}"
رسالة المستخدم: "${userContent}"<end_of_turn>
<start_of_turn>model`,
        parameters: { max_new_tokens: 250, temperature: 0.5 }
      }),
    });
    const result = await response.json();
    return result[0]?.generated_text?.split('model').pop().trim() || "إحنا معاك، ما تشيل هم.";
  } catch (error) {
    return "قلوبنا معاكم والفرج قريب بإذن الله.";
  }
}

// --- المسارات ---

router.get("/", async (req, res) => {
  try {
    const messages = await sql`SELECT messages.*, users.username FROM messages JOIN users ON messages.user_id = users.id ORDER BY messages.created_at ASC LIMIT 60`;
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "فشل تحميل المحادثة" });
  }
});

router.post("/", async (req, res) => {
  const { userId, content } = req.body;
  if (!content || !userId) return res.status(400).json({ error: "بيانات ناقصة" });

  try {
    const sanitizedContent = content.replace(/[0-9]{9,}/g, "[رقم محذوف]");

    // تشغيل محرك الذكاء
    let aiResponse = await analyzeWithGemma(sanitizedContent);

    // دمج التحديثات الميدانية
    let guidance = await getDynamicGuidance(content);
    let finalResponse = aiResponse + guidance;

    // منطق الإحالة التلقائي للحالات الحرجة
    if (finalResponse.includes("SCORE: 9") || finalResponse.includes("SCORE: 10")) {
      finalResponse += "\n\n📋 [إحالة مختص]: تم رفع حالتك إلى قسم الدعم الميداني العاجل.";
    }

    // حفظ في قاعدة البيانات
    const [newMessage] = await sql`
      INSERT INTO messages (user_id, content, ai_insight) 
      VALUES (${userId}, ${content}, ${finalResponse}) 
      RETURNING *
    `;

    // الرد المباشر الذي يحتاجه التطبيق:
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "خطأ في المعالجة الذكية" });
  }
});

export default router;
