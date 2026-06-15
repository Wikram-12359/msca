// app/api/meetings/route.ts
import { NextResponse } from "next/server";
import { requireRoleApi } from "@/lib/get-session";
import { connectDB } from "@/lib/db";
import Meeting from "@/models/Meeting";

// GET — list active meetings for the current teacher
export async function GET() {
  const {session, error} = await requireRoleApi("admin", "teacher");
  if(session == null){
    return error
  }
  await connectDB();

  const meetings = await Meeting.find({
    teacher: session.user.id,
    isActive: true,
  })
    .populate("teacher", "name email")
    .populate("subject", "title")
    .populate("course", "title")
    .sort({ createdAt: -1 });

  return NextResponse.json(meetings);
}

// POST — create meeting (teacher + admin only)
export async function POST(req: Request) {
  const {session, error} = await requireRoleApi("admin", "teacher");
  if(session == null){
    return error
  }
  await connectDB();

  const body = await req.json();
  const { title, description, meetingLink, course } = body;

  const meeting = await Meeting.create({
    title,
    description,
    course,
    meetingLink,
    teacher: session.user.id,
    isActive:true
  });

  return NextResponse.json(meeting, { status: 201 });
}