// src/components/chat/ConversationList.tsx
import { useChat } from "@/contexts/ChatContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface ConversationListProps {
  onSelectConversation: (id: number) => void;
}

export default function ConversationList({ onSelectConversation }: ConversationListProps) {
  const { conversations, unreadCounts, activeConversation } = useChat();
  const { user } = useAuth();
  const { t } = useLanguage();

  const getOtherUser = (conv: any) => {
    if (!user) return null;
    return conv.user1_id === user.id ? conv.user2_details : conv.user1_details;
  };

  if (!user) {
    return <div className="p-4 text-center text-gray-500">{t.chatSection.loginRequired}</div>;
  }

  if (conversations.length === 0) {
    return <div className="p-4 text-center text-gray-500">{t.chatSection.noConversations}</div>;
  }

  return (
    <div className="conversation-list h-full overflow-y-auto">
      {conversations.map((conv: any) => {
        const otherUser = getOtherUser(conv);
        const isActive = activeConversation === conv.id;
        const unread = unreadCounts[conv.id] || 0;

        return (
          <div
            key={conv.id}
            className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 transition-colors border-b ${
              isActive ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
            }`}
            onClick={() => onSelectConversation(conv.id)}
          >
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="font-medium truncate">
                  {conv.is_anonymous ? t.chatSection.anonymous : otherUser?.username}
                </span>
                {conv.type === "consult" && (
                  <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                    {t.chatSection.professional}
                  </span>
                )}
              </div>
              {conv.last_message && (
                <p className="text-sm text-gray-500 truncate">{conv.last_message}</p>
              )}
            </div>
            {unread > 0 && (
              <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {unread > 9 ? "9+" : unread}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}