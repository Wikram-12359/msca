// components/ForgotPasswordModal.tsx
"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ForgotPasswordModal({ open, onOpenChange }: Props) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password", // where user lands after clicking email link
    });

    setLoading(false);

    if (error) {
      // Don't reveal if email exists or not — security best practice
      // Show success either way
    }

    setSent(true);
  }

  function handleClose() {
    onOpenChange(false);
    setTimeout(() => {
      setEmail("");
      setSent(false);
    }, 300);
  }

  return (
    <Dialog  open={open} onOpenChange={handleClose}>
    <DialogContent showCloseButton={false} className="max-w-md ">
  <DialogHeader className="items-center text-center">
    <DialogTitle>Forgot password</DialogTitle>
    <DialogDescription>
      Enter your email and we'll send you a reset link.
    </DialogDescription>
  </DialogHeader>
    
  {sent ? (
    <div className="space-y-4 py-2 text-center">
      <p className="text-sm text-muted-foreground">
        If an account exists for <strong>{email}</strong>, you'll receive
        a password reset link shortly. Check your inbox.
      </p>
      <Button className="w-full" onClick={handleClose}>
        Done
      </Button>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="reset-email">Email</Label>
        <Input
          id="reset-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Send reset link"}
      </Button>
    </form>
  )}

  <DialogClose className="mt-2" asChild>
      <Button variant={"destructive"} className="w-full">Close</Button>
    </DialogClose>
</DialogContent>


    </Dialog>
  );
}