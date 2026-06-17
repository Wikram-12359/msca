// app/api/user/avatar/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireRoleApi } from "@/lib/get-session";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

export async function PATCH(req: NextRequest) {
  const { session, error } = await requireRoleApi();
  if (error) return error;

  await connectDB();

  const { imageUrl } = await req.json();
  if (!imageUrl) {
    return NextResponse.json({ message: "No image URL provided" }, { status: 400 });
  }

  const db = mongoose.connection.db!;

  const result = await db.collection("user").updateOne(
    { _id: new ObjectId(session.user.id) }, // ← convert string to ObjectId
    { $set: { image: imageUrl, updatedAt: new Date() } }
  );

  if (result.matchedCount === 0) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, imageUrl });
}