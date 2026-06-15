// hooks/use-password.ts
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) =>
      api.patch("/users/password", data),
    onSuccess: () => toast.success("Password updated!"),
    onError: (err: any) => toast.error(err.message ?? "Failed to update password"),
  });
}