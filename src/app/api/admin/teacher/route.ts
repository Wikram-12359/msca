import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Course from "@/models/Course";
import Subject from "@/models/Subject";
import mongoose from "mongoose";
import { requireRoleApi } from "@/lib/get-session";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const teachers = await User.find({ role: "teacher" })
      .select("_id name email image role createdAt")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: teachers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch teachers",
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
    const teacherId = searchParams.get("id");

    if (!teacherId) {
      return NextResponse.json(
        { message: "Teacher ID is required" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return NextResponse.json(
        { message: "Invalid teacher ID" },
        { status: 400 }
      );
    }

    const objectId = new mongoose.Types.ObjectId(teacherId);

    // Step 1: Delete all subjects created by this teacher
    await Subject.deleteMany({ teacher: objectId });

    // Step 2: Remove teacher from all courses
    await Course.updateMany(
      { teachers: objectId },
      { $pull: { teachers: objectId } }
    );

    // Step 3: Delete the user from better-auth database
    // Better-auth stores users in 'user' collection
    const deletedUser = await User.findByIdAndDelete(objectId);

    if (!deletedUser) {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Teacher deleted successfully along with associated subjects and course references",
        teacher: deletedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting teacher:", error);

    return NextResponse.json(
      { message: "Failed to delete teacher" },
      { status: 500 }
    );
  }
}
