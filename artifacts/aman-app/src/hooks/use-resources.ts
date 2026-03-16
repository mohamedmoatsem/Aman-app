import { useQuery } from "@tanstack/react-query";
import type { Resource } from "@/types";

export function useResources() {
  return useQuery<Resource[]>({
    queryKey: ["/api/resources"],
    queryFn: async () => {
      const res = await fetch("/api/resources");
      if (!res.ok) throw new Error("Failed to fetch resources");
      return res.json();
    },
  });
}

export function useResource(id: number) {
  return useQuery<Resource>({
    queryKey: ["/api/resources", id],
    queryFn: async () => {
      const res = await fetch(`/api/resources/${id}`);
      if (res.status === 404) throw new Error("Resource not found");
      if (!res.ok) throw new Error("Failed to fetch resource");
      return res.json();
    },
    enabled: !!id,
  });
}
