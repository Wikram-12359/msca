// hooks/use-auth-session.ts
"use client";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

export function useAuthSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: () => authClient.getSession(),
    staleTime: 1000 * 60 * 5, // 5 min
  });
}