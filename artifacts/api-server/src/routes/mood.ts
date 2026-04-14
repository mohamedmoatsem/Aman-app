import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { usersTable, moodLogsTable } from "@workspace/db/schema";
import { eq, desc, and } from "drizzle-orm";

const router: IRouter = Router();

const MOOD_SCORES: Record<number, number> = {
  0: 1,
  1: 2,
  2: 3,
  3: 5,
};

async function ensureUser(deviceId: string) {
  const existing = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.deviceId, deviceId))
    .limit(1);

  if (existing.length === 0) {
    await db.insert(usersTable).values({ deviceId }).onConflictDoNothing();
  }
}

router.post("/mood", async (req, res) => {
  try {
    const { userId, moodIndex, moodLabel } = req.body as {
      userId: string;
      moodIndex: number;
      moodLabel: string;
    };

    if (!userId || typeof moodIndex !== "number" || moodIndex < 0 || moodIndex > 3) {
      return res.status(400).json({ error: "بيانات غير صحيحة" });
    }

    await ensureUser(userId);

    const today = new Date().toISOString().split("T")[0];
    const score = MOOD_SCORES[moodIndex] ?? 3;

    const existing = await db
      .select()
      .from(moodLogsTable)
      .where(and(eq(moodLogsTable.userId, userId), eq(moodLogsTable.logDate, today)))
      .limit(1);

    if (existing.length > 0) {
      const [updated] = await db
        .update(moodLogsTable)
        .set({ moodIndex, moodLabel, score })
        .where(eq(moodLogsTable.id, existing[0].id))
        .returning();
      return res.status(200).json({ log: updated, updated: true });
    }

    const [log] = await db
      .insert(moodLogsTable)
      .values({ userId, moodIndex, moodLabel, score, logDate: today })
      .returning();

    return res.status(201).json({ log, updated: false });
  } catch (err: any) {
    console.error("[mood] error:", err?.message || err);
    return res.status(500).json({ error: "حدث خطأ، حاول مرة ثانية" });
  }
});

router.get("/mood/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ error: "userId مطلوب" });

    const logs = await db
      .select()
      .from(moodLogsTable)
      .where(eq(moodLogsTable.userId, userId))
      .orderBy(desc(moodLogsTable.logDate))
      .limit(30);

    return res.json({ logs });
  } catch (err: any) {
    console.error("[mood/history] error:", err?.message || err);
    return res.status(500).json({ error: "حدث خطأ" });
  }
});

export default router;
