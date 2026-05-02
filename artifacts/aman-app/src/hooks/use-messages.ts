import { useState, useEffect, useCallback, useRef } from "react";

const API = "/api/messages";

function getDeviceId(): string {
  let id = localStorage.getItem("aman_device_id");
  if (!id) {
    id = `dev_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    localStorage.setItem("aman_device_id", id);
  }
  return id;
}

export interface Professional {
  id: number;
  username: string;
  specialty: string;
  available: boolean;
}

export interface Conversation {
  id: number;
  type: "peer" | "consult";
  is_anonymous: boolean;
  created_at: string;
  user1_id: number;
  user1_name: string;
  user1_role: string;
  user2_id: number;
  user2_name: string;
  user2_role: string;
  last_message: string | null;
  last_message_at: string | null;
  unread_count: number;
}

export interface Message {
  id: number;
  conversation_id: number;
  sender_id: number;
  sender_name: string;
  sender_role: string;
  message_text: string;
  timestamp: string;
  is_read: boolean;
}

export function useProfessionals() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API}/professionals`)
      .then((r) => r.json())
      .then(setProfessionals)
      .catch(() => setError("تعذّر تحميل قائمة المختصين"))
      .finally(() => setLoading(false));
  }, []);

  return { professionals, loading, error };
}

export function useConversations() {
  const deviceId = getDeviceId();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    fetch(`${API}/conversations?deviceId=${encodeURIComponent(deviceId)}`)
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setConversations(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [deviceId]);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 5000);
    return () => clearInterval(interval);
  }, [refresh]);

  return { conversations, loading, refresh, deviceId };
}

export function useMessages(conversationId: number | null) {
  const deviceId = getDeviceId();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchMessages = useCallback(() => {
    if (!conversationId) return;
    fetch(`${API}/${conversationId}`)
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setMessages(data))
      .catch(() => {});
  }, [conversationId]);

  useEffect(() => {
    if (!conversationId) { setMessages([]); return; }
    setLoading(true);
    fetch(`${API}/${conversationId}`)
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setMessages(data))
      .finally(() => setLoading(false));

    // Mark as read
    fetch(`${API}/${conversationId}/read`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deviceId }),
    }).catch(() => {});

    intervalRef.current = setInterval(fetchMessages, 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [conversationId, deviceId, fetchMessages]);

  const sendMessage = useCallback(async (text: string): Promise<boolean> => {
    if (!conversationId || !text.trim() || sending) return false;
    setSending(true);
    try {
      const r = await fetch(`${API}/${conversationId}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId, text }),
      });
      if (r.ok) { fetchMessages(); return true; }
      return false;
    } catch { return false; }
    finally { setSending(false); }
  }, [conversationId, deviceId, sending, fetchMessages]);

  return { messages, loading, sending, sendMessage };
}

export async function startConversation(
  professionalId: number,
  isAnonymous: boolean,
): Promise<{ conversationId: number; userId: number } | null> {
  const deviceId = getDeviceId();
  try {
    const r = await fetch(`${API}/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deviceId, professionalId, isAnonymous }),
    });
    if (r.ok) return r.json();
    return null;
  } catch { return null; }
}

export { getDeviceId };
