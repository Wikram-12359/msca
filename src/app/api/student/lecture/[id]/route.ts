import { connectDB } from "@/lib/db";
import { requireRoleApi } from "@/lib/get-session";
import "@/models/Course";
import "@/models/Subject";
import { NextRequest, NextResponse } from "next/server";
import "@/models/Subject";
import Lecture from "@/models/Lecture";

export async function GET(_req: NextRequest,
  { params }: { params: Promise<{ id: string }> }) {
  
  await connectDB();
  
  const {session, error} = await requireRoleApi("student");
  if(session == null){
    return error
  }
  const { id } = await params;

  const lecture = await Lecture.findById(id)

  return NextResponse.json(lecture);
}