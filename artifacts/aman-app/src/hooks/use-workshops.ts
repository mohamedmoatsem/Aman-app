import { useQuery } from "@tanstack/react-query";
import type { Workshop } from "@/types";

export function useWorkshops() {
  return useQuery<Workshop[]>({
    queryKey: ["/api/workshops"],
    queryFn: async () => {
      const res = await fetch("/api/workshops");
      if (!res.ok) throw new Error("Failed to fetch workshops");
      return res.json();
    },
  });
}
