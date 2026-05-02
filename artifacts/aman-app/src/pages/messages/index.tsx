import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import MobileLayout from "@/components/layout/MobileLayout";
import Header from "@/components/layout/Header";
import ConversationList from "@/components/chat/ConversationList";
import ChatWindow from "@/components/chat/ChatWindow";
import { useConversations, type Conversation } from "@/hooks/use-messages";
import { UserPlus, ArrowRight, ArrowLeft, MessageCirclePlus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SPECIALTIES_AR: Record<string, string> = {
  "د. سارة محمد":    "طب نفسي وعلاج الصدمات",
  "د. أحمد عمر":     "علاج نفسي معرفي سلوكي",
  "د. منى خالد":    "إرشاد نفسي وعلاقات",
  "د. يوسف إبراهيم": "اضطرابات القلق والاكتئاب",
};

const SPECIALTIES_EN: Record<string, string> = {
  "د. سارة محمد":    "Psychiatry & Trauma Therapy",
  "د. أحمد عمر":     "Cognitive Behavioral Therapy",
  "د. منى خالد":    "Psychological Counseling & Relationships",
  "د. يوسف إبراهيم": "Anxiety & Depression Disorders",
};

export default function Messages() {
  const [location] = useLocation();
  const { t, lang } = useLanguage();
  const m = t.messages;
  const { conversations, loading, refresh, deviceId } = useConversations();
  const [activeConv, setActiveConv] = useState<Conversation | null>(null);

  const SPECIALTIES = lang === "en" ? SPECIALTIES_EN : SPECIALTIES_AR;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const convId = params.get("conv");
    if (convId && conversations.length > 0) {
      const found = conversations.find((c) => c.id === parseInt(convId));
      if (found) setActiveConv(found);
    }
  }, [conversations]);

  const handleSelect = (conv: Conversation) => {
    setActiveConv(conv);
    refresh();
  };

  const handleBack = () => {
    setActiveConv(null);
    refresh();
  };

  const proName = activeConv
    ? activeConv.user1_role === "user"
      ? activeConv.user2_name
      : activeConv.user1_name
    : "";
  const proSpecialty = SPECIALTIES[proName] ?? t.professionals.defaultSpecialty;

  const BackArrow = t.dir === "rtl" ? ArrowRight : ArrowLeft;

  const totalUnread = conversations.reduce((s, c) => s + Number(c.unread_count ?? 0), 0);

  return (
    <MobileLayout>
      {activeConv ? (
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card sticky top-0 z-10">
          <button
            onClick={handleBack}
            className="p-2 rounded-xl hover:bg-muted transition-colors"
            aria-label={m.back}
          >
            <BackArrow className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1">
            <p className="font-bold text-foreground text-sm">{proName}</p>
            <p className="text-[11px] text-muted-foreground">{proSpecialty}</p>
          </div>
        </div>
      ) : (
        <Header title={m.title} />
      )}

      {!activeConv ? (
        <div className="flex flex-col h-full">
          <div className="px-4 pt-4 pb-2">
            <Link href="/messages/professionals">
              <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all shadow-sm">
                <MessageCirclePlus className="w-5 h-5" />
                <span>{m.newConversation}</span>
              </button>
            </Link>
          </div>

          {conversations.length > 0 && (
            <div className="px-4 py-2 flex items-center justify-between">
              <p className="text-xs font-bold text-muted-foreground">
                {conversations.length} {m.activeConversations}
              </p>
              <p className="text-xs text-muted-foreground">
                {totalUnread > 0 ? `${totalUnread} ${m.unreadMessages}` : m.noNewMessages}
              </p>
            </div>
          )}

          <div className="flex-1 overflow-y-auto">
            <ConversationList
              conversations={conversations}
              loading={loading}
              activeId={activeConv?.id ?? null}
              deviceId={deviceId}
              onSelect={handleSelect}
            />
          </div>

          {!loading && conversations.length === 0 && (
            <div className="px-4 pb-6">
              <div className="bg-gradient-to-br from-primary/5 to-emerald-50/50 border border-primary/10 rounded-3xl p-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-7 h-7 text-primary" />
                </div>
                <p className="font-bold text-foreground mb-2">{m.emptyTitle}</p>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{m.emptyDesc}</p>
                <Link href="/messages/professionals">
                  <button className="bg-primary text-primary-foreground font-bold px-6 py-2.5 rounded-2xl hover:opacity-90 active:scale-95 transition-all text-sm">
                    {m.browseProfessionals}
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden" style={{ height: "calc(100dvh - 130px)" }}>
          <ChatWindow
            conversationId={activeConv.id}
            professionalName={proName}
            professionalSpecialty={proSpecialty}
            isAnonymous={activeConv.is_anonymous}
          />
        </div>
      )}
    </MobileLayout>
  );
}
