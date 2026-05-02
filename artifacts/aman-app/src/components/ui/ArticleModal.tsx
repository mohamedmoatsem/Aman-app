import { useEffect } from "react";
import { X, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ArticleModalProps {
  open: boolean;
  title: string;
  body: string;
  onClose: () => void;
}

export function ArticleModal({ open, title, body, onClose }: ArticleModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const isHtml = body.trim().startsWith("<");
  const closeLabel = t.dir === "rtl" ? "إغلاق" : "Close";

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative z-[101] w-full max-w-2xl bg-background rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col"
        style={{ maxHeight: "92dvh" }}
        dir={t.dir}
      >
        <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-3 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <h2 className="font-bold text-foreground text-base leading-tight">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors shrink-0"
            aria-label={closeLabel}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-5 py-5 text-sm leading-relaxed text-foreground">
          {isHtml ? (
            <div dangerouslySetInnerHTML={{ __html: body }} />
          ) : (
            <p className="whitespace-pre-wrap">{body}</p>
          )}
        </div>

        <div className="px-5 pb-5 pt-3 shrink-0">
          <button
            onClick={onClose}
            className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all"
          >
            {closeLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
