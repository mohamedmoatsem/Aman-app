import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { moodLogsTable, motivationPatternsTable } from "@workspace/db/schema";
import { eq, desc, and } from "drizzle-orm";

function getSudanDate(): string {
  const now = new Date();
  const sudanTime = new Date(now.getTime() + 3 * 60 * 60 * 1000);
  return sudanTime.toISOString().split("T")[0];
}

const router: IRouter = Router();

const LOW_MOOD_THRESHOLD = 2;
const CONSECUTIVE_DAYS_REQUIRED = 3;

const INTERVENTIONS = [
  {
    id: "chat",
    titleAr: "تحدث مع مساعد أمان",
    messageAr: "لاحظنا أنك تمر بوقت صعب هذه الأيام. مساعد أمان هنا يسمعك بدون أي حكم.",
    actionAr: "ابدأ المحادثة",
    actionPath: "/chat",
    icon: "🌿",
    color: "emerald",
  },
  {
    id: "breathing",
    titleAr: "تمرين التنفس العميق",
    messageAr: "ثلاثة أيام من التوتر تستحق لحظة توقف. جرّب تمرين التنفس 4-7-8 الآن.",
    actionAr: "تعلم التقنية",
    actionPath: "/depression",
    icon: "🫁",
    color: "sky",
  },
  {
    id: "resources",
    titleAr: "موارد قد تساعدك",
    messageAr: "عندنا مقالات وأدوات مخصصة لأوقات الضغط والحزن. خطوة صغيرة تبدأ التغيير.",
    actionAr: "اكتشف الموارد",
    actionPath: "/resources",
    icon: "📚",
    color: "violet",
  },
];

function hasConsecutiveLowMoodDays(logs: { logDate: string; score: number }[]): boolean {
  if (logs.length < CONSECUTIVE_DAYS_REQUIRED) return false;

  const sorted = [...logs].sort(
    (a, b) => new Date(b.logDate).getTime() - new Date(a.logDate).getTime()
  );

  let consecutiveCount = 0;
  let prevDate: Date | null = null;

  for (const log of sorted) {
    const currentDate = new Date(log.logDate);

    if (log.score <= LOW_MOOD_THRESHOLD) {
      if (prevDate === null) {
        consecutiveCount = 1;
      } else {
        const dayDiff = Math.round(
          (prevDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (dayDiff === 1) {
          consecutiveCount++;
        } else {
          consecutiveCount = 1;
        }
      }

      prevDate = currentDate;

      if (consecutiveCount >= CONSECUTIVE_DAYS_REQUIRED) {
        return true;
      }
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

    const logs = await db
      .select({ logDate: moodLogsTable.logDate, score: moodLogsTable.score })
      .from(moodLogsTable)
      .where(eq(moodLogsTable.userId, userId))
      .orderBy(desc(moodLogsTable.logDate))
      .limit(14);

    const triggered = hasConsecutiveLowMoodDays(logs);

    if (!triggered) {
      return res.json({ triggered: false });
    }

    const today = getSudanDate();
    await db
      .insert(motivationPatternsTable)
      .values({ userId, logDate: today, jitaiTriggered: true })
      .onConflictDoNothing();

    const daysSince = logs.filter((l) => l.score <= LOW_MOOD_THRESHOLD).length;
    const intervention = INTERVENTIONS[daysSince % INTERVENTIONS.length];

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

    const today = getSudanDate();
    await db
      .insert(motivationPatternsTable)
      .values({ userId, logDate: today, jitaiTriggered: true, jitaiAccepted: true })
      .onConflictDoUpdate({
        target: [motivationPatternsTable.userId, motivationPatternsTable.logDate],
        set: { jitaiAccepted: true },
      });

    return res.json({ ok: true });
  } catch (err: any) {
    console.error("[jitai/accepted] error:", err?.message || err);
    return res.status(500).json({ error: "حدث خطأ" });
  }
});

export default router;
