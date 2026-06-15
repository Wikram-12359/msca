// hooks/use-courses-admin.ts
import api from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type Course = { _id: string; title: string };

export function useAdminCourses() {
  return useQuery<Course[]>({
    queryKey: ["admin", "courses"],
    queryFn: () => api.get("/admin/course").then((r) => r.data),
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId: string) =>
      api.delete(`/admin/course?id=${courseId}`).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "courses"] });
    },
  });
}

export function useEnrollStudents() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { courseId: string; studentIds: string[] }) =>
      api.post("/admin/students", data).then((r) => r.data),
    onSuccess: () => {
      // Refresh students list so enrolledCourses count updates
      queryClient.invalidateQueries({ queryKey: ["admin", "students"] });
    },
  });
}