import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireRoleApi } from "@/lib/get-session";
import Course from "@/models/Course";

export async function GET(request: NextRequest) {
  try {
    await requireRoleApi("student");
    await connectDB();

    // Get session again to access user fields
    const {session, error} = await requireRoleApi("student");
    if(session == null){
      return error
    }
    const enrolledCourseIds = (session.user as any).enrolledCourses ?? [];

    if (enrolledCourseIds.length === 0) {
      return NextResponse.json({ message: "success", data: [] }, { status: 200 });
    }

    // Fetch actual course documents using the IDs
    const courses = await Course.find({
      _id: { $in: enrolledCourseIds },
    });

    return NextResponse.json({ message: "success", data: courses }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch courses" }, { status: 500 });
  }
}