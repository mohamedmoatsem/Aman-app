import { useState } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import Header from "@/components/layout/Header";
import { useCommunityPosts, useCreateCommunityPost } from "@/hooks/use-community";
import { MessageSquarePlus, User, Clock, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formatDistanceToNow, parseISO } from "date-fns";
import { arSA } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

const postSchema = z.object({
  title: z.string().min(3, "العنوان يجب أن يكون 3 أحرف على الأقل").max(100, "العنوان طويل جداً"),
  content: z.string().min(10, "المحتوى يجب أن يكون 10 أحرف على الأقل"),
  authorName: z.string().min(2, "الاسم مطلوب").max(50, "الاسم طويل جداً")
});

type PostFormValues = z.infer<typeof postSchema>;

export default function Community() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: posts, isLoading, error } = useCommunityPosts();
  const createPost = useCreateCommunityPost();
  const { toast } = useToast();

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema)
  });

  const onSubmit = async (data: PostFormValues) => {
    try {
      await createPost.mutateAsync(data);
      toast({
        title: "تمت إضافة المشاركة",
        description: "شكراً لمشاركة تجربتك مع المجتمع.",
      });
      setIsDialogOpen(false);
      reset();
    } catch (err) {
      toast({
        title: "خطأ",
        description: "لم نتمكن من نشر مشاركتك. حاول مرة أخرى.",
        variant: "destructive"
      });
    }
  };

  const getRelativeTime = (dateString: string) => {
    try {
      return formatDistanceToNow(parseISO(dateString), { addSuffix: true, locale: arSA });
    } catch {
      return "مؤخراً";
    }
  };

  return (
    <MobileLayout>
      <Header title="مجتمع أمان" />
      
      <div className="px-4 py-6 pb-24 flex flex-col gap-4">
        
        {isLoading && (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-5 bg-card rounded-3xl border border-border shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-5 w-3/4 mt-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))
        )}

        {error && (
          <div className="p-6 bg-destructive/10 text-destructive rounded-3xl flex flex-col items-center justify-center text-center gap-3">
            <AlertCircle className="w-10 h-10" />
            <p className="font-medium">حدث خطأ في تحميل المشاركات.</p>
          </div>
        )}

        {posts?.map((post) => (
          <article 
            key={post.id} 
            className="bg-card p-5 rounded-[24px] border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3"
          >
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground">{post.authorName}</h4>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{getRelativeTime(post.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-1">
              <h3 className="font-bold text-base mb-2 text-foreground">{post.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>
          </article>
        ))}

        {posts?.length === 0 && (
          <div className="py-16 flex flex-col items-center justify-center text-center opacity-50 px-4">
             <MessageSquarePlus className="w-12 h-12 mb-4 text-primary" />
             <h3 className="font-bold text-lg mb-1">كن أول من يشارك</h3>
             <p className="text-sm">هذه المساحة آمنة لمشاركة الأفكار والقصص. ابدأ بكتابة مشاركتك الأولى.</p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-0 w-full max-w-[430px] z-30 pointer-events-none px-6">
        <div className="flex justify-start"> {/* RTL: justify-start puts it on the left/start side, wait, RTL start is Right. Let's use absolute positioning */}
          <button
            onClick={() => setIsDialogOpen(true)}
            className="pointer-events-auto flex items-center justify-center w-14 h-14 bg-secondary text-white rounded-full shadow-[0_8px_20px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 transition-all"
            aria-label="إضافة مشاركة"
          >
            <MessageSquarePlus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Create Post Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogHeader>
          <DialogTitle>شارك مع المجتمع</DialogTitle>
          <DialogDescription>
            مشاركتك يمكن أن تكون مصدر إلهام أو دعم للآخرين.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-2 overflow-y-auto">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-foreground">الاسم (يمكنك استخدام اسم مستعار)</label>
            <input 
              {...register("authorName")}
              className="w-full bg-muted/50 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-xl px-4 py-3 outline-none transition-all"
              placeholder="مثال: فاعل خير، أمل..."
            />
            {errors.authorName && <span className="text-xs text-destructive">{errors.authorName.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-foreground">عنوان المشاركة</label>
            <input 
              {...register("title")}
              className="w-full bg-muted/50 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-xl px-4 py-3 outline-none transition-all"
              placeholder="اكتب عنواناً يعبر عن مشاركتك"
            />
            {errors.title && <span className="text-xs text-destructive">{errors.title.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-foreground">المحتوى</label>
            <textarea 
              {...register("content")}
              className="w-full bg-muted/50 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-xl px-4 py-3 outline-none transition-all min-h-[120px] resize-none"
              placeholder="ما الذي تود مشاركته؟"
            />
            {errors.content && <span className="text-xs text-destructive">{errors.content.message}</span>}
          </div>

          <div className="mt-4 pt-4 border-t border-border flex gap-3">
            <Button 
              type="submit" 
              className="flex-1 rounded-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? "جاري النشر..." : "نشر المشاركة"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1 rounded-xl"
              onClick={() => setIsDialogOpen(false)}
            >
              إلغاء
            </Button>
          </div>
        </form>
      </Dialog>
    </MobileLayout>
  );
}
