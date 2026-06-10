"use server"
import { requireRole } from "@/lib/get-session";
import { auth } from "@/lib/auth";

type CreateTeacherInput = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

export async function createTeacher(data: CreateTeacherInput) {
  // Only admins can call this
  await requireRole("admin");

  const { name, email, password, phone } = data;

  try {
    const user = await auth.api.createUser({
      body: {
        name,
        email,
        password,
        role: "teacher",
        phone,
        emailVerified: true, // skip email verification for admin-created accounts
      },
    });

    return { success: true, user };
  } catch (error: any) {
    // Better Auth throws if email already exists
    return { success: false, error: error.message ?? "Failed to create teacher" };
  }
}