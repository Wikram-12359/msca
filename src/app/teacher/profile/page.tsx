"use client";

import { authClient } from "@/lib/auth-client";
import { useUIStore } from "@/store/ui-store";
import { useEffect } from "react";

export default function Profile() {
  const { setActivePage } = useUIStore();

  useEffect(() => {
    setActivePage("Profile");
  }, [setActivePage]);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <section className="max-w-3xl p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings.
        </p>
      </div>

      {/* Account Info */}
      <div className="rounded-lg border p-6">
        <h2 className="font-semibold mb-4">Account Information</h2>

        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {user?.name}
          </p>

          <p>
            <strong>Email:</strong> {user?.email}
          </p>

          <p>
            <strong>Phone Number:</strong> {user?.phone}
          </p>
        </div>
      </div>
    </section>
  );
}