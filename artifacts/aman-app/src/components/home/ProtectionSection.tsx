import { useState } from "react";
import {
  ShieldCheck, ChevronDown, Wind, Users, CalendarRange,
  Newspaper, Salad, Home, CheckCircle2, ExternalLink, Scale
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

// ─── Bilingual data ─────────────────────────────────────────────────────────

const TIPS = [
  {
    icon: Wind,
    color: "text-sky-600",
    bg: "bg-sky-50",
    title: "التنفس العميق والاسترخاء",
    titleEn: "Deep Breathing & Relaxation",
    desc: "خذ 5 شهيقات عميقة بطيئة — شهيق 4 ثوانٍ، احبس ثانيتين، زفير 6 ثوانٍ. هذا التمرين يخفّض الكورتيزول ويهدّئ الجهاز العصبي خلال دقيقتين.",
    descEn: "Take 5 slow deep breaths — inhale for 4 seconds, hold for 2, exhale for 6. This exercise lowers cortisol and calms the nervous system within 2 minutes.",
  },
  {
    icon: Users,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    title: "التواصل مع من تثق به",
    titleEn: "Connect with Someone You Trust",
    desc: "تحدّث مع شخص واحد على الأقل كل يوم — صديق أو فرد من الأسرة. العزلة تُضاعف الألم النفسي. الحديث البسيط يُخفف العبء.",
    descEn: "Talk to at least one person every day — a friend or family member. Isolation doubles psychological pain. Even a simple conversation lightens the burden.",
  },
  {
    icon: CalendarRange,
    color: "text-violet-600",
    bg: "bg-violet-50",
    title: "الحفاظ على روتين يومي",
    titleEn: "Maintain a Daily Routine",
    desc: "حدّد وقتاً منتظماً للنوم، الأكل، والحركة. الروتين يمنح الدماغ إحساساً بالاستقرار والتحكم وسط الفوضى.",
    descEn: "Set regular times for sleep, eating, and movement. Routine gives the brain a sense of stability and control amidst chaos.",
  },
  {
    icon: Newspaper,
    color: "text-amber-600",
    bg: "bg-amber-50",
    title: "تقليل التعرض للأخبار السلبية",
    titleEn: "Limit Exposure to Negative News",
    desc: "خصّص وقتاً محدداً لمتابعة الأخبار (مرة أو مرتين يومياً كحد أقصى). التعرض المتواصل لأخبار الحرب والأزمات يرفع مستوى القلق المزمن.",
    descEn: "Set specific times for following the news (once or twice a day at most). Continuous exposure to war and crisis coverage raises chronic anxiety.",
  },
  {
    icon: Salad,
    color: "text-green-600",
    bg: "bg-green-50",
    title: "العناية بالجسم",
    titleEn: "Care for Your Body",
    desc: "النوم الكافي (7–8 ساعات)، الغذاء المتوازن، وأي نشاط جسدي خفيف — حتى المشي 20 دقيقة يومياً — تُحسّن المزاج بشكل ملحوظ.",
    descEn: "Adequate sleep (7–8 hours), balanced nutrition, and any light physical activity — even 20 minutes of walking daily — noticeably improve your mood.",
  },
  {
    icon: Home,
    color: "text-rose-600",
    bg: "bg-rose-50",
    title: "إيجاد مكان آمن نفسياً",
    titleEn: "Find a Psychologically Safe Space",
    desc: "تخيّل أو ابحث عن مكان تشعر فيه بالأمان والهدوء. التخيّل الإيجابي تقنية معرفية مُثبتة علمياً لتخفيف الصدمات والتوتر.",
    descEn: "Imagine or find a place where you feel safe and calm. Positive visualisation is a scientifically proven cognitive technique for alleviating trauma and stress.",
  },
];

const RIGHTS = [
  {
    title: "الحق في الرعاية دون تمييز",
    titleEn: "Right to Care Without Discrimination",
    desc: "لكل إنسان الحق في الحصول على خدمات الصحة النفسية بغض النظر عن جنسيته، جنسه، دينه، أو وضعه الاقتصادي.",
    descEn: "Every person has the right to mental health services regardless of nationality, gender, religion, or economic status.",
  },
  {
    title: "الحق في الخصوصية والسرية",
    titleEn: "Right to Privacy & Confidentiality",
    desc: "معلوماتك الصحية النفسية سرية تماماً. لا يحق للمزود الكشف عنها دون موافقتك الصريحة إلا في حالات الخطر الفوري.",
    descEn: "Your mental health information is completely confidential. Providers may not disclose it without your explicit consent except in cases of immediate danger.",
  },
  {
    title: "الحق في الموافقة المستنيرة",
    titleEn: "Right to Informed Consent",
    desc: "لك الحق في الحصول على معلومات كاملة وواضحة عن أي علاج أو إجراء، وقبوله أو رفضه بحرية تامة.",
    descEn: "You have the right to receive complete and clear information about any treatment or procedure, and to accept or refuse it freely.",
  },
  {
    title: "الحق في الكرامة والاحترام",
    titleEn: "Right to Dignity & Respect",
    desc: "يجب أن تُعامَل في أي مرفق صحي بكرامة واحترام كامل. أي شكل من أشكال الإهانة أو الإكراه هو انتهاك صريح لحقوقك.",
    descEn: "You must be treated with full dignity and respect in any healthcare facility. Any form of humiliation or coercion is a clear violation of your rights.",
  },
  {
    title: "الحق في الاندماج المجتمعي",
    titleEn: "Right to Community Integration",
    desc: "وفق مبادئ منظمة الصحة العالمية، الرعاية النفسية المثلى تدعم بقاءك في مجتمعك وليس عزلك عنه.",
    descEn: "According to WHO principles, optimal mental health care supports your participation in your community, not your isolation from it.",
  },
  {
    title: "الحق في اللجوء للشكاوى",
    titleEn: "Right to Lodge Complaints",
    desc: "إذا انتُهكت حقوقك، يحق لك تقديم شكوى للجهات المختصة أو المفوضية السامية للأمم المتحدة لشؤون اللاجئين (UNHCR).",
    descEn: "If your rights are violated, you may file a complaint with the relevant authorities or the United Nations High Commissioner for Refugees (UNHCR).",
  },
];

const SOURCES = [
  {
    name: "منظمة الصحة العالمية",
    nameEn: "World Health Organization (WHO)",
    desc: "المرجع الدولي الأول لإرشادات الصحة النفسية والأزمات الإنسانية.",
    descEn: "The primary international reference for mental health guidelines and humanitarian crises.",
    url: "https://www.who.int/ar/news-room/fact-sheets/detail/mental-health-strengthening-our-response",
    badge: "مرجع رسمي",
    badgeEn: "Official Reference",
    badgeColor: "bg-sky-100 text-sky-700",
    iconColor: "text-sky-500",
  },
  {
    name: "المفوضية السامية للأمم المتحدة للاجئين",
    nameEn: "UNHCR",
    desc: "إرشادات الدعم النفسي الاجتماعي للمهجّرين وضحايا النزاعات.",
    descEn: "Guidance on psychosocial support for displaced persons and conflict survivors.",
    url: "https://www.unhcr.org/mental-health-and-psychosocial-support.html",
    badge: "حقوق الإنسان",
    badgeEn: "Human Rights",
    badgeColor: "bg-indigo-100 text-indigo-700",
    iconColor: "text-indigo-500",
  },
  {
    name: "أطباء بلا حدود",
    nameEn: "Médecins Sans Frontières (MSF)",
    desc: "موارد للدعم النفسي في مناطق النزاعات والطوارئ الإنسانية.",
    descEn: "Resources for psychological support in conflict zones and humanitarian emergencies.",
    url: "https://www.msf.org/mental-health",
    badge: "طوارئ إنسانية",
    badgeEn: "Humanitarian Emergency",
    badgeColor: "bg-rose-100 text-rose-700",
    iconColor: "text-rose-500",
  },
  {
    name: "الاتحاد الدولي للصحة النفسية",
    nameEn: "World Federation for Mental Health (WFMH)",
    desc: "مبادئ وحقوق المرضى النفسيين على المستوى الدولي.",
    descEn: "Principles and rights of mental health patients at the international level.",
    url: "https://wfmh.global",
    badge: "حقوق المرضى",
    badgeEn: "Patient Rights",
    badgeColor: "bg-emerald-100 text-emerald-700",
    iconColor: "text-emerald-500",
  },
  {
    name: "منظمة هيومن رايتس ووتش",
    nameEn: "Human Rights Watch (HRW)",
    desc: "تقارير وتوثيقات حول انتهاكات الصحة النفسية في مناطق النزاع.",
    descEn: "Reports and documentation on mental health violations in conflict zones.",
    url: "https://www.hrw.org/topic/health",
    badge: "حقوق الإنسان",
    badgeEn: "Human Rights",
    badgeColor: "bg-amber-100 text-amber-700",
    iconColor: "text-amber-500",
  },
];

type TabId = "tips" | "rights" | "sources";

// ─── Component ──────────────────────────────────────────────────────────────

export default function ProtectionSection() {
  const { t, lang } = useLanguage();
  const p = t.protection;

  const [activeTab, setActiveTab] = useState<TabId>("tips");
  const [expandedTip, setExpandedTip] = useState<number | null>(null);
  const [expandedRight, setExpandedRight] = useState<number | null>(null);

  return (
    <section id="protection" aria-labelledby="protection-heading" dir={t.dir}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 id="protection-heading" className="text-lg font-extrabold text-foreground leading-tight">
            {p.heading}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {p.subheading}
          </p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 mb-5 bg-muted/60 p-1 rounded-2xl">
        {p.tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabId)}
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

      {/* ── Tab: Tips ─────────────────────────────────────────────────── */}
      {activeTab === "tips" && (
        <div className="flex flex-col gap-2.5">
          {TIPS.map((tip, i) => {
            const Icon = tip.icon;
            const open = expandedTip === i;
            const label = lang === "en" ? tip.titleEn : tip.title;
            const detail = lang === "en" ? tip.descEn : tip.desc;
            return (
              <div
                key={i}
                className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setExpandedTip(open ? null : i)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 ${t.dir === "rtl" ? "text-right" : "text-left"}`}
                  aria-expanded={open}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${tip.bg}`}>
                    <Icon className={`w-4.5 h-4.5 ${tip.color}`} strokeWidth={2} />
                  </div>
                  <span className={`flex-1 text-sm font-bold text-foreground ${t.dir === "rtl" ? "text-right" : "text-left"}`}>
                    {label}
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
                        {detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* WHO source note */}
          <p className="text-[11px] text-muted-foreground text-center mt-1 leading-relaxed">
            {p.whoNote}{" — "}
            <a
              href="https://www.who.int"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              {p.whoLinkLabel}
            </a>
          </p>
        </div>
      )}

      {/* ── Tab: Rights ───────────────────────────────────────────────── */}
      {activeTab === "rights" && (
        <div className="flex flex-col gap-2.5">
          {/* WHO badge */}
          <div className="flex items-center gap-2.5 p-3 bg-sky-50 border border-sky-200 rounded-2xl mb-1">
            <Scale className="w-4 h-4 text-sky-600 shrink-0" />
            <p className="text-xs text-sky-700 font-semibold leading-relaxed">
              {p.rightsNote}{" "}
              <a
                href="https://www.who.int/publications/i/item/9789241549066"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                {p.whoLinkLabel}
              </a>
            </p>
          </div>

          {RIGHTS.map((right, i) => {
            const open = expandedRight === i;
            const label = lang === "en" ? right.titleEn : right.title;
            const detail = lang === "en" ? right.descEn : right.desc;
            return (
              <div
                key={i}
                className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setExpandedRight(open ? null : i)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 ${t.dir === "rtl" ? "text-right" : "text-left"}`}
                  aria-expanded={open}
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className={`flex-1 text-sm font-bold text-foreground ${t.dir === "rtl" ? "text-right" : "text-left"}`}>
                    {label}
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
                        {detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Tab: Sources ──────────────────────────────────────────────── */}
      {activeTab === "sources" && (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-muted-foreground leading-relaxed mb-1">
            {p.sourcesIntro}
          </p>

          {SOURCES.map((src, i) => {
            const name = lang === "en" ? src.nameEn : src.name;
            const desc = lang === "en" ? src.descEn : src.desc;
            const badge = lang === "en" ? src.badgeEn : src.badge;
            return (
              <a
                key={i}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 bg-card border border-border/60 rounded-2xl shadow-sm hover:shadow-md hover:border-border transition-all active:scale-[0.98] group"
              >
                <div className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center shrink-0 mt-0.5">
                  <ExternalLink className={`w-4 h-4 ${src.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-bold text-sm text-foreground leading-tight">
                      {name}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${src.badgeColor}`}>
                      {badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground font-medium mb-1">{src.nameEn}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-1 group-hover:text-primary transition-colors" />
              </a>
            );
          })}

          <p className="text-[11px] text-muted-foreground text-center mt-1 leading-relaxed">
            {p.sourcesFooter}
          </p>
        </div>
      )}
    </section>
  );
}
