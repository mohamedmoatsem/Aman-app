import { Link } from "wouter";
import { Phone, BookHeart, CalendarDays, Users, ShieldCheck, HeartHandshake } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";

export default function Home() {
  const quickLinks = [
    { href: "/resources", icon: BookHeart, title: "الموارد", desc: "مقالات ونصائح", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { href: "/workshops", icon: CalendarDays, title: "الورش", desc: "فعاليات قادمة", color: "text-amber-500", bg: "bg-amber-500/10" },
    { href: "/community", icon: Users, title: "المجتمع", desc: "شارك قصتك", color: "text-sky-500", bg: "bg-sky-500/10" },
    { href: "/resources", icon: ShieldCheck, title: "الحماية", desc: "إرشادات الأمان", color: "text-indigo-500", bg: "bg-indigo-500/10" },
  ];

  return (
    <MobileLayout>
      <div className="relative min-h-[40vh] w-full bg-primary flex flex-col justify-end overflow-hidden">
        {/* Background Image/Gradient */}
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
            alt="" 
            className="w-full h-full object-cover mix-blend-overlay opacity-50"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-primary" />
        </div>

        {/* Header Content */}
        <div className="relative z-10 px-6 pb-10 pt-16 flex flex-col text-white">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md p-3 mb-6 shadow-lg border border-white/20">
            <img 
              src={`${import.meta.env.BASE_URL}images/logo.png`} 
              alt="أمان Logo" 
              className="w-full h-full object-contain brightness-0 invert"
            />
          </div>
          <h1 className="text-3xl font-extrabold mb-3 leading-tight drop-shadow-md">
            أهلاً بك في أمان
          </h1>
          <p className="text-primary-foreground/90 text-base max-w-[280px] leading-relaxed mb-8">
            نحن هنا لدعمك وحمايتك. مساحتك الآمنة للتواصل، التعلم، والنمو.
          </p>

          <div className="flex flex-col gap-3">
            <a 
              href="tel:999" 
              className="flex items-center justify-center gap-3 w-full bg-white text-primary px-6 py-4 rounded-2xl font-bold text-lg shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:scale-[1.02] active:scale-95 transition-all duration-200"
            >
              <Phone className="w-5 h-5 fill-current" />
              <span>احصل على الدعم الطارئ</span>
            </a>
            
            <Link 
              href="/resources"
              className="flex items-center justify-center gap-3 w-full bg-black/10 backdrop-blur-md border border-white/20 text-white px-6 py-4 rounded-2xl font-semibold text-lg hover:bg-black/20 active:scale-95 transition-all duration-200"
            >
              <HeartHandshake className="w-5 h-5" />
              <span>تصفح الموارد والنصائح</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 pb-12 rounded-t-[32px] bg-background -mt-6 relative z-20 flex flex-col gap-8 shadow-[0_-8px_30px_rgba(0,0,0,0.05)]">
        
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">الوصول السريع</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {quickLinks.map((item, i) => (
              <Link 
                key={i} 
                href={item.href}
                className="flex flex-col p-5 bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-md hover:border-border transition-all active:scale-[0.98]"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.bg} ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-secondary/10 border border-secondary/20 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10">
            <h3 className="text-secondary-foreground font-bold text-lg mb-2 text-secondary">نصيحة اليوم</h3>
            <p className="text-foreground/80 leading-relaxed text-sm">
              لا تتردد في طلب المساعدة عندما تشعر بعدم الأمان. المجتمع هنا لدعمك وتوفير بيئة خالية من الأحكام.
            </p>
          </div>
        </section>
      </div>
    </MobileLayout>
  );
}
