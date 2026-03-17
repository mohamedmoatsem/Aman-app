import { useState } from "react";
import { useLocation } from "wouter";
import MobileLayout from "@/components/layout/MobileLayout";
import { recoveryStories, modernTechniques, scientificStrategies } from "@/data/depression";
import { ArrowRight, BookOpen, ChevronDown, ChevronUp, Heart, Sparkles, Star, Users } from "lucide-react";

declare global {
  interface Window {
    openArticle: (title: string, body: string) => void;
  }
}

type Tab = "stories" | "techniques" | "strategies";

export default function Depression() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<Tab>("stories");
  const [expandedStrategy, setExpandedStrategy] = useState<number | null>(null);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "stories",    label: "قصص الشفاء",      icon: <Heart className="w-4 h-4" /> },
    { id: "techniques", label: "تقنيات علمية",     icon: <Sparkles className="w-4 h-4" /> },
    { id: "strategies", label: "استراتيجيات",      icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <MobileLayout>
      {/* Header */}
      <div className="bg-gradient-to-b from-[#0EA5E9]/10 to-transparent px-4 pt-5 pb-4">
        <button
          onClick={() => navigate("/resources")}
          className="flex items-center gap-1 text-primary text-sm font-medium mb-4"
        >
          <ArrowRight className="w-4 h-4" />
          العودة للموارد
        </button>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-primary/15 rounded-2xl">
            <Heart className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">رحلة الشفاء من الاكتئاب</h1>
            <p className="text-xs text-muted-foreground mt-0.5">قصص حقيقية · تقنيات حديثة · استراتيجيات علمية</p>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[
            { value: "350م+", label: "يعانون الاكتئاب عالمياً" },
            { value: "80%",   label: "يتعافون بالعلاج المناسب" },
            { value: "4 أسابيع", label: "متوسط بداية التحسن" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/70 rounded-2xl p-3 text-center border border-primary/10 shadow-sm">
              <p className="text-primary font-bold text-base">{stat.value}</p>
              <p className="text-muted-foreground text-[10px] leading-tight mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 sticky top-0 bg-background/95 backdrop-blur z-10 py-3 border-b border-border">
        <div className="flex gap-1 bg-muted rounded-2xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-5 flex flex-col gap-5 pb-24">

        {/* ===== STORIES TAB ===== */}
        {activeTab === "stories" && (
          <>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
              <Users className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 leading-relaxed">
                هذه قصص حقيقية لأشخاص تجاوزوا الاكتئاب. أسماؤهم مُغيَّرة للخصوصية.
                إذا كنت تمر بتجربة مشابهة، فأنت لست وحدك.
              </p>
            </div>

            {recoveryStories.map((story) => (
              <div key={story.id} className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
                {/* Story header */}
                <div className="p-5 pb-0 flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg font-bold shrink-0"
                    style={{ backgroundColor: story.color }}
                  >
                    {story.initials}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{story.name}، {story.age} عاماً</h3>
                    <p className="text-xs text-muted-foreground">عاش مع الاكتئاب: {story.duration}</p>
                  </div>
                </div>

                {/* Story body */}
                <div className="p-5 flex flex-col gap-4">
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">📖 القصة</p>
                    <p className="text-sm text-foreground leading-relaxed">{story.story}</p>
                  </div>

                  <div className="bg-primary/5 border border-primary/15 rounded-2xl p-4">
                    <p className="text-xs font-bold text-primary mb-2">✨ نقطة التحول</p>
                    <p className="text-sm text-foreground leading-relaxed italic">{story.turning}</p>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                    <p className="text-xs font-bold text-emerald-700 mb-2">🌱 الآن</p>
                    <p className="text-sm text-emerald-800 leading-relaxed">{story.now}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Encouragement */}
            <div className="bg-gradient-to-br from-primary/10 to-emerald-500/10 border border-primary/20 rounded-3xl p-5 text-center">
              <Star className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-bold text-foreground mb-2">قصتك لم تنته بعد</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                الشفاء ليس خطاً مستقيماً، بل رحلة بها تقدم وتراجع.
                كل يوم تستمر فيه هو انتصار يستحق الاعتراف.
              </p>
            </div>
          </>
        )}

        {/* ===== TECHNIQUES TAB ===== */}
        {activeTab === "techniques" && (
          <>
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4">
              <p className="text-sm text-purple-800 leading-relaxed">
                <strong>ملاحظة طبية:</strong> هذه المعلومات للتثقيف فقط. اختيار العلاج المناسب يتطلب
                تقييم متخصص مؤهل في الصحة النفسية.
              </p>
            </div>

            {modernTechniques.map((tech) => (
              <div key={tech.id} className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                      style={{ backgroundColor: `${tech.color}20` }}
                    >
                      {tech.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground leading-tight">{tech.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5 font-medium">{tech.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{tech.description}</p>

                  <div className="mb-4">
                    <p className="text-xs font-bold text-foreground mb-2">كيف يعمل / خطواته:</p>
                    <ul className="flex flex-col gap-2">
                      {tech.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                          <span
                            className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5"
                            style={{ backgroundColor: tech.color }}
                          >
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-muted/60 rounded-2xl p-3">
                    <p className="text-[11px] font-bold text-muted-foreground mb-1">📚 الدليل العلمي</p>
                    <p className="text-xs text-foreground leading-relaxed">{tech.evidence}</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* ===== STRATEGIES TAB ===== */}
        {activeTab === "strategies" && (
          <>
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4">
              <p className="text-sm text-teal-800 leading-relaxed">
                استراتيجيات موثقة علمياً يمكن دمجها مع العلاج المتخصص لتسريع التعافي.
                المراجع من دوريات علمية محكّمة.
              </p>
            </div>

            {scientificStrategies.map((strategy) => (
              <div key={strategy.id} className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
                <button
                  className="w-full p-5 text-right flex items-start gap-3"
                  onClick={() =>
                    setExpandedStrategy(expandedStrategy === strategy.id ? null : strategy.id)
                  }
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {strategy.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground text-base leading-tight text-right">
                      {strategy.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed text-right">
                      {strategy.summary}
                    </p>
                  </div>
                  <div className="shrink-0 mt-1 text-muted-foreground">
                    {expandedStrategy === strategy.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {expandedStrategy === strategy.id && (
                  <div className="px-5 pb-5 flex flex-col gap-4 border-t border-border pt-4">
                    <div
                      className="text-sm text-foreground leading-loose whitespace-pre-line"
                      dangerouslySetInnerHTML={{ __html: strategy.detail.replace(/\n/g, "<br/>") }}
                    />

                    <div className="bg-muted/50 rounded-2xl p-4">
                      <p className="text-xs font-bold text-muted-foreground mb-3">📚 المراجع العلمية</p>
                      <ul className="flex flex-col gap-2">
                        {strategy.references.map((ref, i) => (
                          <li key={i} className="text-[11px] text-muted-foreground leading-relaxed flex gap-2">
                            <span className="text-primary font-bold shrink-0">[{i + 1}]</span>
                            {ref}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Emergency note */}
            <div className="bg-rose-50 border border-rose-200 rounded-3xl p-5">
              <h3 className="font-bold text-rose-700 mb-2">إذا كنت في أزمة الآن</h3>
              <p className="text-sm text-rose-800 leading-relaxed mb-3">
                إذا كانت لديك أفكار إيذاء النفس، تواصل فوراً مع خط مساندة الصحة النفسية
                أو اذهب لأقرب طوارئ مستشفى.
              </p>
              <a
                href="tel:920033360"
                className="block w-full text-center bg-rose-600 text-white font-bold py-3 rounded-2xl text-sm active:scale-95 transition-transform"
              >
                📞 اتصل بخط مساندة: 920033360
              </a>
            </div>
          </>
        )}
      </div>
    </MobileLayout>
  );
}
