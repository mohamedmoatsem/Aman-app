import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowRight, TrendingUp, TrendingDown, Minus, Users, Heart, Zap, BarChart3, RefreshCw } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";

const BASE_URL = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

interface StatsData {
  totalUsers: number;
  totalSessions: number;
  avgScore: number;
  jitaiTriggered: number;
  jitaiAccepted: number;
  acceptanceRate: number;
  moodImprovement: number;
  thisWeekAvg: number;
  lastWeekAvg: number;
  moodDistribution: { veryLow: number; low: number; mid: number; high: number };
  weeklyData: { date: string; avgScore: number; entries: number }[];
}

function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start || target === 0) { setCount(target); return; }
    let startTime: number | null = null;
    const step = (now: number) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({
  icon,
  label,
  value,
  suffix = "",
  color,
  sub,
  animate,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  color: string;
  sub?: React.ReactNode;
  animate: boolean;
}) {
  const displayed = useCountUp(value, 1200, animate);
  return (
    <div className={`bg-card border border-border/60 rounded-3xl p-5 shadow-sm flex flex-col gap-3`}>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-extrabold text-foreground tabular-nums">
          {displayed.toLocaleString("ar-EG")}{suffix}
        </p>
        <p className="text-xs font-medium text-muted-foreground mt-0.5">{label}</p>
      </div>
      {sub && <div className="text-[11px] text-muted-foreground">{sub}</div>}
    </div>
  );
}

function MoodBar({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground w-14 text-right shrink-0">{label}</span>
      <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-bold text-foreground w-8 tabular-nums">{pct}%</span>
    </div>
  );
}

function MiniChart({ data }: { data: { date: string; avgScore: number; entries: number }[] }) {
  if (!data.length) return (
    <div className="h-28 flex items-center justify-center text-muted-foreground text-xs">
      لا توجد بيانات بعد
    </div>
  );

  const max = 100;
  const min = 0;
  const w = 280;
  const h = 96;
  const pad = 12;
  const innerW = w - pad * 2;
  const innerH = h - pad * 2;

  const pts = data.map((d, i) => {
    const x = pad + (i / Math.max(data.length - 1, 1)) * innerW;
    const y = pad + innerH - ((d.avgScore - min) / (max - min)) * innerH;
    return { x, y, d };
  });

  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = `${pathD} L ${pts[pts.length - 1].x} ${h} L ${pts[0].x} ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#chartGrad)" />
      <path d={pathD} fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="#0EA5E9" />
      ))}
    </svg>
  );
}

export default function Stats() {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [animated, setAnimated] = useState(false);
  const hasLoaded = useRef(false);

  const load = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`${BASE_URL}/api/stats`);
      if (!res.ok) throw new Error();
      const json = await res.json();
      setData(json);
      if (!hasLoaded.current) {
        setTimeout(() => setAnimated(true), 100);
        hasLoaded.current = true;
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const dist = data?.moodDistribution;
  const distTotal = dist ? dist.veryLow + dist.low + dist.mid + dist.high : 0;

  const trendIcon =
    (data?.moodImprovement ?? 0) > 0 ? (
      <span className="flex items-center gap-1 text-emerald-600"><TrendingUp className="w-3.5 h-3.5" /> تحسّن {data?.moodImprovement}%</span>
    ) : (data?.moodImprovement ?? 0) < 0 ? (
      <span className="flex items-center gap-1 text-red-500"><TrendingDown className="w-3.5 h-3.5" /> انخفض {Math.abs(data?.moodImprovement ?? 0)}%</span>
    ) : (
      <span className="flex items-center gap-1 text-muted-foreground"><Minus className="w-3.5 h-3.5" /> مستقر</span>
    );

  return (
    <MobileLayout>
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-emerald-500 px-6 pt-14 pb-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 0%, transparent 60%)" }} />
        <div className="relative flex items-center gap-3 mb-5">
          <Link href="/">
            <button className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors">
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-white">الإحصائيات الحية</h1>
            <p className="text-white/80 text-sm">أثر أمان في الوقت الفعلي</p>
          </div>
          <button
            onClick={load}
            disabled={loading}
            className="mr-auto p-2 rounded-xl bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-white ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
        {/* Live pulse badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
          <span className="text-white text-xs font-semibold">مباشر — يتحدث الآن</span>
        </div>
      </div>

      <div className="px-5 py-6 -mt-4 rounded-t-[28px] bg-background relative z-10 flex flex-col gap-6">

        {loading && !data && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <p className="text-sm text-muted-foreground">جارٍ تحميل البيانات...</p>
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-2xl px-4 py-4 text-center">
            <p className="text-sm text-destructive font-medium mb-2">تعذّر تحميل الإحصائيات</p>
            <button onClick={load} className="text-xs underline text-destructive">حاول مجدداً</button>
          </div>
        )}

        {data && (
          <>
            {/* Main stats grid */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                icon={<Users className="w-6 h-6 text-sky-600" />}
                label="مستخدم مسجّل"
                value={data.totalUsers}
                color="bg-sky-100"
                animate={animated}
              />
              <StatCard
                icon={<Heart className="w-6 h-6 text-rose-500" />}
                label="جلسة دعم مكتملة"
                value={data.totalSessions}
                color="bg-rose-100"
                animate={animated}
              />
              <StatCard
                icon={<Zap className="w-6 h-6 text-amber-500" />}
                label="تدخل ذكي JITAI"
                value={data.jitaiTriggered}
                color="bg-amber-100"
                sub={
                  <span className="text-amber-600 font-semibold">
                    {data.acceptanceRate}% معدل القبول
                  </span>
                }
                animate={animated}
              />
              <StatCard
                icon={<BarChart3 className="w-6 h-6 text-emerald-600" />}
                label="متوسط المزاج / 5"
                value={Math.round(data.avgScore * 10) / 10}
                color="bg-emerald-100"
                sub={trendIcon}
                animate={animated}
              />
            </div>

            {/* Weekly mood trend chart */}
            <section className="bg-card border border-border/60 rounded-3xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-foreground text-sm">مسار المزاج — آخر 14 يوم</h2>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block" />
                    هذا الأسبوع: {data.thisWeekAvg.toFixed(1)}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/40 inline-block" />
                    السابق: {data.lastWeekAvg.toFixed(1)}
                  </span>
                </div>
              </div>
              <MiniChart data={data.weeklyData} />
              {data.weeklyData.length > 0 && (
                <div className="flex justify-between text-[10px] text-muted-foreground mt-2 px-1">
                  <span>{new Date(data.weeklyData[data.weeklyData.length - 1]?.date).toLocaleDateString('ar-EG', {day: 'numeric', month: 'short'})}</
                  span>
                  <span>{new Date(data.weeklyData[0]?.date).toLocaleDateString('ar-EG', {day: 'numeric', month: 'short'})}</
                  span>
                  
                  <span className="text-primary/60 font-medium">← اتجاه المزاج</span>
                  <span>{data.weeklyData[0]?.date?.slice(5)}</span>
                </div>
              )}
            </section>

            {/* Mood distribution */}
            <section className="bg-card border border-border/60 rounded-3xl p-5 shadow-sm">
              <h2 className="font-bold text-foreground text-sm mb-4">توزيع المزاج الكلي</h2>
              <div className="flex flex-col gap-3">
                <MoodBar label="قلق شديد 😟" value={dist?.veryLow ?? 0} total={distTotal} color="bg-orange-400" />
                <MoodBar label="حزين 💙" value={dist?.low ?? 0} total={distTotal} color="bg-blue-400" />
                <MoodBar label="عادي 🌿" value={dist?.mid ?? 0} total={distTotal} color="bg-sky-400" />
                <MoodBar label="بخير ✨" value={dist?.high ?? 0} total={distTotal} color="bg-emerald-400" />
              </div>
            </section>

            {/* Impact projection */}
            <section className="bg-gradient-to-br from-primary/8 to-emerald-500/8 border border-primary/20 rounded-3xl p-5">
              <h2 className="font-bold text-foreground text-sm mb-4">🌟 الأثر المتوقع — السنة الأولى</h2>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { val: "10,000+", label: "مستخدم" },
                  { val: "40%", label: "تقليل الأزمات" },
                  { val: "24/7", label: "وصول مجاني" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/60 rounded-2xl p-3">
                    <p className="text-xl font-extrabold text-primary">{item.val}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">{item.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Last updated */}
            <p className="text-center text-[11px] text-muted-foreground pb-2">
              آخر تحديث: {new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
            </p>
          </>
        )}
      </div>
    </MobileLayout>
  );
}
