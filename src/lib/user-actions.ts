// lib/user-actions.ts
"use server";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import { requireRoleApi} from "@/lib/get-session";
import { ObjectId } from "mongodb";

// Student enrolls in a course
export async function enrollInCourse(courseId: string) {
  const {session,error} = await requireRoleApi("student");
  if(session == null){
    return error
  }
  await connectDB();
  await mongoose.connection.db!.collection("user").updateOne(
    { _id: new ObjectId(session.user.id) },
    { $addToSet: { enrolledCourses: courseId } }
  );
}

// Admin promotes user to teacher
export async function setRole(userId: string, role: "student" | "teacher" | "admin") {
  const {session,error} = await requireRoleApi("admin");
  if(session == null){
    return error
  }
  await connectDB();
  await mongoose.connection.db!.collection("user").updateOne(
    { _id: userId },
    { $set: { role } }
  );
}
