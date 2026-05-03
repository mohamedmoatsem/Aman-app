import { useState } from "react";
import {
  ShieldCheck, ChevronDown, Wind, Users, CalendarRange,
  Newspaper, Salad, Home, CheckCircle2, ExternalLink, Scale
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Data ──────────────────────────────────────────────────────────────────────

const TIPS = [
  {
    icon: Wind,
    color: "text-sky-600",
    bg: "bg-sky-50",
    title: "التنفس العميق والاسترخاء",
    desc: "خذ 5 شهيقات عميقة بطيئة — شهيق 4 ثوانٍ، احبس ثانيتين، زفير 6 ثوانٍ. هذا التمرين يخفّض الكورتيزول ويهدّئ الجهاز العصبي خلال دقيقتين.",
  },
  {
    icon: Users,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    title: "التواصل مع من تثق به",
    desc: "تحدّث مع شخص واحد على الأقل كل يوم — صديق أو فرد من الأسرة. العزلة تُضاعف الألم النفسي. الحديث البسيط يُخفف العبء.",
  },
  {
    icon: CalendarRange,
    color: "text-violet-600",
    bg: "bg-violet-50",
    title: "الحفاظ على روتين يومي",
    desc: "حدّد وقتاً منتظماً للنوم، الأكل، والحركة. الروتين يمنح الدماغ إحساساً بالاستقرار والتحكم وسط الفوضى.",
  },
  {
    icon: Newspaper,
    color: "text-amber-600",
    bg: "bg-amber-50",
    title: "تقليل التعرض للأخبار السلبية",
    desc: "خصّص وقتاً محدداً لمتابعة الأخبار (مرة أو مرتين يومياً كحد أقصى). التعرض المتواصل لأخبار الحرب والأزمات يرفع مستوى القلق المزمن.",
  },
  {
    icon: Salad,
    color: "text-green-600",
    bg: "bg-green-50",
    title: "العناية بالجسم",
    desc: "النوم الكافي (7–8 ساعات)، الغذاء المتوازن، وأي نشاط جسدي خفيف — حتى المشي 20 دقيقة يومياً — تُحسّن المزاج بشكل ملحوظ.",
  },
  {
    icon: Home,
    color: "text-rose-600",
    bg: "bg-rose-50",
    title: "إيجاد مكان آمن نفسياً",
    desc: "تخيّل أو ابحث عن مكان تشعر فيه بالأمان والهدوء. التخيّل الإيجابي تقنية معرفية مُثبتة علمياً لتخفيف الصدمات والتوتر.",
  },
];

const RIGHTS = [
  {
    title: "الحق في الرعاية دون تمييز",
    desc: "لكل إنسان الحق في الحصول على خدمات الصحة النفسية بغض النظر عن جنسيته، جنسه، دينه، أو وضعه الاقتصادي.",
  },
  {
    title: "الحق في الخصوصية والسرية",
    desc: "معلوماتك الصحية النفسية سرية تماماً. لا يحق للمزود الكشف عنها دون موافقتك الصريحة إلا في حالات الخطر الفوري.",
  },
  {
    title: "الحق في الموافقة المستنيرة",
    desc: "لك الحق في الحصول على معلومات كاملة وواضحة عن أي علاج أو إجراء، وقبوله أو رفضه بحرية تامة.",
  },
  {
    title: "الحق في الكرامة والاحترام",
    desc: "يجب أن تُعامَل في أي مرفق صحي بكرامة واحترام كامل. أي شكل من أشكال الإهانة أو الإكراه هو انتهاك صريح لحقوقك.",
  },
  {
    title: "الحق في الاندماج المجتمعي",
    desc: "وفق مبادئ منظمة الصحة العالمية، الرعاية النفسية المثلى تدعم بقاءك في مجتمعك وليس عزلك عنه.",
  },
  {
    title: "الحق في اللجوء للشكاوى",
    desc: "إذا انتُهكت حقوقك، يحق لك تقديم شكوى للجهات المختصة أو المفوضية السامية للأمم المتحدة لشؤون اللاجئين (UNHCR).",
  },
];

const SOURCES = [
  {
    name: "منظمة الصحة العالمية",
    nameEn: "World Health Organization (WHO)",
    desc: "المرجع الدولي الأول لإرشادات الصحة النفسية والأزمات الإنسانية.",
    url: "https://www.who.int/ar/news-room/fact-sheets/detail/mental-health-strengthening-our-response",
    badge: "مرجع رسمي",
    badgeColor: "bg-sky-100 text-sky-700",
    iconColor: "text-sky-500",
  },
  {
    name: "المفوضية السامية للأمم المتحدة للاجئين",
    nameEn: "UNHCR",
    desc: "إرشادات الدعم النفسي الاجتماعي للمهجّرين وضحايا النزاعات.",
    url: "https://www.unhcr.org/mental-health-and-psychosocial-support.html",
    badge: "حقوق الإنسان",
    badgeColor: "bg-indigo-100 text-indigo-700",
    iconColor: "text-indigo-500",
  },
  {
    name: "أطباء بلا حدود",
    nameEn: "Médecins Sans Frontières (MSF)",
    desc: "موارد للدعم النفسي في مناطق النزاعات والطوارئ الإنسانية.",
    url: "https://www.msf.org/mental-health",
    badge: "طوارئ إنسانية",
    badgeColor: "bg-rose-100 text-rose-700",
    iconColor: "text-rose-500",
  },
  {
    name: "الاتحاد الدولي للصحة النفسية",
    nameEn: "World Federation for Mental Health (WFMH)",
    desc: "مبادئ وحقوق المرضى النفسيين على المستوى الدولي.",
    url: "https://wfmh.global",
    badge: "حقوق المرضى",
    badgeColor: "bg-emerald-100 text-emerald-700",
    iconColor: "text-emerald-500",
  },
  {
    name: "منظمة هيومن رايتس ووتش",
    nameEn: "Human Rights Watch (HRW)",
    desc: "تقارير وتوثيقات حول انتهاكات الصحة النفسية في مناطق النزاع.",
    url: "https://www.hrw.org/topic/health",
    badge: "حقوق الإنسان",
    badgeColor: "bg-amber-100 text-amber-700",
    iconColor: "text-amber-500",
  },
];

// ─── Tab definitions ───────────────────────────────────────────────────────────

const TABS = [
  { id: "tips",    label: "نصائح وقائية",   icon: "🛡️" },
  { id: "rights",  label: "حقوقك",           icon: "⚖️" },
  { id: "sources", label: "مصادر موثوقة",   icon: "🔗" },
] as const;
type TabId = typeof TABS[number]["id"];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function ProtectionSection() {
  const [activeTab, setActiveTab] = useState<TabId>("tips");
  const [expandedTip, setExpandedTip] = useState<number | null>(null);
  const [expandedRight, setExpandedRight] = useState<number | null>(null);

  return (
    <section aria-labelledby="protection-heading" dir="rtl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 id="protection-heading" className="text-lg font-extrabold text-foreground leading-tight">
            الحماية النفسية
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            نصائح · حقوق · مصادر WHO
          </p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 mb-5 bg-muted/60 p-1 rounded-2xl">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── Tab: Tips ──────────────────────────────────────────────────── */}
      {activeTab === "tips" && (
        <div className="flex flex-col gap-2.5">
          {TIPS.map((tip, i) => {
            const Icon = tip.icon;
            const open = expandedTip === i;
            return (
              <div
                key={i}
                className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setExpandedTip(open ? null : i)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-right"
                  aria-expanded={open}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${tip.bg}`}>
                    <Icon className={`w-4.5 h-4.5 ${tip.color}`} strokeWidth={2} />
                  </div>
                  <span className="flex-1 text-sm font-bold text-foreground text-right">
                    {tip.title}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 pt-0.5 text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                        {tip.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* WHO source note */}
          <p className="text-[11px] text-muted-foreground text-center mt-1 leading-relaxed">
            هذه النصائح مستندة إلى إرشادات{" "}
            <a
              href="https://www.who.int"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              منظمة الصحة العالمية
            </a>{" "}
            للدعم النفسي في الأزمات
          </p>
        </div>
      )}

      {/* ── Tab: Rights ────────────────────────────────────────────────── */}
      {activeTab === "rights" && (
        <div className="flex flex-col gap-2.5">
          {/* WHO badge */}
          <div className="flex items-center gap-2.5 p-3 bg-sky-50 border border-sky-200 rounded-2xl mb-1">
            <Scale className="w-4 h-4 text-sky-600 shrink-0" />
            <p className="text-xs text-sky-700 font-semibold leading-relaxed">
              هذه الحقوق مُعترف بها دولياً وفق{" "}
              <a
                href="https://www.who.int/publications/i/item/9789241549066"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                مبادئ منظمة الصحة العالمية للصحة النفسية
              </a>
            </p>
          </div>

          {RIGHTS.map((right, i) => {
            const open = expandedRight === i;
            return (
              <div
                key={i}
                className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setExpandedRight(open ? null : i)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-right"
                  aria-expanded={open}
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="flex-1 text-sm font-bold text-foreground text-right">
                    {right.title}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 pt-0.5 text-sm text-muted-foreground leading-relaxed border-t border-border/40">
                        {right.desc}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Tab: Sources ───────────────────────────────────────────────── */}
      {activeTab === "sources" && (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-muted-foreground leading-relaxed mb-1">
            مصادر علمية وإنسانية موثوقة تُقدّم محتوى معتمداً حول الصحة النفسية وحقوق الإنسان:
          </p>

          {SOURCES.map((src, i) => (
            <a
              key={i}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 bg-card border border-border/60 rounded-2xl shadow-sm hover:shadow-md hover:border-border transition-all active:scale-[0.98] group"
            >
              <div className={`w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0 mt-0.5`}>
                <ExternalLink className={`w-4 h-4 ${src.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-bold text-sm text-foreground leading-tight">
                    {src.name}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${src.badgeColor}`}>
                    {src.badge}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground font-medium mb-1">{src.nameEn}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{src.desc}</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-1 group-hover:text-primary transition-colors" />
            </a>
          ))}

          <p className="text-[11px] text-muted-foreground text-center mt-1 leading-relaxed">
            جميع الروابط تُفتح في متصفحك — تطبيق أمان لا يحتفظ ببيانات تصفحك
          </p>
        </div>
      )}
    </section>
  );
}
