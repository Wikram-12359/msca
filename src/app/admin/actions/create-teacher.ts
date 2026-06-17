"use server";
import { requireRole } from "@/lib/get-session";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";

type CreateTeacherInput = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

export async function createTeacher(data: CreateTeacherInput) {
  await requireRole("admin");

  const { name, email, password, phone } = data;

  try {
    const { user } = await auth.api.createUser({
      body: {
        name,
        email,
        password,
        role: "teacher",
        data:{
          phone,
          emailVerified:true
        }
      }
    });

    await connectDB()
    // Manually set emailVerified since createUser ignores it
    await mongoose.connection.db!
    .collection("user")
    .updateOne(
      { _id: new mongoose.Types.ObjectId(user.id) },
      { $set: { emailVerified: true } }
    );

    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message ?? "Failed to create teacher" };
  }
}
