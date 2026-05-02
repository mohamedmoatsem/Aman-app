import { useState } from "react";
import { useLocation } from "wouter";
import MobileLayout from "@/components/layout/MobileLayout";
import Header from "@/components/layout/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfessionals, startConversation } from "@/hooks/use-messages";
import {
  UserCircle2,
  ShieldCheck,
  EyeOff,
  MessageCircle,
  Stethoscope,
  CheckCircle2,
  Clock,
} from "lucide-react";

const COLORS = [
  "from-sky-400 to-sky-600",
  "from-emerald-400 to-emerald-600",
  "from-violet-400 to-violet-600",
  "from-rose-400 to-rose-600",
];

const TITLES = ["د.", "أ.د.", "د.", "أ."];

export default function Professionals() {
  const { professionals, loading, error } = useProfessionals();
  const [, navigate] = useLocation();
  const [startingId, setStartingId] = useState<number | null>(null);
  const [anonymous, setAnonymous] = useState<Record<number, boolean>>({});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleStart = async (proId: number) => {
    setStartingId(proId);
    setErrorMsg(null);
    const result = await startConversation(proId, anonymous[proId] ?? false);
    if (result) {
      navigate(`/messages?conv=${result.conversationId}`);
    } else {
      setErrorMsg("تعذّر بدء المحادثة، يرجى المحاولة مجدداً");
      setStartingId(null);
    }
  };

  return (
    <MobileLayout>
      <Header title="تواصل مع مختص" />

      <div className="px-4 py-5 flex flex-col gap-5">

        {/* Banner */}
        <div className="bg-gradient-to-br from-primary/10 via-emerald-50/50 to-transparent rounded-3xl p-5 border border-primary/10">
          <div className="flex gap-3 items-start">
            <div className="p-2.5 bg-primary/15 rounded-2xl shrink-0">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-bold text-foreground text-sm mb-1">خصوصية تامة وبيئة آمنة</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                جميع محادثاتك مشفّرة. يمكنك التحدث بهوية مجهولة إذا رغبت في ذلك. مختصونا مدرَّبون على الاستماع دون إصدار أحكام.
              </p>
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="bg-destructive/10 text-destructive text-sm rounded-2xl px-4 py-3 text-center">
            {errorMsg}
          </div>
        )}

        {/* Loading skeletons */}
        {loading && Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-3xl p-5 flex gap-4">
            <Skeleton className="w-14 h-14 rounded-2xl shrink-0" />
            <div className="flex-1 flex flex-col gap-2">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-9 w-full mt-2 rounded-xl" />
            </div>
          </div>
        ))}

        {error && (
          <div className="text-center py-8 text-muted-foreground text-sm">{error}</div>
        )}

        {/* Professional cards */}
        {professionals.map((pro, idx) => {
          const initials = pro.username.replace("د.", "").replace("أ.د.", "").trim().split(" ").map(w => w[0]).join("").slice(0, 2);
          const gradient = COLORS[idx % COLORS.length];
          const isStarting = startingId === pro.id;

          return (
            <div
              key={pro.id}
              className="bg-card border border-border rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4 items-start">
                {/* Avatar */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-sm`}>
                  <span className="text-white font-bold text-lg">{initials}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-foreground text-base">{pro.username}</h3>
                    <span className="flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      متاح
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 shrink-0" />
                    {pro.specialty}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 shrink-0" />
                    متوفر الآن — استجابة خلال دقائق
                  </p>
                </div>
              </div>

              {/* Anonymous toggle */}
              <label className="flex items-center gap-2.5 mt-4 cursor-pointer select-none group">
                <div
                  onClick={() => setAnonymous(p => ({ ...p, [pro.id]: !p[pro.id] }))}
                  className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
                    anonymous[pro.id] ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                    anonymous[pro.id] ? "translate-x-5" : "translate-x-0.5"
                  }`} />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>التحدث بهوية مجهولة</span>
                </div>
              </label>

              {/* Start button */}
              <button
                onClick={() => handleStart(pro.id)}
                disabled={isStarting || startingId !== null}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3 rounded-2xl hover:opacity-90 active:scale-[0.98] disabled:opacity-50 transition-all"
              >
                {isStarting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>جاري بدء المحادثة...</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    <span>ابدأ المحادثة</span>
                  </>
                )}
              </button>
            </div>
          );
        })}

        {!loading && professionals.length === 0 && !error && (
          <div className="py-12 flex flex-col items-center text-center gap-3 opacity-50">
            <UserCircle2 className="w-12 h-12" />
            <p className="text-sm">لا يوجد مختصون متاحون حالياً</p>
          </div>
        )}

        {/* Footer note */}
        <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-4">
          <p className="text-xs text-amber-800 leading-relaxed text-center">
            ⚠️ هذه الخدمة للدعم النفسي والإرشاد فقط، وليست بديلاً عن الرعاية الطبية الطارئة.
            في حالات الطوارئ اتصل بـ <strong>137</strong> (الإسعاف السوداني)
          </p>
        </div>
      </div>
    </MobileLayout>
  );
}
