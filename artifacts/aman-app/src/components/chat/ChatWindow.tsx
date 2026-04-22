// src/components/chat/ChatWindow.tsx
import { useState, useRef, useEffect } from "react";
import { useChat } from "@/contexts/ChatContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Send, User } from "lucide-react";

interface ChatWindowProps {
  conversationId: number | null;
  recipientId?: number;
}

export default function ChatWindow({ conversationId, recipientId }: ChatWindowProps) {
  const { messages, sendMessage } = useChat();
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversationMessages = conversationId ? messages[conversationId] || [] : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !recipientId) return;
    sendMessage(recipientId, input);
    setInput("");
  };

  if (!conversationId) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400">
        <MessageIcon className="h-16 w-16 mb-4 opacity-50" />
        <p>{t.chatSection.selectConversation}</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="p-3 border-b bg-white flex items-center gap-2">
        <div className="bg-blue-100 rounded-full p-1">
          <User className="h-5 w-5 text-blue-600" />
        </div>
        <span className="font-medium">{t.chatSection.conversations}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {conversationMessages.map((msg: any) => {
          const isOwn = msg.sender_id === user?.id;
          const timeLocale = lang === "ar" ? "ar-EG" : "en-US";
          return (
            <div
              key={msg.id}
              className={`flex ${isOwn ? "justify-end" : "justify-start"} animate-fade-in`}
            >
              <div className="max-w-[75%] md:max-w-[60%]">
                {!isOwn && (
                  <span className="text-xs text-gray-500 mb-1 block mr-1">
                    {msg.sender_name || t.chatSection.anonymous}
                  </span>
                )}
                <div
                  className={`rounded-2xl px-4 py-2 shadow-sm ${
                    isOwn
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none border"
                  }`}
                >
                  <p className="text-sm md:text-base">{msg.message_text}</p>
                  <span className={`text-xs mt-1 block text-right ${isOwn ? "text-blue-100" : "text-gray-400"}`}>
                    {new Date(msg.timestamp).toLocaleTimeString(timeLocale, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white border-t flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.chatSection.typeMessage}
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          dir={lang === "ar" ? "rtl" : "ltr"}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-blue-700 transition-colors"
          aria-label={t.chatSection.send}
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}

const MessageIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);