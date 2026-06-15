// lib/get-session.ts
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

type Role = "student" | "teacher" | "admin";

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) redirect("/login");
  return session;
}

// alias — same thing, clearer name in some contexts
export const getRequiredSession = requireAuth;

export async function requireRole(...roles: Role[]) {
  const session = await requireAuth();
  const userRole = session.user.role as Role;
  if (!roles.includes(userRole)) redirect("/403");
  return session;
}


export async function requireRoleApi(...roles: Role[]) {
  const session = await getSession();

  if (!session) {
    return {
      session: null,
      error: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };
  }

  // If no roles specified — any authenticated user passes
  if (roles.length > 0) {
    const userRole = session.user.role as Role;
    if (!roles.includes(userRole)) {
      return {
        session: null,
        error: NextResponse.json({ message: "Forbidden" }, { status: 403 }),
      };
    }
  }

  return { session, error: null };
}
