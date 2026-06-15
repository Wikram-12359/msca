// app/api/user/avatar/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireRoleApi } from "@/lib/get-session";
import { connectDB } from "@/lib/db";
import mongoose from "mongoose";

export async function PATCH(req: NextRequest) {
  const {session,error} = await requireRoleApi();
  if(session == null){
    return error
  }
  
  await connectDB();

  const { imageUrl } = await req.json();

  if (!imageUrl) {
    return NextResponse.json({ message: "No image URL provided" }, { status: 400 });
  }

  console.log("uploaded", imageUrl);

  await mongoose.connection.db!.collection("user").updateOne(
    { _id: session.user.id },
    { $set: { image: imageUrl, updatedAt: new Date() } }
  );

  return NextResponse.json({ success: true, imageUrl });
}