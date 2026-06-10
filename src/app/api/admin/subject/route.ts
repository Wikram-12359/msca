import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Course from "@/models/Course";
import mongoose from "mongoose";
import { requireRole } from "@/lib/get-session";
import Subject from "@/models/Subject";


export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const session = await requireRole("admin")

    const body = await req.json();
    const { title, teacher } = body;

    if(!title || !teacher){
      throw new Error("all fields required")
    }

    console.log(title, teacher);


    // validate ObjectIds
    const validTeacher = new mongoose.Types.ObjectId(teacher)
      


    const subject = await Subject.create({
      title,
      teacher: validTeacher
    });

    return NextResponse.json(
      {
        message: "Course created successfully",
        subject
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create course" },
      { status: 500 }
    );
  }
}