import { Link, useLocation } from "wouter";
import { Home, BookHeart, CalendarDays, Users } from "lucide-react";
import { clsx } from "clsx";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BottomNav() {
  const [location] = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { href: "/", icon: Home, label: t.nav.home },
    { href: "/resources", icon: BookHeart, label: t.nav.resources },
    { href: "/workshops", icon: CalendarDays, label: t.nav.workshops },
    { href: "/community", icon: Users, label: t.nav.community },
  ];

  return (
    <div className="fixed bottom-0 w-full max-w-[430px] z-50">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-t border-border/50" />

      <nav className="relative flex justify-around items-center px-2 py-3 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        {navItems.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-16 h-12 outline-none"
            >
              <div className={clsx(
                "flex flex-col items-center justify-center gap-1 transition-all duration-300 ease-out",
                isActive ? "text-primary scale-110" : "text-muted-foreground hover:text-foreground/80 scale-100"
              )}>
                <div className="relative">
                  <Icon className={clsx(
                    "w-6 h-6 transition-all duration-300",
                    isActive ? "stroke-[2.5px]" : "stroke-2"
                  )} />
                  {isActive && (
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-in zoom-in fade-in" />
                  )}
                </div>
                <span className={clsx(
                  "text-[10px] font-medium transition-opacity duration-200 tracking-tight",
                  isActive ? "opacity-100 font-bold" : "opacity-70"
                )}>
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
