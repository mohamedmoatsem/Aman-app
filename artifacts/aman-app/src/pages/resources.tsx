import { useState, useEffect, useCallback } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import Header from "@/components/layout/Header";
import { useResources } from "@/hooks/use-resources";
import { BookOpen, AlertCircle, ArrowLeft, Heart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { mentalHealthArticles } from "@/data/articles";
import { useLocation } from "wouter";
import { ArticleModal } from "@/components/ui/ArticleModal";

declare global {
  interface Window {
    openArticle: (title: string, body: string) => void;
  }
}

const categoryColorsByEn: Record<string, string> = {
  "Anxiety":       "bg-blue-100 text-blue-700",
  "Depression":    "bg-purple-100 text-purple-700",
  "Relaxation":    "bg-green-100 text-green-700",
  "Relationships": "bg-pink-100 text-pink-700",
  "Sleep":         "bg-indigo-100 text-indigo-700",
  "Trauma":        "bg-orange-100 text-orange-700",
  "Self-Esteem":   "bg-yellow-100 text-yellow-700",
  "Emotions":      "bg-red-100 text-red-700",
  "Mental Health": "bg-teal-100 text-teal-700",
};

export default function Resources() {
  const { data: resources, isLoading, error } = useResources();
  const { t, lang } = useLanguage();
  const r = t.resources;
  const [, navigate] = useLocation();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  const openArticle = useCallback((title: string, body: string) => {
    setModalTitle(title);
    setModalBody(body);
    setModalOpen(true);
  }, []);

  useEffect(() => {
    window.openArticle = openArticle;
    return () => { window.openArticle = () => {}; };
  }, [openArticle]);

  const openArticleById = (article: typeof mentalHealthArticles[0]) => {
    const title   = lang === "en" ? article.titleEn   : article.title;
    const content = lang === "en" ? article.contentEn : article.content;
    openArticle(title, content);
  };

  return (
    <MobileLayout>
      <Header title={r.pageTitle} />

      <div className="px-4 py-6 flex flex-col gap-6">
        <div className="bg-gradient-to-br from-primary/10 to-transparent p-5 rounded-3xl border border-primary/10">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-primary/20 text-primary rounded-2xl shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-foreground mb-1">{r.libraryTitle}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.libraryDesc}</p>
            </div>
          </div>
        </div>

        {/* Depression recovery section banner */}
        <button
          onClick={() => navigate("/depression")}
          className="w-full bg-gradient-to-l from-purple-500/10 via-primary/10 to-emerald-500/10 border border-primary/20 rounded-3xl p-5 flex items-center gap-4 text-right active:scale-[0.98] transition-transform"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">{r.depressionNew}</span>
            </div>
            <h3 className="font-bold text-foreground text-base leading-tight">{r.depressionTitle}</h3>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.depressionDesc}</p>
          </div>
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-500 rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <ArrowLeft className="w-4 h-4 text-primary" />
          </div>
        </button>

        {/* Featured article */}
        <div className="bg-primary/5 border border-primary/20 rounded-3xl p-5 flex items-center justify-between gap-4">
          <div className="flex-1">
            <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{r.featuredBadge}</span>
            <h3 className="font-bold text-foreground mt-2 mb-1">
              {lang === "en" ? mentalHealthArticles[0].titleEn : mentalHealthArticles[0].title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {lang === "en" ? mentalHealthArticles[0].summaryEn : mentalHealthArticles[0].summary}
            </p>
          </div>
          <button
            onClick={() => openArticleById(mentalHealthArticles[0])}
            className="shrink-0 bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-xl hover:opacity-90 active:scale-95 transition-all"
          >
            {r.readMore}
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {isLoading && Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3 p-4 bg-card rounded-3xl border border-border shadow-sm">
              <Skeleton className="h-40 w-full rounded-2xl" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full mt-2" />
            </div>
          ))}

          {error && (
            <div className="p-6 bg-destructive/10 text-destructive rounded-3xl flex flex-col items-center justify-center text-center gap-3">
              <AlertCircle className="w-10 h-10" />
              <p className="font-medium">{r.error}</p>
            </div>
          )}

          {resources?.map((resource) => (
            <article
              key={resource.id}
              className="bg-card rounded-[24px] overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {resource.imageUrl ? (
                <div className="h-48 w-full bg-muted relative">
                  <img
                    src={resource.imageUrl}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                    {resource.category}
                  </div>
                </div>
              ) : (
                <div className="px-5 pt-5 pb-0">
                  <span className="bg-primary/10 px-3 py-1 rounded-full text-xs font-bold text-primary">
                    {resource.category}
                  </span>
                </div>
              )}

              <div className="p-5 flex flex-col gap-2">
                <h3 className="font-bold text-lg text-foreground leading-tight">{resource.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{resource.description}</p>
                <button
                  onClick={() => openArticle(resource.title, resource.description)}
                  className="mt-3 text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all w-fit"
                >
                  {r.readMore}
                </button>
              </div>
            </article>
          ))}

          {resources?.length === 0 && (
            <div className="py-12 flex flex-col items-center justify-center text-center opacity-50">
              <BookOpen className="w-12 h-12 mb-3" />
              <p>{r.empty}</p>
            </div>
          )}
        </div>

        {/* Mental health articles section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-bold text-muted-foreground px-2">{r.articlesSection}</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="flex flex-col gap-3">
            {mentalHealthArticles.map((article) => {
              const displayTitle    = lang === "en" ? article.titleEn    : article.title;
              const displaySummary  = lang === "en" ? article.summaryEn  : article.summary;
              const displayCategory = lang === "en" ? article.categoryEn : article.category;
              const colorClass = categoryColorsByEn[article.categoryEn] ?? "bg-primary/10 text-primary";

              return (
                <div
                  key={article.id}
                  className="bg-card border border-border rounded-3xl p-4 flex items-center gap-4 shadow-sm"
                >
                  <div className="flex-1 min-w-0">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${colorClass}`}>
                      {displayCategory}
                    </span>
                    <h3 className="font-bold text-foreground text-sm leading-snug mt-1.5 mb-1">
                      {displayTitle}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {displaySummary}
                    </p>
                  </div>
                  <button
                    onClick={() => openArticleById(article)}
                    className="shrink-0 w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center active:scale-95 transition-transform"
                    aria-label={r.readMore}
                  >
                    <BookOpen className="w-4 h-4 text-primary" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <ArticleModal
        open={modalOpen}
        title={modalTitle}
        body={modalBody}
        onClose={() => setModalOpen(false)}
      />
    </MobileLayout>
  );
}
