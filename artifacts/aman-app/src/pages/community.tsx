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
import { arSA, enUS } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Community() {
  const { t } = useLanguage();
  const c = t.community;

  const postSchema = z.object({
    title: z.string().min(3, c.validTitle).max(100, c.validTitleMax),
    content: z.string().min(10, c.validContent),
    authorName: z.string().min(2, c.validName).max(50, c.validNameMax),
  });
  type PostFormValues = z.infer<typeof postSchema>;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: posts, isLoading, error } = useCommunityPosts();
  const createPost = useCreateCommunityPost();
  const { toast } = useToast();
  const dateLocale = t.workshops.dateLocale === "arSA" ? arSA : enUS;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data: PostFormValues) => {
    try {
      await createPost.mutateAsync(data);
      toast({ title: c.toastTitle, description: c.toastDesc });
      setIsDialogOpen(false);
      reset();
    } catch {
      toast({ title: c.toastErrorTitle, description: c.toastErrorDesc, variant: "destructive" });
    }
  };

  const getRelativeTime = (dateString: string) => {
    try {
      return formatDistanceToNow(parseISO(dateString), { addSuffix: true, locale: dateLocale });
    } catch {
      return c.recentlyLabel;
    }
  };

  return (
    <MobileLayout>
      <Header title={c.pageTitle} />

      <div className="px-4 py-6 pb-24 flex flex-col gap-4">

        {isLoading && Array.from({ length: 4 }).map((_, i) => (
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
        ))}

        {error && (
          <div className="p-6 bg-destructive/10 text-destructive rounded-3xl flex flex-col items-center justify-center text-center gap-3">
            <AlertCircle className="w-10 h-10" />
            <p className="font-medium">{c.error}</p>
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
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
            </div>
          </article>
        ))}

        {posts?.length === 0 && (
          <div className="py-16 flex flex-col items-center justify-center text-center opacity-50 px-4">
            <MessageSquarePlus className="w-12 h-12 mb-4 text-primary" />
            <h3 className="font-bold text-lg mb-1">{c.emptyTitle}</h3>
            <p className="text-sm">{c.emptyDesc}</p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-0 w-full max-w-[430px] z-30 pointer-events-none px-6">
        <div className="flex justify-start">
          <button
            onClick={() => setIsDialogOpen(true)}
            className="pointer-events-auto flex items-center justify-center w-14 h-14 bg-secondary text-white rounded-full shadow-[0_8px_20px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 transition-all"
            aria-label={c.dialogTitle}
          >
            <MessageSquarePlus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Create Post Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogHeader>
          <DialogTitle>{c.dialogTitle}</DialogTitle>
          <DialogDescription>{c.dialogDesc}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-2 overflow-y-auto">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-foreground">{c.nameLabel}</label>
            <input
              {...register("authorName")}
              className="w-full bg-muted/50 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-xl px-4 py-3 outline-none transition-all"
              placeholder={c.namePlaceholder}
            />
            {errors.authorName && <span className="text-xs text-destructive">{errors.authorName.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-foreground">{c.titleLabel}</label>
            <input
              {...register("title")}
              className="w-full bg-muted/50 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-xl px-4 py-3 outline-none transition-all"
              placeholder={c.titlePlaceholder}
            />
            {errors.title && <span className="text-xs text-destructive">{errors.title.message}</span>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-foreground">{c.contentLabel}</label>
            <textarea
              {...register("content")}
              className="w-full bg-muted/50 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-xl px-4 py-3 outline-none transition-all min-h-[120px] resize-none"
              placeholder={c.contentPlaceholder}
            />
            {errors.content && <span className="text-xs text-destructive">{errors.content.message}</span>}
          </div>

          <div className="mt-4 pt-4 border-t border-border flex gap-3">
            <Button type="submit" className="flex-1 rounded-xl" disabled={isSubmitting}>
              {isSubmitting ? c.publishing : c.publish}
            </Button>
            <Button type="button" variant="outline" className="flex-1 rounded-xl" onClick={() => setIsDialogOpen(false)}>
              {c.cancel}
            </Button>
          </div>
        </form>
      </Dialog>
    </MobileLayout>
  );
}
