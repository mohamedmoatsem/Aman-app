// src/contexts/ChatContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { socket, connectSocket } from "@/lib/socket";

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within ChatProvider");
  return context;
};

export const ChatProvider = ({ children, currentUserId }) => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({}); // conversationId -> messages[]
  const [unreadCounts, setUnreadCounts] = useState({});
  const [activeConversation, setActiveConversation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- الاتصال وجلب المحادثات الأولية ---
  useEffect(() => {
    if (!currentUserId) return;

    // توصيل socket إذا لم يكن متصلاً
    connectSocket(currentUserId);

    const handleConnect = () => {
      console.log("📡 Socket connected, fetching conversations...");
      socket.emit("get conversations");
    };

    const handleConversations = (data) => {
      console.log("📋 Conversations received:", data);
      setConversations(data);
    };

    socket.on("connect", handleConnect);
    socket.on("conversations", handleConversations);

    // إذا كان متصلاً مسبقاً، نطلب البيانات فوراً
    if (socket.connected) {
      socket.emit("get conversations");
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("conversations", handleConversations);
    };
  }, [currentUserId]);

  // --- مستمعو الرسائل الجديدة ---
  useEffect(() => {
    const handleNewMessage = (data) => {
      const { conversationId, from, message, timestamp } = data;

      // تحديث قائمة رسائل المحادثة
      setMessages((prev) => {
        const convMessages = prev[conversationId] || [];
        const newMessage = {
          id: `temp-${Date.now()}`,
          conversation_id: conversationId,
          sender_id: typeof from === "object" ? from.id : from,
          sender_name: typeof from === "object" ? from.name : `User ${from}`,
          message_text: message,
          timestamp: timestamp || new Date().toISOString(),
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

      // تحديث المحادثات لنقل آخر رسالة إلى الأعلى (اختياري)
      setConversations((prev) => {
        const convIndex = prev.findIndex((c) => c.id === conversationId);
        if (convIndex === -1) return prev;
        const updatedConv = {
          ...prev[convIndex],
          last_message: message,
          last_message_time: timestamp,
        };
        const newConvs = [...prev];
        newConvs.splice(convIndex, 1);
        return [updatedConv, ...newConvs];
      });

      // زيادة عداد غير المقروء
      if (activeConversation !== conversationId) {
        setUnreadCounts((prev) => ({
          ...prev,
          [conversationId]: (prev[conversationId] || 0) + 1,
        }));
      }
    };

    const handleMessageSent = (data) => {
      if (!data.success) console.error("فشل إرسال الرسالة:", data.error);
    };

    const handleMessages = (msgs) => {
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

  // --- دوال مساعدة ---
  const fetchMessages = useCallback((conversationId) => {
    if (!conversationId) return;
    socket.emit("get messages", conversationId);
  }, []);

  const sendMessage = useCallback(
    (toUserId, messageText, isAnonymous = false) => {
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
    (conversationId) => {
      setActiveConversation(conversationId);
      if (conversationId) {
        setUnreadCounts((prev) => ({ ...prev, [conversationId]: 0 }));
        fetchMessages(conversationId);
      }
    },
    [fetchMessages]
  );

  const value = {
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