// hooks/use-meetings.ts
import api from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const MEETINGS_KEY = ["meetings"];
const TEACHER_MEETINGS_KEY = ["teacherMeetings"];

// Fetch all meetings
export function useMeetings() {
  return useQuery({
    queryKey: MEETINGS_KEY,
    queryFn: () => api.get("/meetings").then((r) => r.data),
  });
}

export function useTeacherMeetings() {
  return useQuery({
    queryKey: TEACHER_MEETINGS_KEY,
    queryFn: () => api.get("/teacher/meetings").then((r) => r.data),
  });
}

// Fetch one meeting
export function useMeeting(id: string) {
  return useQuery({
    queryKey: ["meetings", id],
    queryFn: () => api.get(`/meetings/${id}`).then((r) => r.data),
    enabled: !!id,
  });
}

// Create meeting
export function useCreateMeeting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      title: string;
      meetingLink: string;
      subjectId?: string;
      course: string;
    }) =>
      api.post("/teacher/meetings", data).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEETINGS_KEY });
      queryClient.invalidateQueries({ queryKey: TEACHER_MEETINGS_KEY });
    },
  });
}

// Toggle active state
export function useDeleteMeeting(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      api.delete(`/meetings/${id}`).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEETINGS_KEY });
      queryClient.invalidateQueries({ queryKey: ["meetings", id] });
    },
  });
}