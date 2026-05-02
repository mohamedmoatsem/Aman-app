import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowRight, Send, Bot, Loader2, AlertTriangle, Users, Sparkles } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "model";
  text: string;
}

const QUICK_PROMPTS = [
  "حاسس بضغط اليوم",
  "ما قادر أنام",
  "زهقت من كل شيء",
  "محتاج أتكلم مع أحد",
];

const PTSD_DEMO_MESSAGE =
  "من فترة ما قادر أنام بسبب أشياء صعبة مريت بيها. كل ما أحاول أنام تيجيني صور وذكريات مؤلمة وأقوم خايف ومتعرق. النهار دا ما قدرت أركّز في أي شيء وحاسس إن أي صوت كبير بخوّفني. ما عارف أتكلم مع أحد عن اللي حصل.";

const BASE_URL = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

async function sendChatMessage(
  message: string,
  history: { role: "user" | "model"; parts: { text: string }[] }[]
): Promise<string> {
  const res = await fetch(`${window.location.origin}${BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });
  if (!res.ok) throw new Error("server_error");
  const data = await res.json();
  return data.reply as string;
}

export default function Assistant() {
  const [, navigate] = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "model",
      text: "السلام عليكم! أنا مساعد أمان، رفيقك في أي وقت محتاج فيه حد يسمعك 🌿\nقولي شنو في بالك اليوم؟",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showReferral, setShowReferral] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const checkCriticalState = (text: string) => {
    const criticalWords = ["موت", "انتحار", "اذى", "أذى", "يأس", "صدمة", "تعبت شديد", "ما قادر اعيش"];
    if (criticalWords.some((word) => text.includes(word))) {
      setShowReferral(true);
    }
  };

  const getHistory = (msgs: Message[]) =>
    msgs
      .filter((m) => m.id !== 0)
      .map((m) => ({ role: m.role, parts: [{ text: m.text }] }));

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setInput("");
    setError(null);
    checkCriticalState(trimmed);

    const userMsg: Message = { id: nextId.current++, role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const history = getHistory([...messages, userMsg]);
      const reply = await sendChatMessage(trimmed, history);
      setMessages((prev) => [...prev, { id: nextId.current++, role: "model", text: reply }]);

      if (reply.includes("مختص") || reply.includes("طبيب")) {
        setShowReferral(true);
      }
    } catch {
      setError("ما قدرنا نوصل للمساعد، جرّب مرة ثانية");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-background" dir="rtl">

      {/* Header */}
      <div className="shrink-0 bg-gradient-to-l from-primary/10 to-emerald-500/5 border-b border-border px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded-xl hover:bg-muted transition-colors"
        >
          <ArrowRight className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center shrink-0">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="font-bold text-foreground text-base leading-tight">مساعد أمان</h1>
          <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            متاح الآن · ذكاء اصطناعي Gemma
          </p>
        </div>

        {/* PTSD Demo Button */}
        <button
          onClick={() => handleSend(PTSD_DEMO_MESSAGE)}
          disabled={loading}
          className="flex items-center gap-1.5 bg-violet-100 text-violet-700 hover:bg-violet-200 text-[10px] font-bold px-2.5 py-1.5 rounded-xl transition-all active:scale-95 disabled:opacity-50"
          title="تجربة سريعة لحالة PTSD"
        >
          <Sparkles className="w-3 h-3" />
          عرض PTSD
        </button>
      </div>

      {/* Referral Box */}
      {showReferral && (
        <div className="shrink-0 mx-4 mt-3 bg-primary/5 border border-primary/20 rounded-2xl p-3 animate-in slide-in-from-top duration-500">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-bold text-primary mb-1">هل تحتاج للتحدث مع شخص حقيقي؟</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed mb-2">
                مساعد أمان ذكي، لكن بعض الحالات تحتاج لمختصين بشريين.
              </p>
              <a
                href="tel:1212"
                className="inline-block bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-lg hover:opacity-90 transition-all"
              >
                خط دعم نفسي: 1212
              </a>
            </div>
            <button
              onClick={() => setShowReferral(false)}
              className="text-muted-foreground text-[10px] hover:text-foreground"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Quick Prompts — shown only when no conversation yet */}
      {messages.length === 1 && !loading && (
        <div className="shrink-0 px-4 pt-4 flex flex-wrap gap-2 justify-center">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => handleSend(p)}
              className="bg-muted hover:bg-primary/10 hover:text-primary border border-border text-foreground text-xs font-medium px-3 py-2 rounded-2xl transition-all active:scale-95"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {msg.role === "model" && (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center shrink-0 mb-1">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div
              className={`max-w-[78%] px-4 py-3 rounded-3xl text-sm shadow-sm whitespace-pre-wrap leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-md"
                  : "bg-card border text-foreground rounded-tl-md"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-end gap-2 text-muted-foreground text-xs">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-card border rounded-3xl rounded-tl-md px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin text-primary" />
              <span>أمان يفكر...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-red-500 text-xs py-2 justify-center">
            <AlertTriangle className="w-4 h-4" />
            {error}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="shrink-0 border-t bg-background/95 backdrop-blur px-4 py-3">
        <div className="flex items-end gap-2 bg-muted rounded-3xl px-4 py-2 border focus-within:border-primary transition-colors">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="احكي لي البدور في راسك..."
            rows={1}
            className="flex-1 bg-transparent resize-none text-sm outline-none py-1 max-h-28"
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || loading}
            className="w-9 h-9 rounded-2xl bg-primary flex items-center justify-center disabled:opacity-40 transition-opacity shrink-0"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
