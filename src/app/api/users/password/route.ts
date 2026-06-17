// app/api/users/password/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireRoleApi } from "@/lib/get-session";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function PATCH(req: NextRequest) {
  const { session, error } = await requireRoleApi();
  if (error) return error;

  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ message: "Both fields required" }, { status: 400 });
  }

  try {
    await auth.api.changePassword({
      headers: await headers(),
      body: { currentPassword, newPassword, revokeOtherSessions: true },
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message ?? "Failed to update password" },
      { status: 400 }
    );
  }
}
