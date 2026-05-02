import { MessageCircle, Clock } from "lucide-react";
import { type Conversation } from "@/hooks/use-messages";
import { useLanguage } from "@/contexts/LanguageContext";

interface ConversationListProps {
  conversations: Conversation[];
  loading: boolean;
  activeId: number | null;
  deviceId: string;
  onSelect: (conv: Conversation) => void;
}

function formatTime(ts: string | null, lang: string): string {
  if (!ts) return "";
  const d = new Date(ts);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (lang === "ar") {
    if (diffMins < 1) return "الآن";
    if (diffMins < 60) return `${diffMins} د`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} س`;
    return d.toLocaleDateString("ar-EG", { day: "numeric", month: "short" });
  } else {
    if (diffMins < 1) return "now";
    if (diffMins < 60) return `${diffMins}m`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h`;
    return d.toLocaleDateString("en-US", { day: "numeric", month: "short" });
  }
}

const COLORS = ["from-sky-400 to-sky-600", "from-emerald-400 to-emerald-600", "from-violet-400 to-violet-600", "from-rose-400 to-rose-600"];

export default function ConversationList({
  conversations,
  loading,
  activeId,
  deviceId,
  onSelect,
}: ConversationListProps) {
  const { t, lang } = useLanguage();
  const m = t.messages;

  if (loading) {
    return (
      <div className="flex flex-col gap-2 p-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-muted/40 animate-pulse">
            <div className="w-11 h-11 rounded-xl bg-muted shrink-0" />
            <div className="flex-1 flex flex-col gap-2">
              <div className="h-4 bg-muted rounded w-32" />
              <div className="h-3 bg-muted rounded w-48" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3 text-center px-6 opacity-50">
        <MessageCircle className="w-10 h-10 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">{m.emptyTitle}</p>
        <p className="text-xs text-muted-foreground">{m.emptyDesc}</p>
      </div>
    );
  }

  const noMsgLabel = lang === "ar" ? "لا توجد رسائل بعد" : "No messages yet";

  return (
    <div className="flex flex-col gap-1 p-2">
      {conversations.map((conv, idx) => {
        const isActive = activeId === conv.id;
        const isMyUser1 = conv.user1_role === "user";
        const proName = isMyUser1 ? conv.user2_name : conv.user1_name;
        const unread = Number(conv.unread_count ?? 0);
        const initials = proName.replace("د.", "").replace("أ.د.", "").trim().split(" ").map((w: string) => w[0]).join("").slice(0, 2);
        const gradient = COLORS[idx % COLORS.length];

        return (
          <button
            key={conv.id}
            onClick={() => onSelect(conv)}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl text-right transition-all active:scale-[0.99] ${
              isActive
                ? "bg-primary/10 border border-primary/20"
                : "hover:bg-muted/60 border border-transparent"
            }`}
          >
            <div className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-sm`}>
              <span className="text-white font-bold text-sm">{initials}</span>
              <span className="absolute -bottom-0.5 -left-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-background" />
            </div>

            <div className="flex-1 min-w-0 text-right">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-foreground text-sm truncate">{proName}</span>
                <span className="text-[10px] text-muted-foreground shrink-0 flex items-center gap-0.5">
                  <Clock className="w-2.5 h-2.5" />
                  {formatTime(conv.last_message_at, lang)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 mt-0.5">
                <p className="text-xs text-muted-foreground truncate flex-1">
                  {conv.last_message ?? noMsgLabel}
                </p>
                {unread > 0 && (
                  <span className="bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                    {unread > 9 ? "9+" : unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
