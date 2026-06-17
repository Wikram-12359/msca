// hooks/use-student-results.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export interface StudentResult {
  _id: string;
  score: number;
  totalScore: number;
  createdAt: string;
  test: {
    _id: string;
    title: string;
    course: {
      _id: string;
      title: string;
    };
  };
}

export function useStudentResults() {
  return useQuery({
    queryKey: ["student-results"],
    queryFn: async () => {
      const response = await api.get("/student/results");
      return response.data.data as StudentResult[];
    },
  });
}
