import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireRoleApi } from "@/lib/get-session";
import Test from "@/models/Test";
import Result from "@/models/Result";
import User from "@/models/User";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const {session, error} = await requireRoleApi("admin", "teacher");
  if(session == null){
    return error
  }
  await connectDB();

  const { id } = await params;
  const test = await Test.findById(id).populate("course", "title").lean();
  if (!test) {
    return NextResponse.json({ message: "Test not found" }, { status: 404 });
  }

  const results = await Result.find({ testId: id })
    .populate("student", "name email")
    .lean();

  return NextResponse.json({
    test: {
      _id: test._id,
      title: test.title,
      duration: test.duration,
      marksPerQuestion: test.marksPerQuestion,
      negativeMarking: test.negativeMarking,
      isPublished: test.isPublished,
      createdAt: test.createdAt,
      course: typeof test.course === "string" ? null : test.course ?? null,
      questionsCount: test.questions?.length ?? 0,
      totalMarks: (test.questions?.length ?? 0) * test.marksPerQuestion,
    },
    results: results.map((result) => ({
      _id: result._id,
      score: result.score,
      totalScore: result.totalScore,
      createdAt: result.createdAt,
      student:
        typeof result.student === "string"
          ? { _id: result.student, name: "Unknown student", email: "" }
          : {
              _id: result.student?._id ?? "",
              name: result.student?.name ?? "Unknown student",
              email: result.student?.email ?? "",
            },
    })),
  });
}
