// components/AvatarUpload.tsx
"use client";
import { CldUploadWidget } from "next-cloudinary";
import { authClient } from "@/lib/auth-client";
import { useUpdateAvatar } from "@/hooks/use-avatar";
import { toast } from "sonner";
import Image from "next/image";

export function AvatarUpload() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const updateAvatar = useUpdateAvatar();

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Don't render until session is loaded
  if (!user) return null;

  return (
    <div className="flex items-center gap-4">
      <CldUploadWidget
        signatureEndpoint="/api/sign-cloudinary-params"
        options={{
          uploadPreset: "msca_avatars",
          publicId: `user-${user.id}`,  
          apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
          maxFileSize: 2000000,
          clientAllowedFormats: ["jpg", "png", "webp"],
          singleUploadAutoClose: true,
          multiple: false,
        }}
        onSuccess={(result) => {
          if (typeof result.info === "object" && "secure_url" in result.info) {
            updateAvatar.mutate(result.info.secure_url as string, {
              onSuccess: () => toast.success("Avatar updated!"),
              onError: () => toast.error("Failed to save avatar."),
            });
          }
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => {
              if (!open) return;
              open()
            }}
            className="relative group"
            style={{width: 70}}
            aria-label="Change avatar"
            disabled={updateAvatar.isPending || !open}
          >
            <div className="w-16 h-16 rounded-full overflow-hidden border bg-muted flex items-center justify-center text-lg font-medium">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name ?? "Avatar"}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>
            <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="text-white text-xs">Edit</span>
            </div>
          </button>
        )}
      </CldUploadWidget>

      <div>
        <p className="text-sm font-medium">{user.name}</p>
        <p className="text-xs text-muted-foreground">{user.email}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {updateAvatar.isPending ? "Saving..." : "Click photo to change"}
        </p>
      </div>
    </div>
  );
}