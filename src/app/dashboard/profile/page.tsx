"use client";

import { authClient } from "@/lib/auth-client";
import { useUIStore } from "@/store/ui-store";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AvatarUpload } from "@/components/AvatarUpload";
import { useChangePassword } from "@/hooks/use-password";

export default function Profile() {
  const { setActivePage } = useUIStore();

  useEffect(() => {
    setActivePage("Profile");
  }, [setActivePage]);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [avatar, setAvatar] = useState<File | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");


  const changePassword = useChangePassword();

const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  changePassword.mutate(
    { currentPassword, newPassword },
    {
      onSuccess: () => {
        setCurrentPassword("");
        setNewPassword("");
      },
    }
  );
};

  const handleAvatarChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) setAvatar(file);
  };


  return (
    <section className="max-w-3xl p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings.
        </p>
      </div>

      {/* Avatar */}
      <div className="rounded-lg border p-6 flex flex-col">
        <h2 className="font-semibold mb-4">Profile Picture</h2>

          <AvatarUpload />
        <Button disabled={!avatar} className="ml-auto cursor-pointer" size={"lg"}>Update Profile</Button>
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

      {/* Password */}
      <form
        onSubmit={handlePasswordUpdate}
        className="rounded-lg border p-6 space-y-4"
      >
        <h2 className="font-semibold">Change Password</h2>

        <Input
          type="password"
          autoComplete="off"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full border rounded-md p-2"
        />

        <Input
          type="password"
          autoComplete="off"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border rounded-md p-2"
        />

        <Button
          variant="outline"
          size="lg"
          type="submit"
          disabled={!currentPassword || !newPassword || changePassword.isPending}
        >
          {changePassword.isPending ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </section>
  );
}