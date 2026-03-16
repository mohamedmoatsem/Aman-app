import { ReactNode } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  action?: ReactNode;
}

export default function Header({ title, showBack, action }: HeaderProps) {
  const { t, toggleLang, lang } = useLanguage();

  const BackIcon = lang === "ar" ? ArrowRight : ArrowLeft;

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border/40 w-full pt-safe">
      <div className="h-14 px-4 flex items-center justify-between">
        <div className="flex-1 flex items-center justify-start">
          {showBack ? (
            <button
              onClick={() => window.history.back()}
              className="p-2 -ml-2 rounded-full hover:bg-muted/50 active:bg-muted transition-colors text-foreground"
              aria-label={t.backLabel}
            >
              <BackIcon className="w-6 h-6" />
            </button>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-secondary p-1.5 shadow-sm">
              <img
                src={`${import.meta.env.BASE_URL}images/logo.png`}
                alt={t.appName}
                className="w-full h-full object-contain brightness-0 invert"
                onError={(e) => e.currentTarget.style.display = "none"}
              />
            </div>
          )}
        </div>

        <h1 className="flex-1 text-center font-bold text-lg text-foreground tracking-tight line-clamp-1">
          {title || t.appName}
        </h1>

        <div className="flex-1 flex items-center justify-end gap-2">
          {action}
          <button
            onClick={toggleLang}
            className="text-xs font-bold px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 active:scale-95 transition-all"
          >
            {t.langToggle}
          </button>
        </div>
      </div>
    </header>
  );
}
