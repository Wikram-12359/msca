// hooks/use-tests.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";

export function useTests() {
  return useQuery({
    queryKey: ["tests"],
    queryFn: () => api.get("/tests"),
  });
}

export function useTest(id: string) {
  return useQuery({
    queryKey: ["tests", id],
    queryFn: () => api.get(`/tests/${id}`),
    enabled: !!id,
  });
}

export function usePublishTest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isPublished }: { id: string; isPublished: boolean }) =>
      api.patch(`/tests/${id}`, { isPublished }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tests"] }),
  });
}