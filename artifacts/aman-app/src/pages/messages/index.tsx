import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import MobileLayout from "@/components/layout/MobileLayout";
import Header from "@/components/layout/Header";
import ConversationList from "@/components/chat/ConversationList";
import ChatWindow from "@/components/chat/ChatWindow";
import { useConversations, type Conversation } from "@/hooks/use-messages";
import { UserPlus, ArrowRight, MessageCirclePlus } from "lucide-react";

const SPECIALTIES: Record<string, string> = {
  "د. سارة محمد":    "طب نفسي وعلاج الصدمات",
  "د. أحمد عمر":     "علاج نفسي معرفي سلوكي",
  "د. منى خالد":    "إرشاد نفسي وعلاقات",
  "د. يوسف إبراهيم": "اضطرابات القلق والاكتئاب",
};

export default function Messages() {
  const [location] = useLocation();
  const { conversations, loading, refresh, deviceId } = useConversations();
  const [activeConv, setActiveConv] = useState<Conversation | null>(null);

  // Read ?conv= param from URL to auto-open a conversation
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

  // Determine professional info for the active chat
  const proName = activeConv
    ? activeConv.user1_role === "user"
      ? activeConv.user2_name
      : activeConv.user1_name
    : "";
  const proSpecialty = SPECIALTIES[proName] ?? "مختص نفسي";

  return (
    <MobileLayout>
      {/* Header changes based on view */}
      {activeConv ? (
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card sticky top-0 z-10">
          <button
            onClick={handleBack}
            className="p-2 rounded-xl hover:bg-muted transition-colors"
            aria-label="رجوع"
          >
            <ArrowRight className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1">
            <p className="font-bold text-foreground text-sm">{proName}</p>
            <p className="text-[11px] text-muted-foreground">{proSpecialty}</p>
          </div>
        </div>
      ) : (
        <Header title="رسائل المختصين" />
      )}

      {/* Main layout */}
      {!activeConv ? (
        /* ── Conversations list view ── */
        <div className="flex flex-col h-full">
          {/* New conversation button */}
          <div className="px-4 pt-4 pb-2">
            <Link href="/messages/professionals">
              <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3 rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all shadow-sm">
                <MessageCirclePlus className="w-5 h-5" />
                <span>تواصل مع مختص جديد</span>
              </button>
            </Link>
          </div>

          {/* Stats bar */}
          {conversations.length > 0 && (
            <div className="px-4 py-2 flex items-center justify-between">
              <p className="text-xs font-bold text-muted-foreground">
                {conversations.length} محادثة نشطة
              </p>
              <p className="text-xs text-muted-foreground">
                {conversations.reduce((s, c) => s + Number(c.unread_count ?? 0), 0) > 0
                  ? `${conversations.reduce((s, c) => s + Number(c.unread_count ?? 0), 0)} رسائل غير مقروءة`
                  : "لا توجد رسائل جديدة"}
              </p>
            </div>
          )}

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto">
            <ConversationList
              conversations={conversations}
              loading={loading}
              activeId={activeConv?.id ?? null}
              deviceId={deviceId}
              onSelect={handleSelect}
            />
          </div>

          {/* Empty state CTA */}
          {!loading && conversations.length === 0 && (
            <div className="px-4 pb-6">
              <div className="bg-gradient-to-br from-primary/5 to-emerald-50/50 border border-primary/10 rounded-3xl p-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-7 h-7 text-primary" />
                </div>
                <p className="font-bold text-foreground mb-2">ابدأ أول محادثة مع مختص</p>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  فريقنا من المختصين النفسيين جاهز للاستماع إليك في بيئة آمنة وسرية تماماً.
                </p>
                <Link href="/messages/professionals">
                  <button className="bg-primary text-primary-foreground font-bold px-6 py-2.5 rounded-2xl hover:opacity-90 active:scale-95 transition-all text-sm">
                    استعرض المختصين
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ── Active chat view ── */
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
