import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { socket, connectSocket } from "@/lib/socket";

interface ConversationSummary {
  id: string | number;
  last_message?: string;
  last_message_time?: string;
  [key: string]: unknown;
}

interface ChatMessage {
  id: string;
  conversation_id: string | number;
  sender_id: string | number;
  sender_name: string;
  message_text: string;
  timestamp: string;
  is_read: boolean;
}

interface ChatContextValue {
  conversations: ConversationSummary[];
  messages: Record<string | number, ChatMessage[]>;
  unreadCounts: Record<string | number, number>;
  activeConversation: string | number | null;
  isLoading: boolean;
  currentUserId: string | number | undefined;
  fetchMessages: (conversationId: string | number) => void;
  sendMessage: (toUserId: string | number, messageText: string, isAnonymous?: boolean) => void;
  setActiveConversation: (conversationId: string | number | null) => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within ChatProvider");
  return context;
};

export const ChatProvider = ({
  children,
  currentUserId,
}: {
  children: ReactNode;
  currentUserId?: string | number;
}) => {
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [messages, setMessages] = useState<Record<string | number, ChatMessage[]>>({});
  const [unreadCounts, setUnreadCounts] = useState<Record<string | number, number>>({});
  const [activeConversation, setActiveConversation] = useState<string | number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!currentUserId) return;

    connectSocket(currentUserId);

    const handleConnect = () => {
      socket.emit("get conversations");
    };

    const handleConversations = (data: ConversationSummary[]) => {
      setConversations(data);
    };

    socket.on("connect", handleConnect);
    socket.on("conversations", handleConversations);

    if (socket.connected) {
      socket.emit("get conversations");
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("conversations", handleConversations);
    };
  }, [currentUserId]);

  useEffect(() => {
    const handleNewMessage = (data: {
      conversationId: string | number;
      from: string | number | { id: string | number; name: string };
      message: string;
      timestamp?: string;
    }) => {
      const { conversationId, from, message, timestamp } = data;

      setMessages((prev) => {
        const convMessages = prev[conversationId] ?? [];
        const newMessage: ChatMessage = {
          id: `temp-${Date.now()}`,
          conversation_id: conversationId,
          sender_id: typeof from === "object" ? from.id : from,
          sender_name: typeof from === "object" ? from.name : `User ${from}`,
          message_text: message,
          timestamp: timestamp ?? new Date().toISOString(),
          is_read: false,
        };

        const exists = convMessages.some(
          (m) => m.message_text === message && m.timestamp === timestamp
        );
        if (!exists) {
          return { ...prev, [conversationId]: [...convMessages, newMessage] };
        }
        return prev;
      });

      setConversations((prev) => {
        const convIndex = prev.findIndex((c) => c.id === conversationId);
        if (convIndex === -1) return prev;
        const updatedConv: ConversationSummary = {
          ...prev[convIndex],
          last_message: message,
          last_message_time: timestamp,
        };
        const newConvs = [...prev];
        newConvs.splice(convIndex, 1);
        return [updatedConv, ...newConvs];
      });

      if (activeConversation !== conversationId) {
        setUnreadCounts((prev) => ({
          ...prev,
          [conversationId]: (prev[conversationId] ?? 0) + 1,
        }));
      }
    };

    const handleMessageSent = (data: { success: boolean; error?: string }) => {
      if (!data.success) console.error("فشل إرسال الرسالة:", data.error);
    };

    const handleMessages = (msgs: ChatMessage[]) => {
      if (msgs.length > 0) {
        const convId = msgs[0].conversation_id;
        setMessages((prev) => ({ ...prev, [convId]: msgs }));
      }
    };

    socket.on("private message", handleNewMessage);
    socket.on("message sent", handleMessageSent);
    socket.on("messages", handleMessages);

    return () => {
      socket.off("private message", handleNewMessage);
      socket.off("message sent", handleMessageSent);
      socket.off("messages", handleMessages);
    };
  }, [activeConversation]);

  const fetchMessages = useCallback((conversationId: string | number) => {
    if (!conversationId) return;
    socket.emit("get messages", conversationId);
  }, []);

  const sendMessage = useCallback(
    (toUserId: string | number, messageText: string, isAnonymous = false) => {
      if (!currentUserId || !toUserId || !messageText.trim()) return;
      socket.emit("private message", {
        toUserId,
        message: messageText.trim(),
        isAnonymous,
      });
    },
    [currentUserId]
  );

  const setActiveConversationAndClearUnread = useCallback(
    (conversationId: string | number | null) => {
      setActiveConversation(conversationId);
      if (conversationId) {
        setUnreadCounts((prev) => ({ ...prev, [conversationId]: 0 }));
        fetchMessages(conversationId);
      }
    },
    [fetchMessages]
  );

  const value: ChatContextValue = {
    conversations,
    messages,
    unreadCounts,
    activeConversation,
    isLoading,
    currentUserId,
    fetchMessages,
    sendMessage,
    setActiveConversation: setActiveConversationAndClearUnread,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
