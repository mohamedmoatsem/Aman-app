import MobileLayout from "@/components/layout/MobileLayout";
import Header from "@/components/layout/Header";
import { useWorkshops } from "@/hooks/use-workshops";
import { MapPin, CalendarClock, Clock, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format, parseISO } from "date-fns";
import { arSA } from "date-fns/locale";

export default function Workshops() {
  const { data: workshops, isLoading, error } = useWorkshops();

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      return {
        day: format(date, 'd', { locale: arSA }),
        month: format(date, 'MMM', { locale: arSA }),
        full: format(date, 'EEEE، d MMMM yyyy', { locale: arSA }),
        time: format(date, 'h:mm a', { locale: arSA })
      };
    } catch {
      return { day: '?', month: '?', full: dateString, time: '' };
    }
  };

  return (
    <MobileLayout>
      <Header title="ورش العمل والفعاليات" />
      
      <div className="px-4 py-6 flex flex-col gap-5">
        <p className="text-muted-foreground px-2 text-sm leading-relaxed">
          انضم إلى ورش العمل وجلسات التوعية القادمة لتعزيز مهاراتك والتعرف على خبراء في مجال الحماية والأمان.
        </p>

        {isLoading && (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4 p-4 bg-card rounded-3xl border border-border shadow-sm">
              <Skeleton className="h-20 w-16 rounded-2xl shrink-0" />
              <div className="flex flex-col gap-2 w-full pt-1">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </div>
            </div>
          ))
        )}

        {error && (
          <div className="p-6 bg-destructive/10 text-destructive rounded-3xl flex flex-col items-center justify-center text-center gap-3">
            <AlertCircle className="w-10 h-10" />
            <p className="font-medium">حدث خطأ في جلب بيانات ورش العمل.</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {workshops?.map((workshop) => {
            const dateInfo = formatDate(workshop.date);
            
            return (
              <div 
                key={workshop.id} 
                className="bg-card rounded-[24px] p-4 flex gap-4 border border-border shadow-sm hover:shadow-md transition-all relative overflow-hidden"
              >
                {/* Date Badge */}
                <div className="w-[72px] bg-secondary/10 text-secondary shrink-0 rounded-[20px] flex flex-col items-center justify-center py-3 border border-secondary/20 h-fit">
                  <span className="text-2xl font-black leading-none">{dateInfo.day}</span>
                  <span className="text-xs font-bold mt-1">{dateInfo.month}</span>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 py-1">
                  <h3 className="font-bold text-foreground text-base leading-tight mb-2">
                    {workshop.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                    {workshop.description}
                  </p>
                  
                  <div className="flex flex-col gap-2 mt-auto">
                    <div className="flex items-center gap-2 text-xs text-foreground/70">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{dateInfo.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground/70">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      <span className="truncate">{workshop.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {workshops?.length === 0 && (
          <div className="py-16 flex flex-col items-center justify-center text-center opacity-50">
            <CalendarClock className="w-12 h-12 mb-3" />
            <p className="font-medium">لا توجد ورش عمل مجدولة حالياً</p>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
