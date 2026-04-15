import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { usersTable, moodLogsTable, motivationPatternsTable } from "@workspace/db/schema";
import { sql, gte, and, lte } from "drizzle-orm";

const router: IRouter = Router();

router.get("/stats", async (_req, res) => {
  try {
    const [
      usersResult,
      moodResult,
      jitaiResult,
      weeklyResult,
      moodDistResult,
      trendResult,
    ] = await Promise.all([
      db.select({ count: sql<number>`count(*)::int` }).from(usersTable),

      db.select({
        total: sql<number>`count(*)::int`,
        avgScore: sql<number>`round(avg(score)::numeric, 2)`,
      }).from(moodLogsTable),

      db.select({
        triggered: sql<number>`count(*) filter (where jitai_triggered)::int`,
        accepted: sql<number>`count(*) filter (where jitai_accepted)::int`,
      }).from(motivationPatternsTable),

      db.execute(sql`
        SELECT log_date::text, round(avg(score)::numeric,2) as avg_score, count(*)::int as entries
        FROM mood_logs
        WHERE log_date >= current_date - interval '14 days'
        GROUP BY log_date
        ORDER BY log_date ASC
        LIMIT 14
      `),

      db.execute(sql`
        SELECT
          count(*) filter (where score = 1)::int as very_low,
          count(*) filter (where score = 2)::int as low,
          count(*) filter (where score = 3)::int as mid,
          count(*) filter (where score = 5)::int as high
        FROM mood_logs
      `),

      db.execute(sql`
        SELECT
          round(avg(score) filter (where log_date >= current_date - interval '7 days')::numeric, 2) as this_week,
          round(avg(score) filter (where log_date >= current_date - interval '14 days'
            and log_date < current_date - interval '7 days')::numeric, 2) as last_week
        FROM mood_logs
      `),
    ]);

    const totalUsers = usersResult[0]?.count ?? 0;
    const totalLogs = moodResult[0]?.total ?? 0;
    const avgScore = Number(moodResult[0]?.avgScore ?? 0);
    const jitaiTriggered = jitaiResult[0]?.triggered ?? 0;
    const jitaiAccepted = jitaiResult[0]?.accepted ?? 0;
    const acceptanceRate = jitaiTriggered > 0
      ? Math.round((jitaiAccepted / jitaiTriggered) * 100)
      : 0;

    const trendRow = (trendResult.rows?.[0] ?? {}) as Record<string, unknown>;
    const thisWeek = Number(trendRow.this_week ?? 0);
    const lastWeek = Number(trendRow.last_week ?? 0);
    const moodImprovement = lastWeek > 0
      ? Math.round(((thisWeek - lastWeek) / lastWeek) * 100)
      : 0;

    const distRow = (moodDistResult.rows?.[0] ?? {}) as Record<string, unknown>;

    const weeklyData = (weeklyResult.rows ?? []) as { log_date: string; avg_score: string; entries: number }[];

    return res.json({
      totalUsers,
      totalSessions: totalLogs,
      avgScore,
      jitaiTriggered,
      jitaiAccepted,
      acceptanceRate,
      moodImprovement,
      thisWeekAvg: thisWeek,
      lastWeekAvg: lastWeek,
      moodDistribution: {
        veryLow: Number(distRow.very_low ?? 0),
        low: Number(distRow.low ?? 0),
        mid: Number(distRow.mid ?? 0),
        high: Number(distRow.high ?? 0),
      },
      weeklyData: weeklyData.map((r) => ({
        date: r.log_date,
        avgScore: Number(r.avg_score),
        entries: Number(r.entries),
      })),
    });
  } catch (err: any) {
    console.error("[stats] error:", err?.message || err);
    return res.status(500).json({ error: "حدث خطأ" });
  }
});

export default router;
