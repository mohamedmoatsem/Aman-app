import { ReactNode } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  action?: ReactNode;
}

export default function Header({ title, showBack, action }: HeaderProps) {
  const { t, lang, toggleLang } = useLanguage();
  const BackIcon = lang === "ar" ? ArrowRight : ArrowLeft;

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border/40 w-full pt-safe">
      <div className="h-14 px-4 flex items-center justify-between">
        <div className="flex-1 flex items-center justify-start gap-2">
          {showBack ? (
            <button
              onClick={() => window.history.back()}
              className="p-2 -ml-2 rounded-full hover:bg-muted/50 transition-colors text-foreground"
            >
              <BackIcon className="w-6 h-6" />
            </button>
          ) : (
            <Link href="/">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary to-secondary p-1.5 shadow-sm cursor-pointer">
                <img
                  src={`${import.meta.env.BASE_URL}images/logo.png`}
                  alt={t.appName}
                  className="w-full h-full object-contain brightness-0 invert"
                />
              </div>
            </Link>
          )}
        </div>

        <h1 className="flex-2 text-center font-bold text-lg text-foreground tracking-tight line-clamp-1">
          {title || t.appName}
        </h1>

        <div className="flex-1 flex items-center justify-end gap-1">
          {action}
          <button
            onClick={toggleLang}
            className="text-[10px] font-black px-2 py-1 rounded-md border border-primary/30 text-primary hover:bg-primary/10 transition-all"
          >
            {lang.toUpperCase()}
          </button>
        </div>
      </div>
    </header>
  );
}
