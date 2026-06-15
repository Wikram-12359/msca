// app/api/meetings/route.ts
import { connectDB } from "@/lib/db";
import { requireRoleApi } from "@/lib/get-session";
import Meeting from "@/models/Meeting";
import "@/models/User";
import { NextRequest, NextResponse } from "next/server";

// app/api/meetings/route.ts
export async function GET(req: NextRequest) {
  const {session, error} = await requireRoleApi("student", "admin", "teacher");
  if(session == null){
    return error
  }
  await connectDB();

  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");
  const role = session.user.role as string;
  console.log(courseId);

  let filter: Record<string, unknown> = {};

  if (role === "student") {
    const enrolledCourses = (session.user as any).enrolledCourses ?? [];

    // Security check — student must be enrolled in this course
    if (courseId && !enrolledCourses.includes(courseId)) {
      return NextResponse.json({ message: "Not enrolled" }, { status: 403 });
    }

    filter = {
      course: courseId ?? { $in: enrolledCourses },
      isActive: true, // students only see active meetings
    };
  } else {
    // Teachers and admins see everything, optionally filtered by course
    filter = courseId ? { course: courseId } : {};
  }

  const meetings = await Meeting.find(filter)
    .populate("teacher", "name email")
    .populate("course", "title")
    .sort({ scheduledAt: -1 });

  return NextResponse.json(meetings);
}