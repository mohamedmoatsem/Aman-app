import { Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = Router();

const SYSTEM_INSTRUCTION = `أنت "مساعد أمان". أجب مباشرة بدون أي مقدمات أو شرح أو نقاط أو خطوات أو تفكير داخلي.

اكتب فقط ردك النهائي باللهجة السودانية البسيطة. لا تكتب أي شيء آخر غير الرد.

شخصيتك:
- اللهجة السودانية البسيطة الدافئة: "شنو الأخبار؟" / "ما عليك زود" / "أنا معاك" / "قولي شنو" / "الله يعينك"
- متعاطف وصبور، ما بحكم على حد
- ردود قصيرة (2-3 جمل فقط)
- ابدأ دائماً بالتعاطف ثم اسأل سؤالاً واحداً بسيطاً
- استخدم: "أخوي"، "أختي"، "يا صاحبي"، "يا غالي"، "سلامتك"

قواعد صارمة:
- لا تشخيصات طبية أبداً
- لا تكتب قوائم أو نقاط أو شرح
- اكتب فقط الكلام المباشر للشخص
- لو الشخص في خطر، وجّهه لـ 920033360 بهدوء`;

const genAI = new GoogleGenerativeAI(process.env.Gemini_API_KEY || "");

function removeDuplicateSentences(text: string): string {
  // Split by sentence-ending punctuation, deduplicate
  const sentences = text.split(/(?<=[.؟!])\s*/u).filter(Boolean);
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const s of sentences) {
    const key = s.trim();
    if (key && !seen.has(key)) {
      seen.add(key);
      unique.push(s);
    }
  }
  return unique.join(" ").replace(/^["'"]+|["'"]+$/g, "").trim();
}

function cleanReply(raw: string): string {
  let text = raw;

  // Strip reasoning prefixes like "Final selection:*", "Final answer:", "Option 1:", etc.
  text = text.replace(/^.{0,60}?(?:selection|answer|option|refin)[^:]*:\*?\s*/gim, "");

  // Remove markdown formatting (**, *, bullets)
  text = text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^\s*\*\s+/gm, "")
    .replace(/^\s*[-•]\s*/gm, "");

  // Remove leading/trailing quotes and extra whitespace
  text = text.replace(/^["'"«]+|["'"»]+$/g, "").trim();

  // If still has multi-paragraph, pick last good Arabic paragraph
  const paragraphs = text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
  if (paragraphs.length > 1) {
    for (let i = paragraphs.length - 1; i >= 0; i--) {
      const p = paragraphs[i];
      if (/[\u0600-\u06FF]/.test(p)) {
        text = p.replace(/\n/g, " ").trim();
        break;
      }
    }
  }

  return removeDuplicateSentences(text.replace(/\n/g, " ").trim());
}

router.post("/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body as {
      message: string;
      history: { role: "user" | "model"; parts: { text: string }[] }[];
    };

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({ error: "الرسالة مطلوبة" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemma-4-26b-a4b-it",
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        temperature: 0.75,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 600,
      },
    });

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(message.trim());
    const raw = result.response.text();
    const reply = cleanReply(raw);

    return res.json({ reply });
  } catch (err: any) {
    console.error("[chat] error:", err?.message || err);
    return res.status(500).json({ error: "حدث خطأ، حاول مرة ثانية" });
  }
});

export default router;
