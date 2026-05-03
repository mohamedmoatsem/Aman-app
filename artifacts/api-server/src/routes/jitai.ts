import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

const LOW_MOOD_THRESHOLD = 2;
const CONSECUTIVE_DAYS_REQUIRED = 3;

const INTERVENTIONS = [
  {
    id: "chat",
    titleAr: "تحدث مع مساعد أمان",
    titleEn: "Talk to Amān Assistant",
    messageAr: "لاحظنا أنك تمر بوقت صعب هذه الأيام. مساعد أمان هنا يسمعك بدون أي حكم.",
    messageEn: "We noticed you've been having a difficult time lately. Amān Assistant is here to listen — no judgement, no pressure.",
    actionAr: "ابدأ المحادثة",
    actionEn: "Start chatting",
    actionPath: "/chat",
    icon: "🌿",
    color: "emerald",
  },
  {
    id: "breathing",
    titleAr: "تمرين التنفس العميق",
    titleEn: "Deep Breathing Exercise",
    messageAr: "ثلاثة أيام من التوتر تستحق لحظة توقف. جرّب تمرين التنفس 4-7-8 الآن.",
    messageEn: "Three days of stress deserve a moment of pause. Try the 4-7-8 breathing technique right now.",
    actionAr: "تعلم التقنية",
    actionEn: "Learn the technique",
    actionPath: "/depression",
    icon: "🫁",
    color: "sky",
  },
  {
    id: "resources",
    titleAr: "موارد قد تساعدك",
    titleEn: "Resources That May Help",
    messageAr: "عندنا مقالات وأدوات مخصصة لأوقات الضغط والحزن. خطوة صغيرة تبدأ التغيير.",
    messageEn: "We have articles and tools designed for moments of pressure and sadness. One small step can start the change.",
    actionAr: "اكتشف الموارد",
    actionEn: "Explore resources",
    actionPath: "/resources",
    icon: "📚",
    color: "violet",
  },
];

function hasConsecutiveLowMoodDays(
  logs: { log_date: string; score: number }[]
): boolean {
  if (logs.length < CONSECUTIVE_DAYS_REQUIRED) return false;

  const sorted = [...logs].sort(
    (a, b) => new Date(b.log_date).getTime() - new Date(a.log_date).getTime()
  );

  let consecutiveCount = 0;
  let prevDate: Date | null = null;

  for (const log of sorted) {
    const currentDate = new Date(log.log_date);
    if (log.score <= LOW_MOOD_THRESHOLD) {
      if (prevDate === null) {
        consecutiveCount = 1;
      } else {
        const dayDiff = Math.round(
          (prevDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        consecutiveCount = dayDiff === 1 ? consecutiveCount + 1 : 1;
      }
      prevDate = currentDate;
      if (consecutiveCount >= CONSECUTIVE_DAYS_REQUIRED) return true;
    } else {
      consecutiveCount = 0;
      prevDate = null;
    }
  }
  return false;
}

router.get("/jitai/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "userId مطلوب" });

    const result = await db.execute(sql`
      SELECT log_date::text AS log_date, score
      FROM mood_logs
      WHERE user_id = ${userId}
      ORDER BY log_date DESC
      LIMIT 14
    `);

    const logs = (result.rows ?? []) as { log_date: string; score: number }[];
    const triggered = hasConsecutiveLowMoodDays(logs);

    if (!triggered) {
      return res.json({ triggered: false });
    }

    const lowMoodCount = logs.filter((l) => l.score <= LOW_MOOD_THRESHOLD).length;
    const intervention = INTERVENTIONS[lowMoodCount % INTERVENTIONS.length];

    return res.json({
      triggered: true,
      consecutiveDays: CONSECUTIVE_DAYS_REQUIRED,
      intervention,
    });
  } catch (err: any) {
    console.error("[jitai] error:", err?.message || err);
    return res.status(500).json({ error: "حدث خطأ" });
  }
});

router.post("/jitai/accepted", async (req, res) => {
  try {
    const { userId } = req.body as { userId: string };
    if (!userId) return res.status(400).json({ error: "userId مطلوب" });

    await db.execute(sql`
      INSERT INTO motivation_patterns (jitai_triggered, jitai_accepted)
      VALUES (true, true)
    `);

    return res.json({ ok: true });
  } catch (err: any) {
    console.error("[jitai/accepted] error:", err?.message || err);
    return res.status(500).json({ error: "حدث خطأ" });
  }
});

export default router;
