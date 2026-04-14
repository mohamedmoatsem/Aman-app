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
  // Split into lines and remove any line that starts with English words
  // (these are internal reasoning lines like "Final Polish:", "Option 1:", etc.)
  const lines = raw.split("\n").filter((line) => {
    const trimmed = line.trim();
    if (!trimmed) return false;
    // Drop lines starting with ASCII letters (English reasoning)
    if (/^[A-Za-z*]/.test(trimmed)) return false;
    // Drop lines that are mostly English
    const arabicChars = (trimmed.match(/[\u0600-\u06FF]/g) || []).length;
    const totalChars = trimmed.replace(/\s/g, "").length;
    if (totalChars > 0 && arabicChars / totalChars < 0.3) return false;
    return true;
  });

  let text = lines.join(" ").trim();

  // Remove markdown formatting
  text = text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^\s*[-•*]\s+/gm, "");

  // Remove leading/trailing quotes
  text = text.replace(/^["'"«\s]+|["'"»\s]+$/g, "").trim();

  return removeDuplicateSentences(text);
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

    // Gemini requires history to start with 'user' and alternate user/model
    // Remove any leading 'model' turns and ensure alternation
    let cleanHistory = history.filter(
      (h) => h.parts?.length > 0 && h.parts[0]?.text?.trim()
    );
    // Drop leading model messages
    while (cleanHistory.length > 0 && cleanHistory[0].role === "model") {
      cleanHistory = cleanHistory.slice(1);
    }
    // Ensure strict alternation (drop consecutive same-role entries)
    const validHistory: typeof cleanHistory = [];
    for (const turn of cleanHistory) {
      const last = validHistory[validHistory.length - 1];
      if (!last || last.role !== turn.role) {
        validHistory.push(turn);
      }
    }

    const chat = model.startChat({ history: validHistory });
    const result = await chat.sendMessage(message.trim());

    // For thinking models (Gemma 4), extract only non-thought parts
    let raw = "";
    const candidate = result.response.candidates?.[0];
    if (candidate?.content?.parts) {
      const nonThoughtParts = candidate.content.parts.filter(
        (p: any) => !p.thought && p.text
      );
      raw = nonThoughtParts.length > 0
        ? nonThoughtParts.map((p: any) => p.text).join(" ")
        : result.response.text();
    } else {
      raw = result.response.text();
    }

    const reply = cleanReply(raw);

    return res.json({ reply });
  } catch (err: any) {
    console.error("[chat] error:", err?.message || err);
    return res.status(500).json({ error: "حدث خطأ، حاول مرة ثانية" });
  }
});

export default router;
