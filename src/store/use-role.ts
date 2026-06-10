// hooks/use-role.ts
"use client";
import { authClient } from "@/lib/auth-client";

export function useRole() {
  const { data: session, isPending } = authClient.useSession();
  const role = session?.user?.role as "student" | "teacher" | "admin" | undefined;

  return {
    role,
    isPending,
    isStudent: role === "student",
    isTeacher: role === "teacher",
    isAdmin: role === "admin",
    isTeacherOrAdmin: role === "teacher" || role === "admin",
  };
}