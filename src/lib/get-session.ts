// lib/get-session.ts
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type Role = "student" | "teacher" | "admin";

export async function getRequiredSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");
  return session;
}

export async function requireRole(...roles: Role[]) {
  const session = await getRequiredSession();
  const userRole = session.user.role as Role;
  if (!roles.includes(userRole)) redirect("/403");
  return session;
}