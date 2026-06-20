import { connectDB } from "@/lib/db";
import { requireRoleApi } from "@/lib/get-session";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Lecture from "@/models/Lecture";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const {session,error} = await requireRoleApi("admin")
    if(session == null){
      return error
    }

    const body = await req.json();
    const { name, subject, course, link} = body;

    if (!mongoose.Types.ObjectId.isValid(course) || !mongoose.Types.ObjectId.isValid(subject)) {
      throw new Error("Invalid ID");
    }

    const validSubject = new mongoose.Types.ObjectId(subject)
    const validCourse = new mongoose.Types.ObjectId(course)



    const lecture = await Lecture.create({
      name,
      course: validCourse,
      subject: validSubject,
      link: link
    });

    return NextResponse.json(
      {
        message: "Lecture uploaded successfully",
        lecture,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to upload lecture" },
      { status: 500 }
    );
  }
}