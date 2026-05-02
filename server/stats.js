import { Router } from "express";
import sql from "./db.js";

const router = Router();

router.get("/stats", async (_req, res) => {
  try {
    const [usersCount] = await sql`SELECT count(*)::int as count FROM users`;
    const [moodStats] = await sql`SELECT count(*)::int as total, round(avg(score)::numeric, 2) as avg_score FROM mood_entries`;

    const [jitaiStats] = await sql`
      SELECT 
        count(*)::int as triggered, 
        count(*) filter (where response = 'accepted')::int as accepted 
      FROM jitai_responses`;

    const weeklyData = await sql`
      SELECT created_at::date::text as date, round(avg(score)::numeric, 2) as avg_score, count(*)::int as entries
      FROM mood_entries
      WHERE created_at >= current_date - interval '14 days'
      GROUP BY created_at::date ORDER BY date ASC`;

    const [moodDist] = await sql`
      SELECT
        count(*) filter (where mood = 'very_low')::int as very_low,
        count(*) filter (where mood = 'low')::int as low,
        count(*) filter (where mood = 'mid')::int as mid,
        count(*) filter (where mood = 'high')::int as high
      FROM mood_entries`;

    const [trend] = await sql`
      SELECT
        round(avg(score) filter (where created_at >= current_date - interval '7 days')::numeric, 2) as this_week,
        round(avg(score) filter (where created_at >= current_date - interval '14 days' and created_at < current_date - interval '7 days')::numeric, 2) as last_week
      FROM mood_entries`;

    const jitaiTriggered = jitaiStats?.triggered || 0;
    const jitaiAccepted = jitaiStats?.accepted || 0;
    const thisWeek = Number(trend?.this_week || 0);
    const lastWeek = Number(trend?.last_week || 0);

    res.json({
      totalUsers: usersCount?.count || 0,
      totalSessions: moodStats?.total || 0,
      avgScore: Number(moodStats?.avg_score || 0),
      acceptanceRate: jitaiTriggered > 0 ? Math.round((jitaiAccepted / jitaiTriggered) * 100) : 0,
      moodImprovement: lastWeek > 0 ? Math.round(((thisWeek - lastWeek) / lastWeek) * 100) : 0,
      moodDistribution: {
        veryLow: moodDist?.very_low || 0,
        low: moodDist?.low || 0,
        mid: moodDist?.mid || 0,
        high: moodDist?.high || 0,
      },
      weeklyData: weeklyData.map(r => ({
        date: r.date,
        avgScore: Number(r.avg_score),
        entries: r.entries
      }))
    });
  } catch (err) {
    console.error("[stats] error:", err.message);
    res.status(500).json({ error: "حدث خطأ في جلب الإحصائيات" });
  }
});

export default router;
