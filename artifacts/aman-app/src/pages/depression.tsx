import { useState } from "react";
import { useLocation } from "wouter";
import MobileLayout from "@/components/layout/MobileLayout";
import { recoveryStories, modernTechniques, scientificStrategies } from "@/data/depression";
import { ArrowRight, ArrowLeft, BookOpen, ChevronDown, ChevronUp, Heart, Sparkles, Star, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Tab = "stories" | "techniques" | "strategies";

export default function Depression() {
  const [, navigate] = useLocation();
  const { t, lang } = useLanguage();
  const d = t.depression;

  const [activeTab, setActiveTab] = useState<Tab>("stories");
  const [expandedStrategy, setExpandedStrategy] = useState<number | null>(null);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "stories",    label: d.tabs[0].label, icon: <Heart className="w-4 h-4" /> },
    { id: "techniques", label: d.tabs[1].label, icon: <Sparkles className="w-4 h-4" /> },
    { id: "strategies", label: d.tabs[2].label, icon: <BookOpen className="w-4 h-4" /> },
  ];

  const BackArrow = t.dir === "rtl" ? ArrowRight : ArrowLeft;

  return (
    <MobileLayout>
      {/* Header */}
      <div className="bg-gradient-to-b from-[#0EA5E9]/10 to-transparent px-4 pt-5 pb-4">
        <button
          onClick={() => navigate("/resources")}
          className="flex items-center gap-1 text-primary text-sm font-medium mb-4"
        >
          <BackArrow className="w-4 h-4" />
          {d.back}
        </button>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-primary/15 rounded-2xl">
            <Heart className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">{d.title}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">{d.subtitle}</p>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {d.stats.map((stat) => (
            <div key={stat.label} className="bg-white/70 rounded-2xl p-3 text-center border border-primary/10 shadow-sm">
              <p className="text-primary font-bold text-base">{stat.value}</p>
              <p className="text-muted-foreground text-[10px] leading-tight mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 pb-3">
        <div className="flex bg-muted rounded-2xl p-1 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-white text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="px-4 pb-8 flex flex-col gap-4">

        {/* ── Stories tab ── */}
        {activeTab === "stories" && recoveryStories.map((story) => (
          <div key={story.id} className="bg-card border border-border rounded-3xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0"
                style={{ background: story.color }}
              >
                {story.initials}
              </div>
              <div>
                <p className="font-bold text-foreground">{lang === "en" ? story.nameEn : story.name}</p>
                <p className="text-xs text-muted-foreground">{story.age} {d.storiesAge} · {d.storiesDuration}: {lang === "en" ? story.durationEn : story.duration}</p>
              </div>
              <div className="mr-auto flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed mb-3 italic">"{lang === "en" ? story.storyEn : story.story}"</p>
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3 mb-2">
              <p className="text-xs font-bold text-emerald-700 mb-1">🔄 {d.storiesTurning}</p>
              <p className="text-xs text-emerald-800 leading-relaxed">{lang === "en" ? story.turningEn : story.turning}</p>
            </div>
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-3">
              <p className="text-xs font-bold text-primary mb-1">✨ {d.storiesNow}</p>
              <p className="text-xs text-foreground/70 leading-relaxed">{lang === "en" ? story.nowEn : story.now}</p>
            </div>
          </div>
        ))}

        {/* ── Techniques tab ── */}
        {activeTab === "techniques" && modernTechniques.map((tech) => (
          <div key={tech.id} className="bg-card border border-border rounded-3xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                style={{ background: tech.color + "20" }}
              >
                {tech.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground text-base leading-tight">{lang === "en" ? tech.titleEn : tech.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{tech.subtitle}</p>
              </div>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed mb-3">{lang === "en" ? tech.descriptionEn : tech.description}</p>
            <div className="bg-muted/50 rounded-2xl p-3 mb-3">
              <p className="text-xs font-bold text-foreground mb-2">{d.techniquesSteps}:</p>
              <ol className="flex flex-col gap-1">
                {(lang === "en" ? tech.stepsEn : tech.steps).map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-foreground/80">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5"
                      style={{ background: tech.color }}
                    >{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-2.5">
              <p className="text-[11px] text-amber-800 leading-relaxed">
                <strong>📊 {d.techniquesEvidence}:</strong> {lang === "en" ? tech.evidenceEn : tech.evidence}
              </p>
            </div>
          </div>
        ))}

        {/* ── Strategies tab ── */}
        {activeTab === "strategies" && scientificStrategies.map((strat) => (
          <div key={strat.id} className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
            <button
              onClick={() => setExpandedStrategy(expandedStrategy === strat.id ? null : strat.id)}
              className="w-full p-4 flex items-center gap-3 text-start"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {lang === "en" ? strat.categoryEn : strat.category}
                  </span>
                </div>
                <h3 className="font-bold text-foreground text-sm leading-tight">{lang === "en" ? strat.titleEn : strat.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">{lang === "en" ? strat.summaryEn : strat.summary}</p>
              </div>
              {expandedStrategy === strat.id
                ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
              }
            </button>

            {expandedStrategy === strat.id && (
              <div className="px-4 pb-4 border-t border-border">
                <p className="text-sm text-foreground/80 leading-relaxed mt-3 mb-3 whitespace-pre-line">{lang === "en" ? strat.detailEn : strat.detail}</p>
                {strat.references.length > 0 && (
                  <div className="bg-muted/50 rounded-xl p-3">
                    <p className="text-[11px] font-bold text-muted-foreground mb-1.5">{d.strategiesReferences}:</p>
                    {strat.references.map((ref, i) => (
                      <p key={i} className="text-[11px] text-muted-foreground leading-relaxed">• {ref}</p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

      </div>
    </MobileLayout>
  );
}
