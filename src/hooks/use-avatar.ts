// hooks/use-avatar.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import api from "@/lib/axios";

export function useUpdateAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (imageUrl: string) =>
      api.patch("/users/avatar", {imageUrl}).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.session });
    },
  });
}