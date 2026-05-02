import { Router, type IRouter } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router: IRouter = Router();

const GEMINI_API_KEY = process.env.Gemini_API_KEY ?? process.env.GEMINI_API_KEY ?? "";
const MODEL_NAME = "gemma-4-26b-a4b-it";

const SYSTEM_PROMPT = `أنت مساعد نفسي اسمه "أمان" - رفيق دافئ يتحدث باللهجة السودانية بشكل طبيعي.

خصائصك الجوهرية:
- تتحدث بالعربية السودانية الدارجة الدافئة والأصيلة
- تستمع بعمق وتتعاطف بصدق قبل أن تقترح أي شيء
- تستخدم تقنيات CBT و DBT بشكل خفي ومدروس دون أن تُسميها
- تدعم المستخدم نفسياً في سياق الأزمات السودانية (الحرب، التهجير، الصدمة، الفقدان)
- إذا ذكر المستخدم أفكاراً انتحارية أو إيذاء النفس، تُبدي تعاطفاً شديداً وتُحوّله بلطف لخط نجدة

نماذج من أسلوبك:
- "والله يا صاحبي، اللي بتحس بيه دا طبيعي جداً..."
- "خبّرني أكثر، أنا سامعك كويس..."
- "ياخي، دا تقيل شوية - كيف حالك النهارده بالضبط؟"
- "أمان هنا معاك، ما تخاف"

تقنيات EMDR للصدمة:
- "فراشة هاق" (Butterfly Hug): "ضع يديك على كتفيك وافعل هكذا... زقزق باليمين ثم اليسار"
- مكان الأمان: "تخيل مكان بتحس فيه بالراحة التامة... وصّفه لي"
- تقنية 5-4-3-2-1: "سمّيلي 5 أشياء بتشوفها دلوقتي..."

ردودك قصيرة وصادقة (2-4 جمل عادةً)، تبتعد عن الكلام المكرر أو المتكلّف.`;

// تنظيف رد النموذج: إزالة التفكير الداخلي والاحتفاظ بالرد الفعلي فقط
function extractFinalReply(raw: string): string {
  // إزالة أي كتلة <think>...</think> إن وجدت
  const noThink = raw.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

  // قسّم على أسطر مزدوجة، خذ آخر فقرة غير فارغة
  const paragraphs = noThink.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  if (!paragraphs.length) return noThink;

  // إذا كانت آخر فقرة تبدأ بعلامات تعداد أو إنجليزية — خذ من قبلها
  const last = paragraphs[paragraphs.length - 1];
  const isBulletOrEnglish = /^[*\-•]|^[A-Za-z]/.test(last);

  if (!isBulletOrEnglish) return last;

  // ابحث عن آخر فقرة تحتوي على عربية
  for (let i = paragraphs.length - 1; i >= 0; i--) {
    if (/[\u0600-\u06FF]/.test(paragraphs[i]) && !/^[*\-•]/.test(paragraphs[i])) {
      return paragraphs[i].replace(/^[""\s]+|[""\s]+$/g, "").trim();
    }
  }

  return noThink.replace(/^[""\s]+|[""\s]+$/g, "").trim();
}

router.post("/", async (req, res) => {
  try {
    const { message, history } = req.body as {
      message: string;
      history?: { role: "user" | "model"; parts: { text: string }[] }[];
    };

    if (!message?.trim()) {
      return res.status(400).json({ error: "الرسالة فارغة" });
    }

    if (!GEMINI_API_KEY) {
      return res.status(503).json({ error: "مفتاح الذكاء الاصطناعي غير مضبوط" });
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction: SYSTEM_PROMPT,
    });

    const chatSession = model.startChat({
      history: (history ?? []).map((h) => ({
        role: h.role,
        parts: h.parts,
      })),
      generationConfig: {
        temperature: 0.85,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 512,
      },
    });

    const result = await chatSession.sendMessage(message);
    const rawReply = result.response.text();

    // استخرج الرد الفعلي: آخر فقرة أو الجزء العربي الأخير
    const reply = extractFinalReply(rawReply);

    return res.json({ reply });
  } catch (err: any) {
    console.error("[chat] error:", err?.message || err);
    return res.status(500).json({ error: "المساعد غير متاح الآن، حاول مرة ثانية" });
  }
});

export default router;
