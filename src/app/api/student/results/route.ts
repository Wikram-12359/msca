import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireRoleApi } from "@/lib/get-session";
import Result from "@/models/Result";

export async function GET(req: NextRequest) {
  const { session, error } = await requireRoleApi("student");
  if (session == null) {
    return error;
  }

  await connectDB();

  const results = await Result.find({
    student: session.user.id,
    attempted: true,
  })
    .populate({
      path: "testId",
      populate: {
        path: "course",
        select: "title",
      },
    })
    .sort({ createdAt: -1 })
    .lean();

  const formattedResults = results
    .flatMap((result) => {
      const testIds = Array.isArray(result.testId)
        ? result.testId
        : [result.testId];
      return testIds.map((test: any) => ({
        _id: result._id,
        score: result.score,
        totalScore: result.totalScore,
        createdAt: result.createdAt,
        test: {
          _id: test._id,
          title: test.title,
          course: {
            _id: test.course?._id,
            title: test.course?.title || "Unknown Course",
          },
        },
      }));
    });

  return NextResponse.json({ data: formattedResults });
}
