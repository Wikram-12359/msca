// app/api/meetings/[id]/route.ts
import { NextResponse } from "next/server";
import { requireRoleApi } from "@/lib/get-session";
import { connectDB } from "@/lib/db";
import Meeting from "@/models/Meeting";

// GET single meeting by ID
export async function GET(_req: Request, { params }: { params:  Promise<{ id: string }> }) {
  const {session, error} = await requireRoleApi("admin", "teacher", "student");
  if(session == null){
    return error
  }
  await connectDB();
  const { id } = await params;
  console.log("route hit");
  
  console.log("Meeting ID:", id);

  const meeting = await Meeting.findById(id)
    .populate("teacher", "name email");

  if (!meeting) {
    return NextResponse.json({ error: "Meeting not found" }, { status: 404 });
  }

  return NextResponse.json(meeting);
}

// PATCH — toggle isActive (teacher who owns it, or admin)
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const {session, error} = await requireRoleApi("admin", "teacher");
  if(session == null){
    return error
  }
  await connectDB();

  const {id} = await params

  const meeting = await Meeting.findById(id);
  if (!meeting) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Teachers can only update their own meetings
  if (
    session.user.role === "teacher" &&
    meeting.teacher.toString() !== session.user.id
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { isActive } = await req.json();
  meeting.isActive = isActive;
  await meeting.save();

  return NextResponse.json(meeting);
}

// DELETE
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const {session,error} = await requireRoleApi("teacher", "admin");
  if(session == null){
    return error
  }
  
  await connectDB();
  const {id} = await params

  const meeting = await Meeting.findById(id);
  if (!meeting) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (
    session.user.role === "teacher" &&
    meeting.teacher.toString() !== session.user.id
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await meeting.deleteOne();
  return NextResponse.json({ success: true });
}