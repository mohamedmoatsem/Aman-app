import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowRight, Send, Bot, Loader2, AlertTriangle } from "lucide-react";

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
  const res = await fetch(`${BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  });
  if (!res.ok) throw new Error("server_error");
  const data = await res.json();
  return data.reply as string;
}

export default function Chat() {
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
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Build valid history: skip initial greeting (id=0), only include prior turns
  const getHistory = (msgs: Message[]) =>
    msgs
      .filter((m) => m.id !== 0)
      .map((m) => ({ role: m.role, parts: [{ text: m.text }] }));

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setInput("");
    setError(null);

    const userMsg: Message = { id: nextId.current++, role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      // Pass history of previous messages only (not the current userMsg)
      const history = getHistory(messages);
      const reply = await sendChatMessage(trimmed, history);
      setMessages((prev) => [...prev, { id: nextId.current++, role: "model", text: reply }]);
    } catch {
      setError("ما قدرنا نوصل للخادم، جرّب مرة ثانية");
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
    <div className="flex flex-col h-screen max-w-[430px] mx-auto bg-background" dir="rtl">

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
            متاح الآن · يتكلم معاك بالسوداني
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="shrink-0 mx-4 mt-3 bg-amber-50 border border-amber-200 rounded-2xl px-3 py-2 flex items-start gap-2">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
        <p className="text-[11px] text-amber-700 leading-relaxed">
          المساعد للدعم النفسي فقط وليس بديلاً عن الطبيب. في حالات الطوارئ اتصل بـ{" "}
          <a href="tel:920033360" className="font-bold underline">920033360</a>
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">

        {/* Quick prompts – only when just started */}
        {messages.length === 1 && (
          <div className="flex flex-col gap-3 mt-1">
            {/* PTSD Quick Demo button */}
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🧠</span>
                <span className="text-xs font-bold text-violet-700">تجربة سريعة — محاكاة حالة صدمة نفسية</span>
              </div>
              <p className="text-[11px] text-violet-600 mb-3 leading-relaxed">
                اضغط لترى كيف يستجيب المساعد لشخص يعاني من أعراض ما بعد الصدمة (PTSD) بتمارين EMDR
              </p>
              <button
                onClick={() => handleSend(PTSD_DEMO_MESSAGE)}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-violet-500 hover:bg-violet-600 text-white text-sm font-bold active:scale-95 transition-all disabled:opacity-50"
              >
                <span>🚀</span>
                <span>ابدأ التجربة السريعة</span>
              </button>
            </div>

            {/* Regular quick prompts */}
            <div className="flex flex-wrap gap-2 justify-center">
              {QUICK_PROMPTS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-xs font-medium px-3 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 active:scale-95 transition-all border border-primary/20"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

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
              className={`max-w-[78%] px-4 py-3 rounded-3xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-md"
                  : "bg-card border border-border text-foreground rounded-tl-md"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex items-end gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-card border border-border px-4 py-3 rounded-3xl rounded-tl-md flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
              <span className="text-xs text-muted-foreground">مساعد أمان يكتب...</span>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs rounded-2xl px-4 py-3 text-center">
            {error}
            <button onClick={() => setError(null)} className="block mx-auto mt-1 underline text-[11px]">
              أغلق
            </button>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-border bg-background/95 backdrop-blur px-4 py-3">
        <div className="flex items-end gap-2 bg-muted rounded-3xl px-4 py-2 border border-border focus-within:border-primary transition-colors">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
            }}
            onKeyDown={handleKeyDown}
            placeholder="اكتب رسالتك هنا..."
            rows={1}
            disabled={loading}
            className="flex-1 bg-transparent resize-none text-sm text-foreground placeholder:text-muted-foreground outline-none py-1 max-h-[120px] leading-relaxed"
            style={{ direction: "rtl" }}
          />
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || loading}
            className="w-9 h-9 rounded-2xl bg-primary flex items-center justify-center shrink-0 disabled:opacity-40 active:scale-95 transition-all"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
        <p className="text-center text-[10px] text-muted-foreground mt-2">
          Enter للإرسال · Shift+Enter لسطر جديد
        </p>
      </div>
    </div>
  );
}
