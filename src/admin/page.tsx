// app/admin/page.tsx  (admin only)
import { getRequiredRole } from "@/lib/get-session";

export default async function AdminPage() {
  const session = await getRequiredRole("admin");

  return (<h1>Admin Panel — {session.user.email}</h1>);
}