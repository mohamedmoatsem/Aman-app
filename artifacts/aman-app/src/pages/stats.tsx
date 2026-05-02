import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  ArrowRight, ArrowLeft, TrendingUp, TrendingDown, Minus,
  Users, Heart, MessageCircle, ShieldAlert, Globe,
  RefreshCw, Stethoscope, BookOpen, Clock, Star, BarChart3,
} from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import { useLanguage } from "@/contexts/LanguageContext";

const BASE_URL = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

interface StatsData {
  totalUsers: number;
  totalSessions: number;
  avgScore: number;
  crisisInterventions: number;
  profConsults: number;
  communityPosts: number;
  acceptanceRate: number;
  moodImprovement: number;
  thisWeekAvg: number;
  lastWeekAvg: number;
  todayActive: number;
  weeklyNew: number;
  moodDistribution: { veryLow: number; low: number; mid: number; high: number };
  weeklyData: { date: string; avgScore: number; entries: number }[];
  topTopics: { topic: string; emoji: string; count: number; color: string }[];
  geographic: { region: string; users: number; flag: string; pct: number }[];
  hourlyActivity: number[];
  testimonials: { text: string; location: string; emoji: string }[];
  impact: { targetUsers: number; crisisPrevented: number; countriesServed: number; avgResponseMs: number };
}

// ── Hook: animated counter ────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1400, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) { setCount(target); return; }
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

// ── Component: animated number (safe hook usage) ──────────────────────────────
function AnimatedNumber({ value, animate }: { value: number; animate: boolean }) {
  const displayed = useCountUp(value, 1300, animate);
  return <>{displayed.toLocaleString()}</>;
}

// ── Component: KPI card ───────────────────────────────────────────────────────
function KpiCard({ icon, label, value, suffix = "", sub, color, textColor, animate }: {
  icon: React.ReactNode; label: string; value: number; suffix?: string;
  sub?: React.ReactNode; color: string; textColor: string; animate: boolean;
}) {
  const displayed = useCountUp(value, 1300, animate);
  return (
    <div className="bg-card border border-border/60 rounded-3xl p-4 shadow-sm flex flex-col gap-3">
      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${color}`}>{icon}</div>
      <div>
        <p className="text-2xl font-extrabold tabular-nums text-foreground">
          {displayed.toLocaleString()}{suffix}
        </p>
        <p className="text-xs font-medium text-muted-foreground mt-0.5 leading-tight">{label}</p>
      </div>
      {sub && <div className={`text-[11px] font-semibold ${textColor}`}>{sub}</div>}
    </div>
  );
}

// ── Component: sparkline ──────────────────────────────────────────────────────
function SparkLine({ data }: { data: { date: string; avgScore: number }[] }) {
  if (!data.length) return null;
  const W = 300, H = 80, PAD = 8;
  const iw = W - PAD * 2, ih = H - PAD * 2;
  const pts = data.map((d, i) => ({
    x: PAD + (i / Math.max(data.length - 1, 1)) * iw,
    y: PAD + ih - ((d.avgScore - 1) / 4) * ih,
  }));
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const area = `${line} L${pts[pts.length - 1].x},${H} L${pts[0].x},${H}Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#sg)" />
      <path d={line} fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => i === pts.length - 1 && (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#0ea5e9" stroke="white" strokeWidth="2" />
      ))}
    </svg>
  );
}

// ── Component: hourly heatmap ─────────────────────────────────────────────────
function HourlyHeatmap({ data }: { data: number[] }) {
  const max = Math.max(...data, 1);
  const labels = ["12ص", "3ص", "6ص", "9ص", "12ظ", "3م", "6م", "9م"];
  return (
    <div>
      <div className="flex gap-0.5">
        {data.map((v, i) => {
          const opacity = 0.1 + (v / max) * 0.85;
          return (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{ height: 28, backgroundColor: `rgba(14,165,233,${opacity})` }}
              title={`${i}:00 — ${v} مستخدم`}
            />
          );
        })}
      </div>
      <div className="flex justify-between mt-1.5">
        {labels.map((l) => (
          <span key={l} className="text-[9px] text-muted-foreground">{l}</span>
        ))}
      </div>
    </div>
  );
}

// ── Component: mood distribution bar ─────────────────────────────────────────
function MoodBar({ emoji, label, value, total, color }: {
  emoji: string; label: string; value: number; total: number; color: string;
}) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-base w-6 shrink-0">{emoji}</span>
      <span className="text-xs text-muted-foreground w-16 shrink-0">{label}</span>
      <div className="flex-1 bg-muted rounded-full h-2.5 overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-1000 ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-bold text-foreground w-8 tabular-nums">{pct}%</span>
    </div>
  );
}

// ── Component: testimonial carousel ──────────────────────────────────────────
function TestimonialCarousel({ items }: { items: { text: string; location: string; emoji: string }[] }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [items.length]);
  if (!items.length) return null;
  const cur = items[idx];
  return (
    <div className="bg-gradient-to-br from-primary/8 via-emerald-500/5 to-transparent border border-primary/15 rounded-3xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{cur.emoji}</span>
        <p className="text-[11px] font-bold text-primary uppercase tracking-wide">شهادة حية</p>
      </div>
      <p className="text-sm text-foreground leading-relaxed italic mb-3">"{cur.text}"</p>
      <p className="text-[11px] text-muted-foreground flex items-center gap-1">
        <Globe className="w-3 h-3" /> {cur.location}
      </p>
      <div className="flex gap-1.5 mt-3 justify-center">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-1.5 rounded-full transition-all ${i === idx ? "bg-primary w-5" : "bg-muted w-1.5"}`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Crisis Banner (standalone component so hooks are top-level) ───────────────
function CrisisBanner({ value, prevented, animate }: { value: number; prevented: number; animate: boolean }) {
  const displayed = useCountUp(value, 1300, animate);
  return (
    <div className="bg-gradient-to-l from-red-500/10 to-orange-500/10 border border-red-200/60 rounded-3xl p-5">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
          <ShieldAlert className="w-7 h-7 text-red-500" />
        </div>
        <div>
          <p className="text-4xl font-extrabold text-foreground tabular-nums">
            {displayed.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground font-medium mt-0.5">تدخّل في أزمة نفسية حادة</p>
        </div>
      </div>
      <div className="bg-white/70 rounded-2xl p-3">
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          📌 كل رقم هنا إنسان مرّ بلحظة حرجة ووجد أمان بجانبه.
          {" "}<strong className="text-foreground">{prevented.toLocaleString()} حالة</strong> جرى فيها تحويل المستخدم لخطوط دعم متخصصة.
        </p>
      </div>
    </div>
  );
}

// ── Main stats page ───────────────────────────────────────────────────────────
export default function Stats() {
  const { t } = useLanguage();
  const BackArrow = t.dir === "rtl" ? ArrowRight : ArrowLeft;

  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const hasLoaded = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const load = async (silent = false) => {
    if (!silent) setLoading(true);
    setError(false);
    try {
      const res = await fetch(`${BASE_URL}/api/stats`);
      if (!res.ok) throw new Error();
      setData(await res.json());
      setLastUpdated(new Date());
      if (!hasLoaded.current) {
        setTimeout(() => setAnimated(true), 150);
        hasLoaded.current = true;
      }
    } catch {
      if (!silent) setError(true);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    load();
    intervalRef.current = setInterval(() => load(true), 60_000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const dist = data?.moodDistribution;
  const distTotal = dist ? dist.veryLow + dist.low + dist.mid + dist.high : 0;
  const maxTopic = Math.max(...(data?.topTopics.map((t) => t.count) ?? [1]));
  const weeklyMin = data?.weeklyData.length ? Math.min(...data.weeklyData.map((d) => d.avgScore)) : 0;
  const weeklyMax = data?.weeklyData.length ? Math.max(...data.weeklyData.map((d) => d.avgScore)) : 0;
  const weeklyAvg = data?.weeklyData.length
    ? data.weeklyData.reduce((s, d) => s + d.avgScore, 0) / data.weeklyData.length
    : 0;

  const trendIcon = (data?.moodImprovement ?? 0) > 0
    ? <span className="flex items-center gap-1 text-emerald-600 text-xs font-semibold"><TrendingUp className="w-3 h-3" /> تحسّن {data?.moodImprovement}%</span>
    : (data?.moodImprovement ?? 0) < 0
    ? <span className="flex items-center gap-1 text-red-500 text-xs font-semibold"><TrendingDown className="w-3 h-3" /> انخفض {Math.abs(data?.moodImprovement ?? 0)}%</span>
    : <span className="flex items-center gap-1 text-muted-foreground text-xs"><Minus className="w-3 h-3" /> مستقر</span>;

  return (
    <MobileLayout>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative bg-gradient-to-br from-slate-900 via-primary/85 to-emerald-600 px-5 pt-14 pb-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-56 h-56 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-400/10 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative flex items-center gap-3 mb-5">
          <Link href="/">
            <button className="p-2 rounded-xl bg-white/15 hover:bg-white/25 transition-colors">
              <BackArrow className="w-5 h-5 text-white" />
            </button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-white leading-tight">الإحصاءات الحية</h1>
            <p className="text-white/70 text-xs mt-0.5">أثر أمان في الوقت الفعلي — السودان والشتات</p>
          </div>
          <button
            onClick={() => load()}
            disabled={loading}
            className="p-2 rounded-xl bg-white/15 hover:bg-white/25 transition-colors disabled:opacity-40"
          >
            <RefreshCw className={`w-4 h-4 text-white ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 relative">
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            <span className="text-white text-xs font-semibold">مباشر الآن</span>
          </div>
          {data && (
            <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5">
              <Users className="w-3 h-3 text-white/80" />
              <span className="text-white text-xs font-semibold">{data.todayActive} نشط اليوم</span>
            </div>
          )}
          {data && (
            <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5">
              <Star className="w-3 h-3 text-amber-300" />
              <span className="text-white text-xs font-semibold">{data.weeklyNew}+ هذا الأسبوع</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="px-4 py-5 -mt-3 rounded-t-[28px] bg-background relative z-10 flex flex-col gap-5">

        {loading && !data && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <p className="text-sm text-muted-foreground">جارٍ تحميل البيانات...</p>
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-2xl px-4 py-4 text-center">
            <p className="text-sm text-destructive font-medium mb-2">تعذّر تحميل الإحصائيات</p>
            <button onClick={() => load()} className="text-xs underline text-destructive">حاول مجدداً</button>
          </div>
        )}

        {data && (
          <>
            {/* 1 ── Crisis banner */}
            <CrisisBanner
              value={data.crisisInterventions}
              prevented={data.impact.crisisPrevented}
              animate={animated}
            />

            {/* 2 ── KPI 2×2 grid */}
            <div className="grid grid-cols-2 gap-3">
              <KpiCard
                icon={<Users className="w-5 h-5 text-sky-600" />}
                label="مستخدم نشط"
                value={data.totalUsers}
                color="bg-sky-100" textColor="text-sky-600"
                animate={animated}
                sub={<span>📈 +{data.weeklyNew} هذا الأسبوع</span>}
              />
              <KpiCard
                icon={<MessageCircle className="w-5 h-5 text-violet-600" />}
                label="محادثة مع المساعد AI"
                value={data.totalSessions}
                color="bg-violet-100" textColor="text-violet-600"
                animate={animated}
                sub={<span>⌀ {data.avgScore.toFixed(1)}/5 مزاج</span>}
              />
              <KpiCard
                icon={<Stethoscope className="w-5 h-5 text-emerald-600" />}
                label="استشارة مع مختص"
                value={data.profConsults}
                color="bg-emerald-100" textColor="text-emerald-600"
                animate={animated}
                sub={<span>🔒 100% سرية</span>}
              />
              <KpiCard
                icon={<BookOpen className="w-5 h-5 text-amber-600" />}
                label="مشاركة في المجتمع"
                value={data.communityPosts}
                color="bg-amber-100" textColor="text-amber-600"
                animate={animated}
                sub={<span>💚 قصص حقيقية</span>}
              />
            </div>

            {/* 3 ── Mood trend */}
            <section className="bg-card border border-border/60 rounded-3xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-bold text-foreground text-sm">مسار المزاج — آخر 14 يوم</h2>
                {trendIcon}
              </div>
              <div className="flex gap-4 mb-3 text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
                  هذا الأسبوع: <strong className="text-foreground mr-0.5">{data.thisWeekAvg.toFixed(1)}</strong>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/30 inline-block" />
                  السابق: {data.lastWeekAvg.toFixed(1)}
                </span>
              </div>
              <SparkLine data={data.weeklyData} />
              {data.weeklyData.length > 1 && (
                <div className="flex justify-between text-[10px] text-muted-foreground mt-2 px-1">
                  <span>{data.weeklyData[0]?.date?.slice(5).replace("-", "/")}</span>
                  <span className="text-primary/70 font-medium">↑ اتجاه تصاعدي</span>
                  <span>{data.weeklyData[data.weeklyData.length - 1]?.date?.slice(5).replace("-", "/")}</span>
                </div>
              )}
              <div className="mt-3 pt-3 border-t border-border/40 grid grid-cols-3 gap-2 text-center">
                {[
                  { label: "أدنى", val: weeklyMin.toFixed(1), cls: "text-red-500" },
                  { label: "المتوسط", val: weeklyAvg.toFixed(1), cls: "text-primary" },
                  { label: "أعلى", val: weeklyMax.toFixed(1), cls: "text-emerald-600" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className={`text-lg font-extrabold ${s.cls}`}>{s.val}</p>
                    <p className="text-[10px] text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 4 ── Mood distribution */}
            <section className="bg-card border border-border/60 rounded-3xl p-5 shadow-sm">
              <h2 className="font-bold text-foreground text-sm mb-4">توزيع المزاج الكلي</h2>
              <div className="flex flex-col gap-3">
                <MoodBar emoji="😟" label="قلق شديد" value={dist?.veryLow ?? 0} total={distTotal} color="bg-orange-400" />
                <MoodBar emoji="😔" label="حزين"      value={dist?.low    ?? 0} total={distTotal} color="bg-blue-400" />
                <MoodBar emoji="🌿" label="عادي"      value={dist?.mid    ?? 0} total={distTotal} color="bg-sky-400" />
                <MoodBar emoji="✨" label="بخير"      value={dist?.high   ?? 0} total={distTotal} color="bg-emerald-400" />
              </div>
              <p className="text-[11px] text-muted-foreground mt-3 text-center">
                إجمالي التقييمات: <strong className="text-foreground">{distTotal.toLocaleString()}</strong> تسجيل
              </p>
            </section>

            {/* 5 ── Top topics */}
            <section className="bg-card border border-border/60 rounded-3xl p-5 shadow-sm">
              <h2 className="font-bold text-foreground text-sm mb-1">أكثر المواضيع تداولاً</h2>
              <p className="text-[11px] text-muted-foreground mb-4">ما يتحدث عنه مستخدمو أمان مع المساعد AI</p>
              <div className="flex flex-col gap-3">
                {data.topTopics.map((topic, i) => {
                  const pct = Math.round((topic.count / maxTopic) * 100);
                  return (
                    <div key={i} className="flex items-center gap-2.5">
                      <span className="text-base shrink-0 w-6">{topic.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs font-medium text-foreground truncate">{topic.topic}</p>
                          <p className="text-[11px] text-muted-foreground tabular-nums shrink-0 ml-2">
                            {topic.count.toLocaleString()}
                          </p>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{ width: animated ? `${pct}%` : "0%", backgroundColor: topic.color }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 6 ── Geographic */}
            <section className="bg-card border border-border/60 rounded-3xl p-5 shadow-sm">
              <h2 className="font-bold text-foreground text-sm mb-1">التوزيع الجغرافي</h2>
              <p className="text-[11px] text-muted-foreground mb-4">السودان والشتات — {data.impact.countriesServed}+ دولة</p>
              <div className="flex flex-col gap-2.5">
                {data.geographic.map((g, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-lg shrink-0 w-7">{g.flag}</span>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-0.5">
                        <p className="text-xs font-medium text-foreground">{g.region}</p>
                        <p className="text-[11px] text-muted-foreground tabular-nums">{g.users.toLocaleString()}</p>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary/70 transition-all duration-1000"
                          style={{ width: animated ? `${g.pct}%` : "0%" }}
                        />
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-primary w-7 shrink-0">{g.pct}%</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 7 ── Hourly activity heatmap */}
            <section className="bg-card border border-border/60 rounded-3xl p-5 shadow-sm">
              <h2 className="font-bold text-foreground text-sm mb-1">نشاط التطبيق خلال اليوم</h2>
              <p className="text-[11px] text-muted-foreground mb-4">متى يحتاج الناس المساندة أكثر؟</p>
              <HourlyHeatmap data={data.hourlyActivity} />
              <p className="text-[10px] text-muted-foreground mt-3 text-center">
                🌙 ذروة الليل <strong className="text-foreground">9م–11م</strong> — الأوقات الأكثر حساسيةً نفسياً
              </p>
            </section>

            {/* 8 ── Testimonials */}
            <TestimonialCarousel items={data.testimonials} />

            {/* 9 ── JITAI + Speed 2-col */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card border border-border/60 rounded-3xl p-4 shadow-sm">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5 text-rose-500" />
                </div>
                <p className="text-2xl font-extrabold text-foreground">{data.acceptanceRate}%</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-tight">معدل قبول تدخلات الدعم الذكي</p>
              </div>
              <div className="bg-card border border-border/60 rounded-3xl p-4 shadow-sm">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5 text-indigo-600" />
                </div>
                <p className="text-2xl font-extrabold text-foreground">
                  {(data.impact.avgResponseMs / 1000).toFixed(1)}ث
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-tight">متوسط زمن الرد من المساعد AI</p>
              </div>
            </div>

            {/* 10 ── Year 1 impact projection */}
            <section className="bg-gradient-to-br from-slate-900 to-primary/90 rounded-3xl p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              <div className="relative">
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">🎯 رؤية أمان 2025</p>
                <h3 className="text-white font-extrabold text-xl mb-4">هدف السنة الأولى</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { val: `${(data.impact.targetUsers / 1000).toFixed(0)}ك+`, label: "مستخدم يستهدفهم أمان", icon: "👥" },
                    { val: `${data.impact.crisisPrevented.toLocaleString()}+`, label: "أزمة حادة تمّ التدخل فيها", icon: "🛡️" },
                    { val: `${data.impact.countriesServed}+`, label: "دولة يصل إليها التطبيق", icon: "🌍" },
                    { val: "24/7", label: "وصول مجاني بلا انقطاع", icon: "🔓" },
                  ].map((item) => (
                    <div key={item.label} className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
                      <p className="text-2xl mb-1">{item.icon}</p>
                      <p className="text-xl font-extrabold text-white leading-none">{item.val}</p>
                      <p className="text-[10px] text-white/65 leading-tight mt-0.5">{item.label}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm">
                  <p className="text-[11px] text-white/80 leading-relaxed">
                    أمان يؤمن بأن الصحة النفسية حق إنساني لا رفاهية.
                    في السودان الذي تمزّقه الحرب، نسعى لنكون الصوت الذي يقول:{" "}
                    <strong className="text-white">أنت مو لوحدك.</strong>
                  </p>
                </div>
              </div>
            </section>

            {lastUpdated && (
              <p className="text-center text-[11px] text-muted-foreground pb-2">
                آخر تحديث: {lastUpdated.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
                {" "}· يتحدث تلقائياً كل دقيقة
              </p>
            )}
          </>
        )}
      </div>
    </MobileLayout>
  );
}
