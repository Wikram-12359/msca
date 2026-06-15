// app/api/sign-cloudinary-params/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireRoleApi } from "@/lib/get-session";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  const {session, error} = await requireRoleApi();
  if(session == null){
    return error
  }

  const body = await req.json();
  const { paramsToSign } = body;

  console.log("paramsToSign:", paramsToSign);
  console.log("api_secret exists:", !!process.env.CLOUDINARY_API_SECRET);
  console.log("api_secret value:", process.env.CLOUDINARY_API_SECRET);

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!
  );

  console.log("generated signature:", signature);

  return NextResponse.json({ signature });
}