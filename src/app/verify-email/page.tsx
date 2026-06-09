// app/verify-email/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const token = params.get("token");
    if (!token) return setStatus("error");

    authClient.verifyEmail({ query: { token } }).then(({ error }) => {
      if (error) return setStatus("error");
      setStatus("success");
      setTimeout(() => router.push("/dashboard"), 2000);
    });
  }, []);

  if (status === "loading") return <p>Verifying...</p>;
  if (status === "success") return <p>Email verified! Redirecting...</p>;
  return <p>Invalid or expired link. <a href="/resend-verification">Resend</a></p>;
}