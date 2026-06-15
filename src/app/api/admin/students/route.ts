// app/api/admin/students/route.ts
import { connectDB } from "@/lib/db";
import { requireRoleApi } from "@/lib/get-session";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req: NextRequest) {
  const {session, error} = await requireRoleApi("admin");
    if(session == null){
      return error
    }
  await connectDB();

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const limit = parseInt(searchParams.get("limit") ?? "20");
  const skip = (page - 1) * limit;

  const db = mongoose.connection.db!;

  const [students, total] = await Promise.all([
    db
      .collection("user")
      .find({ role: "student" })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .toArray(),
    db.collection("user").countDocuments({ role: "student" }),
  ]);

  return NextResponse.json({
    students,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1,
  });
}

export async function POST(req: NextRequest) {
  const {session,error} = await requireRoleApi("admin");
  if(session == null){
    return error
  }
  await connectDB();

  const { courseId, studentIds } = await req.json();

  if (!courseId || !studentIds?.length) {
    return NextResponse.json(
      { message: "courseId and studentIds are required" },
      { status: 400 }
    );
  }

  const db = mongoose.connection.db!;

  // Convert string IDs to ObjectId
  const objectIds = studentIds.map(
    (id: string) => new mongoose.Types.ObjectId(id)
  );

  const result = await db.collection("user").updateMany(
    { _id: { $in: objectIds } },
    { $addToSet: { enrolledCourses: courseId } }
  );

  console.log("Matched:", result.matchedCount, "Modified:", result.modifiedCount);

  return NextResponse.json({
    success: true,
    matched: result.matchedCount,
    modified: result.modifiedCount,
  });
}