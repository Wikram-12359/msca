// app/api/student/courses/[courseId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireRoleApi } from "@/lib/get-session";
import Course from "@/models/Course";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  const {session, error} = await requireRoleApi("student");
  if(session == null){
    return error
  }
  await connectDB();

  const { courseId } = await params;
  const enrolledCourses = (session.user as any).enrolledCourses ?? [];

  // Make sure student is actually enrolled in this course
  if (!enrolledCourses.includes(courseId)) {
    return NextResponse.json(
      { message: "You are not enrolled in this course" },
      { status: 403 }
    );
  }

  const course = await Course.findById(courseId);

  if (!course) {
    return NextResponse.json({ message: "Course not found" }, { status: 404 });
  }

  return NextResponse.json(course);
}