// hooks/use-student-data.ts
import api from "@/lib/axios";
import { queryKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

// Enrolled courses only
export function useEnrolledCourses() {
  return useQuery({
    queryKey: ["student", "courses"],
    queryFn: () => api.get("/student/course").then((r) => r.data),
  });
}

// Meetings filtered by enrolled courses (filtering happens server-side)
export function useStudentMeetings(courseId: string) {
  return useQuery({
    queryKey: [...queryKeys.student.meetings, courseId],
    queryFn: () =>
      api.get(`/student/meetings?courseId=${courseId}`).then((r) => r.data),
    enabled: !!courseId,
  });
}