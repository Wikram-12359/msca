// hooks/use-students.ts
import { useQuery } from "@tanstack/react-query";

type Student = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  enrolledCourses: string[];
  createdAt: string;
};

type StudentsResponse = {
  students: Student[];
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export function useStudents(page: number) {
  return useQuery({
    queryKey: ["admin", "students", page],
    queryFn: (): Promise<StudentsResponse> =>
      fetch(`/api/admin/students?page=${page}&limit=20`).then((r) => r.json()),
    placeholderData: (prev) => prev, // keeps old data while fetching next page
  });
}