import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CommunityPost, CreateCommunityPostInput } from "@/types";

const BASE_URL = import.meta.env.BASE_URL?.replace(/\/$/, "") ?? "";

export function useCommunityPosts() {
  return useQuery<CommunityPost[]>({
    queryKey: ["community-posts"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/api/community`);
      if (!res.ok) throw new Error("Failed to fetch community posts");
      return res.json();
    },
  });
}

export function useCreateCommunityPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCommunityPostInput) => {
      const res = await fetch(`${BASE_URL}/api/community`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as any).error || "Failed to create post");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["community-posts"] });
    },
  });
}
