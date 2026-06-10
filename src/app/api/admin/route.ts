import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireRole } from "@/lib/get-session";
import Subject from "@/models/Subject";
import "@/models/User";


export async function GET(req: NextRequest) {
  try {
    requireRole("admin")
    await connectDB();

    const subjects = await Subject.find().populate("teacher")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: subjects,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch subjects",
      },
      { status: 500 }
    );
  }
}