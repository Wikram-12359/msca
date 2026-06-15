// store/student-store.ts
import { create } from "zustand";

type Course = {
  _id: string;
  title: string;
  description?: string;
  teacher?: { name: string; email: string };
  subjects?: string[];
  createdAt: string;
};

type StudentStore = {
  enrolledCourses: Course[];
  setEnrolledCourses: (courses: Course[]) => void;
  getCourse: (id: string) => Course | undefined;
};

export const useStudentStore = create<StudentStore>((set, get) => ({
  enrolledCourses: [],
  setEnrolledCourses: (courses) => set({ enrolledCourses: courses }),
  getCourse: (id) => get().enrolledCourses.find((c) => c._id === id),
}));