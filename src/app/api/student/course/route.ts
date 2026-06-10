import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireRole } from "@/lib/get-session";
import User from "@/models/User";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const student = await requireRole("student")
    console.log(student?.user?.name);

    if(!student || student.user.role != "student"){
      throw new Error("Access denied")
    }

    const user = await User.findById(student.user.id).populate("enrolledCourses");

    console.log(user);

    // if (!course) {
    //   return NextResponse.json(
    //     { message: "Course not found" },
    //     { status: 404 }
    //   );
    // }

    return NextResponse.json({message: "success", data: user.enrolledCourses}, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch course" },
      { status: 500 }
    );
  }
}