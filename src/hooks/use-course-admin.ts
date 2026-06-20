// hooks/use-courses-admin.ts
import api from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type subjectType = {
  _id: string,
  title: string
}

type Course = {
  _id: string;
  title: string;
  subjects: subjectType[];
}

export function useAdminCourses() {
  return useQuery<Course[]>({
    queryKey: ["admin", "courses"],
    queryFn: async () => {
      const res = await api.get("/admin/course");
      return res.data.data;
    }
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId: string) =>
      api.delete(`/admin/course?id=${courseId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "courses"] });
    },
  });
}

export function useEnrollStudents() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { courseId: string; studentIds: string[] }) =>
      api.post("/admin/students", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "students"] });
    },
  });
}
