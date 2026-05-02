import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useChat } from "@/contexts/ChatContext";
import { useLanguage } from "@/contexts/LanguageContext";
// تحديث المسارات بناءً على الهيكل الجديد (src/components/chat)
import ConversationList from "@/components/chat/ConversationList";
import ChatWindow from "@/components/chat/ChatWindow";
import { Link } from "wouter";
import { MessageSquarePlus } from "lucide-react";

// مكون زر بسيط متوافق مع تصميم التطبيق
const Button = ({ children, onClick, className, variant }: any) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 ${
      variant === "outline"
        ? "border border-primary/20 text-primary hover:bg-primary/5"
        : "bg-primary text-white hover:opacity-90"
    } ${className}`}
  >
    {children}
  </button>
);

export default function Messages() { // تغيير الاسم ليتوافق مع App.tsx
  const { user, loading } = useAuth();
  const { activeConversation, setActiveConversation, conversations } = useChat();
  const { t } = useLanguage();
  const [selectedRecipientId, setSelectedRecipientId] = useState<number | null>(null);

  const handleSelectConversation = (conversationId: number) => {
    setActiveConversation(conversationId);
    const conv = conversations.find((c: any) => c.id === conversationId);
    if (conv && user) {
      const otherId = conv.user1_id === user.id ? conv.user2_id : conv.user1_id;
      setSelectedRecipientId(otherId);
    }
  };

  if (loading) return <div className="p-8 text-center text-sm">جاري التحميل...</div>;
  if (!user) return <div className="p-8 text-center text-sm">{t.chatSection?.loginRequired || "يرجى تسجيل الدخول"}</div>;

  return (
    <div className="flex h-screen bg-background max-w-[430px] mx-auto border-x" dir="rtl">
      {/* قائمة المحادثات الجانبية (تصميم هاتف) */}
      <div className={`flex flex-col border-l ${activeConversation ? 'hidden md:flex w-80' : 'w-full'}`}>
        <div className="p-4 border-b bg-card">
          <h2 className="text-lg font-bold mb-3">{t.chatSection?.conversations || "المحادثات"}</h2>
          {/* تحديث الرابط ليوجه إلى المسار الجديد للمختصين */}
          <Link href="/messages/professionals">
            <Button className="w-full">
              <MessageSquarePlus className="h-4 w-4" />
              {t.chatSection?.newConversation || "محادثة جديدة مع مختص"}
            </Button>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ConversationList onSelectConversation={handleSelectConversation} />
        </div>
      </div>

      {/* نافذة الدردشة */}
      <div className={`flex-1 flex flex-col ${!activeConversation ? 'hidden md:flex' : 'flex'}`}>
        {activeConversation ? (
          <ChatWindow conversationId={activeConversation} recipientId={selectedRecipientId || undefined} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm p-8 text-center">
            اختر محادثة للبدء أو تواصل مع مختص جديد.
          </div>
        )}
      </div>
    </div>
  );
}
