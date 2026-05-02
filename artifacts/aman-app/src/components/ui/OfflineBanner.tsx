import { useEffect, useRef, useState } from "react";
import { WifiOff, Wifi } from "lucide-react";
import { useOnlineStatus } from "@/hooks/use-online-status";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function OfflineBanner() {
  const isOnline = useOnlineStatus();
  const { t } = useLanguage();
  const isRtl = t.dir === "rtl";

  // Show "back online" flash for 3 s after reconnecting
  // wasOffline guards against firing on first mount
  const [justReconnected, setJustReconnected] = useState(false);
  const wasOffline = useRef(false);

  useEffect(() => {
    if (!isOnline) {
      wasOffline.current = true;
    } else if (wasOffline.current) {
      wasOffline.current = false;
      setJustReconnected(true);
      const timer = setTimeout(() => setJustReconnected(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  const show = !isOnline || justReconnected;

  const offlineAr = "أنت غير متصل بالإنترنت — تعرض بيانات محفوظة";
  const offlineEn = "You're offline — showing cached data";
  const onlineAr  = "عاد الاتصال بالإنترنت";
  const onlineEn  = "Back online";

  const msg  = isOnline
    ? (isRtl ? onlineAr  : onlineEn)
    : (isRtl ? offlineAr : offlineEn);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={isOnline ? "online" : "offline"}
          initial={{ opacity: 0, y: -36 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -36 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`
            w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold z-50
            ${isOnline
              ? "bg-emerald-500 text-white"
              : "bg-amber-500 text-white"}
          `}
          dir={t.dir}
          role="status"
          aria-live="polite"
        >
          {isOnline
            ? <Wifi className="w-3.5 h-3.5 shrink-0" />
            : <WifiOff className="w-3.5 h-3.5 shrink-0 animate-pulse" />
          }
          <span className="flex-1">{msg}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
