import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { CommunityPost, CreateCommunityPostInput } from "@/types";

export function useCommunityPosts() {
  return useQuery<CommunityPost[]>({
    queryKey: ["/api/community"],
    queryFn: async () => {
      const res = await fetch("/api/community");
      if (!res.ok) throw new Error("Failed to fetch community posts");
      return res.json();
    },
  });
}

export function useCreateCommunityPost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateCommunityPostInput) => {
      const res = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create post");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/community"] });
    },
  });
}
