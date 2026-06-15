import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Course from "@/models/Course";
import mongoose from "mongoose";
import { requireRoleApi } from "@/lib/get-session";


export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const {session,error} = await requireRoleApi("admin")
    if(session == null){
      return error
    }

    const body = await req.json();
    const { title, teachers, subjects } = body;


    // validate ObjectIds
    const validTeachers =
      teachers?.map((id: string) =>
        new mongoose.Types.ObjectId(id)
      ) || [];

    const validSubjects =
      subjects?.map((id: string) =>
        new mongoose.Types.ObjectId(id)
      ) || [];

    const course = await Course.create({
      title,
      teachers: validTeachers,
      subjects: validSubjects,
      students: [],
      active: true,
    });

    return NextResponse.json(
      {
        message: "Course created successfully",
        course,
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


export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const courses = await Course.find()
      .populate("teachers", "name email avatar")
      .populate("subjects", "title")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: courses,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch courses",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { session, error } = await requireRoleApi("admin");
    if (session == null) {
      return error;
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("id");

    if (!courseId) {
      return NextResponse.json(
        { message: "Course ID is required" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return NextResponse.json(
        { message: "Invalid course ID" },
        { status: 400 }
      );
    }

    const deletedCourse = await Course.findByIdAndDelete(courseId);

    if (!deletedCourse) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Course deleted successfully",
        course: deletedCourse,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to delete course" },
      { status: 500 }
    );
  }
}