import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, CheckCircle2 } from "lucide-react";

const STORAGE_KEY = "aman_disclaimer_accepted";

export default function DisclaimerModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY);
    if (!accepted) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="disclaimer-title"
            aria-describedby="disclaimer-body"
            dir="rtl"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[101] flex items-center justify-center px-5 py-8"
          >
            <div className="w-full max-w-md bg-white rounded-[28px] shadow-2xl overflow-hidden">

              {/* Header stripe */}
              <div className="bg-gradient-to-l from-amber-500 to-orange-500 px-6 py-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2
                    id="disclaimer-title"
                    className="text-xl font-extrabold text-white leading-tight"
                  >
                    تنبيه هام
                  </h2>
                  <p className="text-white/80 text-xs mt-0.5">يُرجى القراءة بعناية قبل المتابعة</p>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 pt-6 pb-5">
                <p
                  id="disclaimer-body"
                  className="text-gray-700 text-sm leading-[1.9] text-right"
                >
                  مرحباً بك في تطبيق <span className="font-bold text-primary">أمان</span>.
                  نود التأكيد أن هذا التطبيق مخصص للدعم النفسي ومشاركة الموارد المعرفية فقط،
                  وهو <span className="font-semibold text-orange-600">ليس بديلاً</span> عن الاستشارة
                  الطبية المتخصصة أو التدخل النفسي المهني.
                </p>

                {/* Emergency callout */}
                <div className="mt-5 bg-red-50 border border-red-200 rounded-2xl px-4 py-3.5 flex items-start gap-3 text-right">
                  <div className="w-1.5 h-full min-h-[32px] rounded-full bg-red-400 shrink-0 mt-0.5" />
                  <p className="text-red-700 text-[13px] leading-relaxed">
                    في حالات الطوارئ النفسية، يرجى التوجه فوراً لأقرب مركز طبي أو التواصل مع الجهات المختصة.
                  </p>
                </div>
              </div>

              {/* Footer / Accept button */}
              <div className="px-6 pb-6">
                <button
                  onClick={handleAccept}
                  className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-l from-primary to-sky-400 hover:opacity-90 active:scale-[0.98] text-white font-bold text-base py-4 rounded-2xl transition-all shadow-lg shadow-primary/25"
                  autoFocus
                >
                  <CheckCircle2 className="w-5 h-5" />
                  أوافق وأفهم ذلك
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
