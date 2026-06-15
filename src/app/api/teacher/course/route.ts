import { connectDB } from "@/lib/db";
import { requireRoleApi } from "@/lib/get-session";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function GET() {
  const {session, error} = await requireRoleApi("admin", "teacher");
  if(session == null){
    return error
  }
  await connectDB();

  const teacherId = session.user.id;

  const [courseCount, courses] = await Promise.all([
    Course.countDocuments({ teachers: teacherId }),
    Course.find({ teachers: teacherId }).select("_id title createdAt"),
  ]);

  console.log(courses);

  return NextResponse.json({
    courseCount,
    courses,
  });
}