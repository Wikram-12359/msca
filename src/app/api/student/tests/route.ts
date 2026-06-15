import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireRoleApi } from "@/lib/get-session";
import Test from "@/models/Test";
import User from "@/models/User";
import Result from "@/models/Result";

export async function GET(req: NextRequest) {
  const {session, error} = await requireRoleApi("student");
  if(session == null){
    return error
  }
  await connectDB();

  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");
  if (!courseId) {
    return NextResponse.json({ message: "Missing courseId" }, { status: 400 });
  }

  // Check if student is enrolled in the course
  const user = await User.findById(session.user.id).lean();
  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });
  const enrolled = (user.enrolledCourses || []).includes(courseId);
  if (!enrolled) {
    return NextResponse.json({ message: "Not enrolled in this course" }, { status: 403 });
  }

  const completedResults = await Result.find({
    student: session.user.id,
  })
    .select("testId")
    .lean();
  const attemptedTestIds = completedResults.flatMap((result) =>
    Array.isArray(result.testId) ? result.testId.map(String) : [String(result.testId)]
  );

  const tests = await Test.find({
    course: courseId,
    isPublished: true,
    _id: { $nin: attemptedTestIds },
  })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({ data: tests });
}
