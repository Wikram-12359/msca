// app/api/tests/[id]/submit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireRoleApi } from "@/lib/get-session";
import Test from "@/models/Test";
import Result from "@/models/Result";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const {session, error} = await requireRoleApi("student");
      if(session == null){
        return error
      }
  await connectDB();

  const { id } = await params;
  const { answers } = await req.json();
  // answers: number[] — index of selected option per question

  const test = await Test.findById(id);
  if (!test) return NextResponse.json({ message: "Not found" }, { status: 404 });

  let correct = 0;
  let wrong = 0;
  let skipped = 0;

  const results = test.questions.map((q: { text: string; options: string[]; correct: number }, i: number) => {
    const selected = answers[i];
    if (selected === undefined || selected === null || selected === -1) {
      skipped++;
      return { selected: -1, correct: q.correct, isCorrect: false, isSkipped: true };
    }
    if (selected === q.correct) {
      correct++;
      return { selected, correct: q.correct, isCorrect: true, isSkipped: false };
    }
    wrong++;
    return { selected, correct: q.correct, isCorrect: false, isSkipped: false };
  });

  const rawScore = correct * test.marksPerQuestion - wrong * test.negativeMarking;
  const score = Math.max(0, rawScore);
  const total = test.questions.length * test.marksPerQuestion;
  const percentage = Math.round((score / total) * 100);

  // Save result to database
  await Result.create({
    score,
    totalScore: total,
    student: session.user.id,
    testId: [id],
    attempted: true,
  });

  return NextResponse.json({
    score,
    total,
    percentage,
    correct,
    wrong,
    skipped,
    results,
    questions: test.questions,
  });
}