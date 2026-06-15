// app/api/tests/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireRoleApi } from "@/lib/get-session";
import Test from "@/models/Test";

export async function GET() {
  const {session, error} = await requireRoleApi("admin", "teacher");
  if(session == null){
    return error
  }
  await connectDB();

  const tests = await Test.find({ createdBy: session.user.id })
    .populate("course", "title")
    .sort({ createdAt: -1 });

  return NextResponse.json(tests);
}

export async function POST(req: NextRequest) {
  const {session, error} = await requireRoleApi("admin", "teacher");
  if(session == null){
    return error
  }
  await connectDB();

  const body = await req.json();
  const { title, course, duration, marksPerQuestion, negativeMarking, questions } = body;

  if (!title || !course || !duration || !questions?.length) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  const test = await Test.create({
    title,
    course,
    duration,
    marksPerQuestion: marksPerQuestion ?? 1,
    negativeMarking: negativeMarking ?? 0,
    questions,
    createdBy: session.user.id,
  });

  return NextResponse.json(test, { status: 201 });
}