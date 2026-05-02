import { useState, useRef, useEffect } from "react";
import { Send, UserCircle2, Bot, ShieldCheck } from "lucide-react";
import { useMessages, getDeviceId, type Message } from "@/hooks/use-messages";

interface ChatWindowProps {
  conversationId: number;
  professionalName?: string;
  professionalSpecialty?: string;
  isAnonymous?: boolean;
}

function MessageBubble({ msg, deviceId }: { msg: Message; deviceId: string }) {
  // Check if this message was sent by the current device
  const isOwn = msg.sender_role === "user";
  const isPro  = msg.sender_role === "professional";

  const time = new Date(msg.timestamp).toLocaleTimeString("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex items-end gap-2 ${isOwn ? "flex-row-reverse" : "flex-row"}`}>
      {/* Avatar */}
      {!isOwn && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center shrink-0 mb-1 shadow-sm">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}

      <div className={`flex flex-col gap-1 max-w-[75%] ${isOwn ? "items-end" : "items-start"}`}>
        {/* Sender label for professional */}
        {isPro && (
          <span className="text-[10px] text-muted-foreground font-medium px-1">
            {msg.sender_name}
          </span>
        )}

        {/* Bubble */}
        <div
          className={`px-4 py-2.5 rounded-2xl shadow-sm text-sm leading-relaxed ${
            isOwn
              ? "bg-primary text-primary-foreground rounded-tl-sm"
              : "bg-card border border-border text-foreground rounded-tr-sm"
          }`}
        >
          <p>{msg.message_text}</p>
        </div>

        {/* Time + read */}
        <div className={`flex items-center gap-1 text-[10px] text-muted-foreground px-1 ${isOwn ? "flex-row-reverse" : ""}`}>
          <span>{time}</span>
          {isOwn && msg.is_read && (
            <span className="text-primary">✓✓</span>
          )}
          {isOwn && !msg.is_read && (
            <span className="opacity-50">✓</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ChatWindow({
  conversationId,
  professionalName = "المختص",
  professionalSpecialty = "مختص نفسي",
  isAnonymous = false,
}: ChatWindowProps) {
  const deviceId = getDeviceId();
  const { messages, loading, sending, sendMessage } = useMessages(conversationId);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || sending) return;
    const text = input.trim();
    setInput("");
    await sendMessage(text);
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-sky-50/30 to-background">

      {/* Chat header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center shadow-sm">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-bold text-foreground text-sm truncate">{professionalName}</p>
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="متاح" />
          </div>
          <p className="text-[11px] text-muted-foreground truncate">{professionalSpecialty}</p>
        </div>
        {isAnonymous && (
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground bg-muted px-2 py-1 rounded-full">
            <ShieldCheck className="w-3 h-3" />
            <span>مجهول</span>
          </div>
        )}
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {loading && (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        )}

        {!loading && messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 opacity-50 py-8">
            <UserCircle2 className="w-12 h-12 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">ابدأ محادثتك مع المختص</p>
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} deviceId={deviceId} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="bg-card border-t border-border px-4 py-3 shrink-0">
        <form onSubmit={handleSend} className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
            }}
            onKeyDown={handleKeyDown}
            placeholder="اكتب رسالتك هنا... (Enter للإرسال)"
            rows={1}
            dir="rtl"
            className="flex-1 resize-none bg-muted/50 border border-border rounded-2xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all max-h-[120px] leading-relaxed"
          />
          <button
            type="submit"
            disabled={!input.trim() || sending}
            className="w-11 h-11 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 hover:opacity-90 active:scale-95 disabled:opacity-40 transition-all shadow-sm"
            aria-label="إرسال"
          >
            {sending ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          محادثتك محمية وسرية تماماً
        </p>
      </div>
    </div>
  );
}
