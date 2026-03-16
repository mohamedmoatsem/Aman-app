import MobileLayout from "@/components/layout/MobileLayout";
import Header from "@/components/layout/Header";
import { useResources } from "@/hooks/use-resources";
import { BookOpen, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Resources() {
  const { data: resources, isLoading, error } = useResources();

  return (
    <MobileLayout>
      <Header title="الموارد والنصائح" />
      
      <div className="px-4 py-6 flex flex-col gap-6">
        <div className="bg-gradient-to-br from-primary/10 to-transparent p-5 rounded-3xl border border-primary/10">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-primary/20 text-primary rounded-2xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-foreground mb-1">مكتبة المعرفة</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                اكتشف مقالات، دلائل، ونصائح عملية مصممة خصيصاً لحمايتك وتعزيز وعيك بأمانك الشخصي.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {isLoading && (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3 p-4 bg-card rounded-3xl border border-border shadow-sm">
                <Skeleton className="h-40 w-full rounded-2xl" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full mt-2" />
              </div>
            ))
          )}

          {error && (
            <div className="p-6 bg-destructive/10 text-destructive rounded-3xl flex flex-col items-center justify-center text-center gap-3">
              <AlertCircle className="w-10 h-10" />
              <p className="font-medium">عذراً، حدث خطأ في تحميل الموارد.</p>
            </div>
          )}

          {resources?.map((resource) => (
            <article 
              key={resource.id} 
              className="bg-card rounded-[24px] overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {resource.imageUrl ? (
                <div className="h-48 w-full bg-muted relative">
                  <img 
                    src={resource.imageUrl} 
                    alt={resource.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                    {resource.category}
                  </div>
                </div>
              ) : (
                <div className="px-5 pt-5 pb-0 flex justify-between items-start">
                   <span className="bg-primary/10 px-3 py-1 rounded-full text-xs font-bold text-primary">
                    {resource.category}
                  </span>
                </div>
              )}
              
              <div className="p-5 flex flex-col gap-2">
                <h3 className="font-bold text-lg text-foreground leading-tight">
                  {resource.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {resource.description}
                </p>
                
                <button className="mt-3 text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all w-fit">
                  اقرأ المزيد
                </button>
              </div>
            </article>
          ))}

          {resources?.length === 0 && (
             <div className="py-12 flex flex-col items-center justify-center text-center opacity-50">
              <BookOpen className="w-12 h-12 mb-3" />
              <p>لا توجد موارد حالياً</p>
             </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
}
