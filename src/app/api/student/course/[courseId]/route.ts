import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const course = await Course.findById(id);

    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch course" },
      { status: 500 }
    );
  }
}