import { ReactNode } from "react";
import BottomNav from "./BottomNav";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

interface MobileLayoutProps {
  children: ReactNode;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  const [location] = useLocation();

  return (
    <div dir="rtl" className="min-h-screen bg-muted/30 w-full flex justify-center text-right font-sans selection:bg-primary/20">
      {/* Mobile container constraint to feel like an app on desktop */}
      <div className="w-full max-w-[430px] min-h-screen bg-background shadow-2xl relative flex flex-col overflow-x-hidden">
        <main className="flex-1 overflow-y-auto pb-[80px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="min-h-full flex flex-col"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        
        <BottomNav />
      </div>
    </div>
  );
}
