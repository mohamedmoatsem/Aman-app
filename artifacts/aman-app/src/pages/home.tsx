import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { Phone, BookHeart, CalendarDays, Users, ShieldCheck, HeartHandshake, Mail, Loader2, CheckCircle2, MessageCircleHeart, X, ArrowLeft } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import { useLanguage } from "@/contexts/LanguageContext";

const MOOD_SCORES = [1, 2, 3, 5];

const moodColors = [
  {
    color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
    selectedColor: "bg-orange-100 border-orange-400 ring-2 ring-orange-300",
    responseColor: "bg-orange-50 border-orange-200 text-orange-800",
    icon: "🌬️",
  },
  {
    color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    selectedColor: "bg-blue-100 border-blue-400 ring-2 ring-blue-300",
    responseColor: "bg-blue-50 border-blue-200 text-blue-800",
    icon: "💙",
  },
  {
    color: "bg-red-50 border-red-200 hover:bg-red-100",
    selectedColor: "bg-red-100 border-red-400 ring-2 ring-red-300",
    responseColor: "bg-red-50 border-red-200 text-red-800",
    icon: "🌿",
  },
  {
    color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
    selectedColor: "bg-emerald-100 border-emerald-400 ring-2 ring-emerald-300",
    responseColor: "bg-emerald-50 border-emerald-200 text-emerald-800",
    icon: "✨",
  },
];

const JITAI_COLORS: Record<string, { border: string; bg: string; btn: string; badge: string }> = {
  emerald: {
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    btn: "bg-emerald-500 hover:bg-emerald-600 text-white",
    badge: "bg-emerald-100 text-emerald-700",
  },
  sky: {
    border: "border-sky-200",
    bg: "bg-sky-50",
    btn: "bg-sky-500 hover:bg-sky-600 text-white",
    badge: "bg-sky-100 text-sky-700",
  },
  violet: {
    border: "border-violet-200",
    bg: "bg-violet-50",
    btn: "bg-violet-500 hover:bg-violet-600 text-white",
    badge: "bg-violet-100 text-violet-700",
  },
};

const quickLinkIcons = [BookHeart, CalendarDays, Users, ShieldCheck];
const quickLinkColors = [
  { color: "text-emerald-500", bg: "bg-emerald-500/10", href: "/resources" },
  { color: "text-amber-500", bg: "bg-amber-500/10", href: "/workshops" },
  { color: "text-sky-500", bg: "bg-sky-500/10", href: "/community" },
  { color: "text-indigo-500", bg: "bg-indigo-500/10", href: "/resources" },
];

function getDeviceId(): string {
  const key = "aman_device_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(key, id);
  }
  return id;
}

interface JitaiIntervention {
  id: string;
  titleAr: string;
  messageAr: string;
  actionAr: string;
  actionPath: string;
  icon: string;
  color: string;
}

export default function Home() {
  const { t, toggleLang } = useLanguage();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");
  const [moodSaved, setMoodSaved] = useState(false);
  const [jitai, setJitai] = useState<JitaiIntervention | null>(null);
  const [jitaiVisible, setJitaiVisible] = useState(false);

  const currentMood = selectedMood !== null ? t.moods[selectedMood] : null;
  const currentMoodStyle = selectedMood !== null ? moodColors[selectedMood] : null;

  const checkJitai = useCallback(async (userId: string) => {
    try {
      const res = await fetch(`/api/jitai/${encodeURIComponent(userId)}`);
      if (!res.ok) return;
      const data = await res.json();
      if (data.triggered && data.intervention) {
        setJitai(data.intervention);
        setJitaiVisible(true);
      }
    } catch {
      // silent
    }
  }, []);

  useEffect(() => {
    const userId = getDeviceId();
    checkJitai(userId);
  }, [checkJitai]);

  async function handleMoodSelect(index: number) {
    const next = selectedMood === index ? null : index;
    setSelectedMood(next);
    setMoodSaved(false);

    if (next === null) return;

    const userId = getDeviceId();
    const moodLabel = t.moods[next]?.label ?? "";

    try {
      await fetch("/api/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, moodIndex: next, moodLabel }),
      });
      setMoodSaved(true);
      setTimeout(() => checkJitai(userId), 500);
    } catch {
      // silent fail – mood UI still works offline
    }
  }

  async function handleJitaiAccept() {
    const userId = getDeviceId();
    try {
      await fetch("/api/jitai/accepted", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
    } catch {
      // silent
    }
  }

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.status === 201) {
        setSubStatus("success");
        setEmail("");
      } else if (res.status === 409) {
        setSubStatus("duplicate");
      } else {
        setSubStatus("error");
      }
    } catch {
      setSubStatus("error");
    }
  }

  const jitaiStyle = jitai ? (JITAI_COLORS[jitai.color] ?? JITAI_COLORS.emerald) : null;

  return (
    <MobileLayout>
      <div className="relative min-h-[40vh] w-full bg-primary flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt=""
            className="w-full h-full object-cover mix-blend-overlay opacity-50"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-primary" />
        </div>

        <div className="relative z-10 px-6 pb-10 pt-16 flex flex-col text-white">
          <button
            onClick={toggleLang}
            className="absolute top-5 right-5 text-xs font-bold px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 active:scale-95 transition-all"
          >
            {t.langToggle}
          </button>

          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md p-3 mb-6 shadow-lg border border-white/20">
            <img
              src={`${import.meta.env.BASE_URL}images/logo.png`}
              alt={t.appName}
              className="w-full h-full object-contain brightness-0 invert"
            />
          </div>
          <h1 className="text-3xl font-extrabold mb-3 leading-tight drop-shadow-md">
            {t.home.welcome}
          </h1>
          <p className="text-primary-foreground/90 text-base max-w-[300px] leading-relaxed mb-8">
            {t.home.subtitle}
          </p>

          <div className="flex flex-col gap-3">
            <a
              href="tel:999"
              className="flex items-center justify-center gap-3 w-full bg-white text-primary px-6 py-4 rounded-2xl font-bold text-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:scale-[1.02] active:scale-95 transition-all duration-200"
            >
              <Phone className="w-5 h-5 fill-current" />
              <span>{t.home.emergencySupport}</span>
            </a>

            <Link
              href="/resources"
              className="flex items-center justify-center gap-3 w-full bg-black/10 backdrop-blur-md border border-white/20 text-white px-6 py-4 rounded-2xl font-semibold text-lg hover:bg-black/20 active:scale-95 transition-all duration-200"
            >
              <HeartHandshake className="w-5 h-5" />
              <span>{t.home.browseResources}</span>
            </Link>

            <Link
              href="/chat"
              className="flex items-center justify-center gap-3 w-full bg-emerald-500/80 backdrop-blur-md border border-emerald-400/40 text-white px-6 py-4 rounded-2xl font-semibold text-lg hover:bg-emerald-500/90 active:scale-95 transition-all duration-200 shadow-lg shadow-emerald-900/20"
            >
              <MessageCircleHeart className="w-5 h-5" />
              <span>تكلّم مع مساعد أمان 🌿</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 pb-12 rounded-t-[32px] bg-background -mt-6 relative z-20 flex flex-col gap-8 shadow-[0_-8px_30px_rgba(0,0,0,0.05)]">

        {/* JITAI Intervention Banner */}
        {jitaiVisible && jitai && jitaiStyle && (
          <section className={`relative border-2 rounded-3xl p-5 shadow-sm transition-all ${jitaiStyle.border} ${jitaiStyle.bg}`}>
            <button
              onClick={() => setJitaiVisible(false)}
              className="absolute top-3 left-3 w-7 h-7 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-4 h-4 text-foreground/60" />
            </button>

            <div className="flex items-start gap-3 mb-4 pr-2">
              <span className="text-3xl leading-none">{jitai.icon}</span>
              <div>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full mb-2 inline-block ${jitaiStyle.badge}`}>
                  تدخل مخصص لك
                </span>
                <h3 className="font-extrabold text-base text-foreground leading-snug">
                  {jitai.titleAr}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {jitai.messageAr}
                </p>
              </div>
            </div>

            <Link
              href={jitai.actionPath as any}
              onClick={handleJitaiAccept}
              className={`flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-bold text-sm transition-all active:scale-95 ${jitaiStyle.btn}`}
            >
              <span>{jitai.actionAr}</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </section>
        )}

        {/* Mood Checker */}
        <section className="bg-card border border-border/60 rounded-3xl p-6 shadow-sm">
          <div className="text-center mb-5">
            <h2 className="text-lg font-bold text-foreground">{t.home.moodTitle}</h2>
            <p className="text-sm text-muted-foreground mt-1">{t.home.moodSubtitle}</p>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4">
            {t.moods.map((mood, i) => (
              <button
                key={i}
                onClick={() => handleMoodSelect(i)}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-200 active:scale-95 ${
                  selectedMood === i ? moodColors[i].selectedColor : moodColors[i].color
                }`}
              >
                <span className="text-3xl leading-none">{mood.emoji}</span>
                <span className="text-xs font-semibold text-foreground/80">{mood.label}</span>
              </button>
            ))}
          </div>

          {currentMood && currentMoodStyle && (
            <div className={`flex items-start gap-3 p-4 rounded-2xl border text-sm leading-relaxed font-medium transition-all duration-300 ${currentMoodStyle.responseColor}`}>
              <span className="text-xl shrink-0">{currentMoodStyle.icon}</span>
              <div className="flex-1">
                <p>{currentMood.response}</p>
                {moodSaved && (
                  <p className="text-xs mt-2 opacity-60 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    تم حفظ حالتك المزاجية
                  </p>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Email Subscription */}
        <section className="bg-gradient-to-br from-primary/5 to-secondary/10 border border-primary/20 rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">{t.home.subscribeTitle}</h2>
              <p className="text-xs text-muted-foreground">{t.home.subscribeSubtitle}</p>
            </div>
          </div>

          {subStatus === "success" ? (
            <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
              <p className="text-sm font-medium">{t.home.subscribeSuccess}</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setSubStatus("idle"); }}
                placeholder={t.home.emailPlaceholder}
                className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                dir="ltr"
                required
              />
              <button
                type="submit"
                disabled={subStatus === "loading"}
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-3 rounded-2xl font-bold text-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
              >
                {subStatus === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                <span>{subStatus === "loading" ? t.home.subscribing : t.home.subscribeBtn}</span>
              </button>
              {subStatus === "duplicate" && (
                <p className="text-center text-sm text-amber-600 font-medium">{t.home.subscribeDuplicate}</p>
              )}
              {subStatus === "error" && (
                <p className="text-center text-sm text-destructive font-medium">{t.home.subscribeError}</p>
              )}
            </form>
          )}
        </section>

        {/* Quick Links */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">{t.home.quickAccess}</h2>
          <div className="grid grid-cols-2 gap-4">
            {t.home.quickLinks.map((item, i) => {
              const Icon = quickLinkIcons[i];
              const style = quickLinkColors[i];
              return (
                <Link
                  key={i}
                  href={style.href}
                  className="flex flex-col p-5 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-md hover:border-border transition-all active:scale-[0.98]"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${style.bg} ${style.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Tip of the Day */}
        <section className="bg-secondary/10 border border-secondary/20 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10">
            <h3 className="font-bold text-lg mb-2 text-secondary">{t.home.tipTitle}</h3>
            <p className="text-foreground/80 leading-relaxed text-sm">{t.home.tipText}</p>
          </div>
        </section>

        {/* Presentation Links */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">🎯 عرض التقديم</h2>
          <div className="flex flex-col gap-3">
            <Link
              href="/stats"
              className="flex items-center gap-4 p-4 bg-gradient-to-l from-sky-50 to-emerald-50 border border-sky-200 rounded-2xl hover:shadow-md active:scale-[0.98] transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-emerald-400 flex items-center justify-center shrink-0 text-xl shadow-sm">
                📊
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sky-700">الإحصائيات الحية</h3>
                <p className="text-xs text-sky-600/80 mt-0.5">أثر أمان في الوقت الفعلي — عدد المستخدمين، المزاج، JITAI</p>
              </div>
              <ArrowLeft className="w-4 h-4 text-sky-400" />
            </Link>

            <Link
              href="/video"
              className="flex items-center gap-4 p-4 bg-gradient-to-l from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl hover:shadow-md active:scale-[0.98] transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shrink-0 text-xl shadow-sm">
                🎬
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-violet-700">فيديو تعريفي بأمان</h3>
                <p className="text-xs text-violet-600/80 mt-0.5">المشكلة ← الحل ← الميزات ← الأثر المتوقع (دقيقتان)</p>
              </div>
              <ArrowLeft className="w-4 h-4 text-violet-400" />
            </Link>
          </div>
        </section>
      </div>
    </MobileLayout>
  );
}
