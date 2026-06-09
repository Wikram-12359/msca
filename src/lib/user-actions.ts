// lib/user-actions.ts
"use server";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import { requireRole, getRequiredSession } from "@/lib/get-session";

// Student enrolls in a course
export async function enrollInCourse(courseId: string) {
  const session = await requireRole("student");
  await connectDB();
  await mongoose.connection.db!.collection("user").updateOne(
    { _id: session.user.id },
    { $addToSet: { enrolledCourses: courseId } }
  );
}

// Admin promotes user to teacher
export async function setRole(userId: string, role: "student" | "teacher" | "admin") {
  await requireRole("admin");
  await connectDB();
  await mongoose.connection.db!.collection("user").updateOne(
    { _id: userId },
    { $set: { role } }
  );
}