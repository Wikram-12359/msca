// app/api/tests/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireRoleApi } from "@/lib/get-session";
import Test from "@/models/Test";
import Result from "@/models/Result";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const {session, error} = await requireRoleApi("admin", "teacher", "student");
  if(session == null){
    return error
  }
  await connectDB();

  const { id } = await params;
  const test = await Test.findById(id).populate("course", "title");

  if (!test) return NextResponse.json({ message: "Not found" }, { status: 404 });

  let attempted = false;
  if (session.user.role === "student") {
    const existingResult = await Result.findOne({
      student: session.user.id,
      testId: { $in: [id] },
    }).lean();
    attempted = Boolean(existingResult);
  }

  // Strip correct answers before sending to students
  return NextResponse.json({
    ...test.toObject(),
    attempted,
    questions: test.questions.map((q: { text: string; options: string[] }) => ({
      text: q.text,
      options: q.options,
      // correct is intentionally omitted
    })),
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const {session, error} = await requireRoleApi("admin", "teacher");
  if(session == null){
    return error
  }
  await connectDB();

  const { id } = await params;
  const body = await req.json();

  const test = await Test.findOneAndUpdate(
    { _id: id, createdBy: session.user.id },
    { $set: body },
    { new: true }
  );

  if (!test) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(test);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const {session, error} = await requireRoleApi("admin", "teacher");
  if(session == null){
    return error
  }
  await connectDB();

  const { id } = await params;
  await Test.findOneAndDelete({ _id: id, createdBy: session.user.id });
  return NextResponse.json({ success: true });
}