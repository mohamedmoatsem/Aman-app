import { useState } from "react";
import { Link } from "wouter";
import { Phone, BookHeart, CalendarDays, Users, ShieldCheck, HeartHandshake, Mail, Loader2, CheckCircle2 } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";

const moods = [
  {
    emoji: "😰",
    label: "قلق",
    color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
    selectedColor: "bg-orange-100 border-orange-400 ring-2 ring-orange-300",
    response: "أنت لست وحدك. تنفس بعمق ببطء... هل جربت تمرين التنفس لمدة 5 دقائق؟ نحن هنا معك.",
    responseColor: "bg-orange-50 border-orange-200 text-orange-800",
    icon: "🌬️",
  },
  {
    emoji: "😔",
    label: "حزين",
    color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    selectedColor: "bg-blue-100 border-blue-400 ring-2 ring-blue-300",
    response: "لا بأس بأن تحزن. امنح نفسك وقتاً للراحة والتعافي. نحن هنا لنسمعك ونساندك دائماً.",
    responseColor: "bg-blue-50 border-blue-200 text-blue-800",
    icon: "💙",
  },
  {
    emoji: "😫",
    label: "متوتر",
    color: "bg-red-50 border-red-200 hover:bg-red-100",
    selectedColor: "bg-red-100 border-red-400 ring-2 ring-red-300",
    response: "خذ شهيقاً عميقاً وأبطئ قليلاً. الضغط سيزول تدريجياً. تذكر أنك أقوى مما تظن.",
    responseColor: "bg-red-50 border-red-200 text-red-800",
    icon: "🌿",
  },
  {
    emoji: "😌",
    label: "هادئ",
    color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
    selectedColor: "bg-emerald-100 border-emerald-400 ring-2 ring-emerald-300",
    response: "رائع! حافظ على هذا السلام الداخلي. شارك هذا الشعور الجميل مع من تحب.",
    responseColor: "bg-emerald-50 border-emerald-200 text-emerald-800",
    icon: "✨",
  },
];

const quickLinks = [
  { href: "/resources", icon: BookHeart, title: "الموارد", desc: "مقالات ونصائح", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { href: "/workshops", icon: CalendarDays, title: "الورش", desc: "فعاليات قادمة", color: "text-amber-500", bg: "bg-amber-500/10" },
  { href: "/community", icon: Users, title: "المجتمع", desc: "شارك قصتك", color: "text-sky-500", bg: "bg-sky-500/10" },
  { href: "/resources", icon: ShieldCheck, title: "الحماية", desc: "إرشادات الأمان", color: "text-indigo-500", bg: "bg-indigo-500/10" },
];

export default function Home() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");

  const currentMood = selectedMood !== null ? moods[selectedMood] : null;

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
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md p-3 mb-6 shadow-lg border border-white/20">
            <img
              src={`${import.meta.env.BASE_URL}images/logo.png`}
              alt="أمان Logo"
              className="w-full h-full object-contain brightness-0 invert"
            />
          </div>
          <h1 className="text-3xl font-extrabold mb-3 leading-tight drop-shadow-md">
            أهلاً بك في أمان
          </h1>
          <p className="text-primary-foreground/90 text-base max-w-[280px] leading-relaxed mb-8">
            نحن هنا لدعمك وحمايتك. مساحتك الآمنة للتواصل، التعلم، والنمو.
          </p>

          <div className="flex flex-col gap-3">
            <a
              href="tel:999"
              className="flex items-center justify-center gap-3 w-full bg-white text-primary px-6 py-4 rounded-2xl font-bold text-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:scale-[1.02] active:scale-95 transition-all duration-200"
            >
              <Phone className="w-5 h-5 fill-current" />
              <span>احصل على الدعم الطارئ</span>
            </a>

            <Link
              href="/resources"
              className="flex items-center justify-center gap-3 w-full bg-black/10 backdrop-blur-md border border-white/20 text-white px-6 py-4 rounded-2xl font-semibold text-lg hover:bg-black/20 active:scale-95 transition-all duration-200"
            >
              <HeartHandshake className="w-5 h-5" />
              <span>تصفح الموارد والنصائح</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 pb-12 rounded-t-[32px] bg-background -mt-6 relative z-20 flex flex-col gap-8 shadow-[0_-8px_30px_rgba(0,0,0,0.05)]">

        {/* Mood Checker */}
        <section className="bg-card border border-border/60 rounded-3xl p-6 shadow-sm">
          <div className="text-center mb-5">
            <h2 className="text-lg font-bold text-foreground">كيف تشعر الآن؟</h2>
            <p className="text-sm text-muted-foreground mt-1">اضغط على ما يعبّر عن حالك</p>
          </div>

          <div className="grid grid-cols-4 gap-3 mb-4">
            {moods.map((mood, i) => (
              <button
                key={i}
                onClick={() => setSelectedMood(selectedMood === i ? null : i)}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all duration-200 active:scale-95 ${
                  selectedMood === i ? mood.selectedColor : mood.color
                }`}
              >
                <span className="text-3xl leading-none">{mood.emoji}</span>
                <span className="text-xs font-semibold text-foreground/80">{mood.label}</span>
              </button>
            ))}
          </div>

          {currentMood && (
            <div
              className={`flex items-start gap-3 p-4 rounded-2xl border text-sm leading-relaxed font-medium transition-all duration-300 ${currentMood.responseColor}`}
            >
              <span className="text-xl shrink-0">{currentMood.icon}</span>
              <p>{currentMood.response}</p>
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
              <h2 className="text-base font-bold text-foreground">رسائل دعم يومية</h2>
              <p className="text-xs text-muted-foreground">اشترك ليصلك دعم أمان كل يوم</p>
            </div>
          </div>

          {subStatus === "success" ? (
            <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
              <p className="text-sm font-medium">شكراً لك! سنرسل لك رسائل الأمان قريباً. 💚</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setSubStatus("idle"); }}
                placeholder="أدخل بريدك الإلكتروني"
                className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                dir="ltr"
                required
              />
              <button
                type="submit"
                disabled={subStatus === "loading"}
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-3 rounded-2xl font-bold text-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-60"
              >
                {subStatus === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Mail className="w-4 h-4" />
                )}
                <span>{subStatus === "loading" ? "جارٍ الاشتراك..." : "اشترك الآن"}</span>
              </button>
              {subStatus === "duplicate" && (
                <p className="text-center text-sm text-amber-600 font-medium">هذا البريد الإلكتروني مشترك بالفعل ✓</p>
              )}
              {subStatus === "error" && (
                <p className="text-center text-sm text-destructive font-medium">حدث خطأ، يرجى المحاولة مجدداً</p>
              )}
            </form>
          )}
        </section>

        {/* Quick Links */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">الوصول السريع</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {quickLinks.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="flex flex-col p-5 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-md hover:border-border transition-all active:scale-[0.98]"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.bg} ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Tip of the Day */}
        <section className="bg-secondary/10 border border-secondary/20 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10">
            <h3 className="text-secondary-foreground font-bold text-lg mb-2 text-secondary">نصيحة اليوم</h3>
            <p className="text-foreground/80 leading-relaxed text-sm">
              لا تتردد في طلب المساعدة عندما تشعر بعدم الأمان. المجتمع هنا لدعمك وتوفير بيئة خالية من الأحكام.
            </p>
          </div>
        </section>
      </div>
    </MobileLayout>
  );
}
