import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useChat } from "@/contexts/ChatContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";
import { socket } from "@/lib/socket";

// مكونات واجهة بسيطة متناسقة مع تصميم أمان
const Button = ({ children, onClick, disabled, className }: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 bg-primary text-white rounded-xl font-bold hover:opacity-90 disabled:opacity-50 transition-all active:scale-95 ${className}`}
  >
    {children}
  </button>
);

const Card = ({ children }: any) => <div className="border border-border/50 rounded-2xl p-4 shadow-sm bg-card mb-3">{children}</div>;
const CardHeader = ({ children }: any) => <div className="mb-2">{children}</div>;
const CardTitle = ({ children }: any) => <h3 className="text-lg font-bold text-foreground">{children}</h3>;
const CardContent = ({ children }: any) => <div>{children}</div>;
const Badge = ({ children, variant }: any) => (
  <span className={`inline-block px-2 py-1 text-[10px] font-bold rounded-lg ${variant === 'default' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>{children}</span>
);

interface Professional {
  id: number;
  username: string;
  role: string;
  specialty?: string;
  available?: boolean;
}

export default function Professionals() { // تغيير الاسم ليتوافق مع App.tsx
  const { user } = useAuth();
  const { sendMessage } = useChat();
  const { t } = useLanguage();
  const [, navigate] = useLocation();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [startingChat, setStartingChat] = useState<number | null>(null);
  const [anonymousMode, setAnonymousMode] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!socket.connected) {
      setLoading(false); // لمنع التعليق في حال عدم وجود اتصال
      return;
    }

    const handleProfessionals = (data: Professional[]) => {
      setProfessionals(data);
      setLoading(false);
    };

    socket.emit('get professionals');
    socket.on('professionals', handleProfessionals);

    return () => {
      socket.off('professionals', handleProfessionals);
    };
  }, []);

  const toggleAnonymous = (id: number) => {
    setAnonymousMode(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleStartChat = async (professionalId: number) => {
    if (!user) return;
    setStartingChat(professionalId);
    const isAnon = anonymousMode[professionalId] || false;

    // تأمين جلب النصوص في حال كانت الترجمة لم تحمل بعد
    const greeting = (t.chatSection?.greetingMessage || "مرحباً") + 
                     (isAnon ? (t.chatSection?.greetingAnonymous || " (رسالة مجهولة)") : '');

    try {
      await sendMessage(professionalId, greeting, isAnon);
      // التوجيه للمسار الجديد للرسائل بعد بدء المحادثة
      setTimeout(() => navigate('/messages'), 500);
    } catch (err) {
      console.error("فشل بدء المحادثة", err);
      setStartingChat(null);
    }
  };

  if (!user) return <div className="p-6 text-center text-sm">{t.chatSection?.loginRequired || "يرجى تسجيل الدخول أولاً"}</div>;
  if (loading) return <div className="p-6 text-center text-sm">{t.chatSection?.loadingProfessionals || "جاري البحث عن مختصين..."}</div>;

  return (
    <div className="container mx-auto p-4 max-w-[430px] min-h-screen bg-background border-x" dir="rtl">
      <h1 className="text-xl font-bold mb-2 text-primary">{t.chatSection?.professionals || "المختصين"}</h1>
      <p className="text-xs text-muted-foreground mb-6">{t.chatSection?.professionalsDesc || "تحدث مع مختصين نفسيين في بيئة آمنة وخصوصية تامة."}</p>

      {professionals.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">{t.chatSection?.noProfessionals || "لا يوجد مختصون متاحون حالياً."}</p>
      ) : (
        <div className="grid gap-4">
          {professionals.map((pro) => (
            <Card key={pro.id}>
              <CardHeader>
                <CardTitle>{pro.username}</CardTitle>
                <p className="text-xs text-muted-foreground">{pro.specialty || "مختص دعم نفسي"}</p>
              </CardHeader>
              <CardContent>
                <Badge variant={pro.available ? "default" : "secondary"}>
                  {pro.available ? (t.chatSection?.available || "متاح") : (t.chatSection?.unavailable || "غير متاح")}
                </Badge>

                <label className="flex items-center gap-2 mt-4 cursor-pointer text-xs font-medium text-muted-foreground">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                    checked={anonymousMode[pro.id] || false}
                    onChange={() => toggleAnonymous(pro.id)}
                  />
                  {t.chatSection?.anonymousOption || "تحدث بهوية مجهولة"}
                </label>

                <Button
                  className="w-full mt-4 text-xs"
                  onClick={() => handleStartChat(pro.id)}
                  disabled={!pro.available || startingChat === pro.id}
                >
                  {startingChat === pro.id ? (t.chatSection?.starting || "جاري التحميل...") : (t.chatSection?.startChat || "بدء المحادثة")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
