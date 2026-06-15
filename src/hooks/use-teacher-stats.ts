import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import api from "@/lib/axios";

export function useTeacherStats() {
  return useQuery({
    queryKey: queryKeys.teacher.courses,
    queryFn: () => api.get("/teacher/course").then((r) => r.data),
  });
}