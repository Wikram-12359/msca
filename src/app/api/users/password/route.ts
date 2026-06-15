// app/api/users/password/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireRoleApi } from "@/lib/get-session";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function PATCH(req: NextRequest) {
  const {session, error: errorAuth} = await requireRoleApi();
    if(session == null){
      return errorAuth
    }

  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ message: "Both fields required" }, { status: 400 });
  }

  const { error } = await auth.api.changePassword({
    headers: await headers(),
    body: { currentPassword, newPassword, revokeOtherSessions: true },
  });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}