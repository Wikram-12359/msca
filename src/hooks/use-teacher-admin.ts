import api from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Teacher {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  createdAt?: Date;
}

export function useAdminTeachers() {
  return useQuery<Teacher[]>({
    queryKey: ["admin", "teachers"],
    queryFn: () => 
      api.get("/admin/teacher").then((r) => r.data.data || []),
  });
}

export function useDeleteTeacher() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (teacherId: string) =>
      api.delete(`/admin/teacher?id=${teacherId}`).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "teachers"] });
      // Also invalidate courses since teachers are removed from courses
      queryClient.invalidateQueries({ queryKey: ["admin", "courses"] });
    },
  });
}
