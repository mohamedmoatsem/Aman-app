// src/pages/chat/index.tsx
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useChat } from "@/contexts/ChatContext";
import { useLanguage } from "@/contexts/LanguageContext";
import ConversationList from "@/components/chat/ConversationList";
import ChatWindow from "@/components/chat/ChatWindow";
import { Link } from "wouter";
import { MessageSquarePlus } from "lucide-react";

// مكون زر مؤقت في حال عدم وجود Button من shadcn/ui
const Button = ({ children, onClick, className, variant }: any) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md font-medium transition-colors ${
      variant === "outline"
        ? "border border-gray-300 hover:bg-gray-50"
        : "bg-blue-600 text-white hover:bg-blue-700"
    } ${className}`}
  >
    {children}
  </button>
);

export default function ChatPage() {
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

  if (loading) return <div className="p-8 text-center">جاري التحميل...</div>;
  if (!user) return <div className="p-8 text-center">{t.chatSection.loginRequired}</div>;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* الشريط الجانبي للمحادثات */}
      <div className="w-80 border-r bg-white flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold mb-2">{t.chatSection.conversations}</h2>
          <Link href="/professionals">
            <Button variant="outline" className="w-full">
              <MessageSquarePlus className="h-4 w-4 mr-2" />
              {t.chatSection.newConversation}
            </Button>
          </Link>
        </div>
        <div className="flex-1 overflow-hidden">
          <ConversationList onSelectConversation={handleSelectConversation} />
        </div>
      </div>

      {/* نافذة الدردشة */}
      <div className="flex-1 flex flex-col">
        <ChatWindow conversationId={activeConversation} recipientId={selectedRecipientId || undefined} />
      </div>
    </div>
  );
}