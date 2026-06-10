// app/admin/teachers/create/page.tsx
"use client";
import { useState } from "react";
import { createTeacher } from "@/app/admin/actions/create-teacher";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { createSubject } from "@/app/admin/dashboard/actions";
import { Card, CardHeader, CardTitle } from "../ui/card";

export default function CreateTeacherPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    const result = await createTeacher({
      name: form.get("name") as string,
      email: form.get("email") as string,
      password: form.get("password") as string,
      phone: form.get("phone") as string,
    });

    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "Something went wrong");
      return;
    }

    toast.success("Teacher added")

    console.log(result?.user?.user?.id);

    await createSubject(form.get("subject") as string, result?.user?.user?.id as string)
    toast.success("Subject assigned")

    form.set("name", "")
    form.set("email", "")
    form.set("password", "")
    form.set("phone", "")
    form.set("subject", "")

  }

  return (
    <Card className="p-4 max-w-120">
      <CardHeader>
        <CardTitle>Add Teacher</CardTitle>
      </CardHeader>
      <form className="space-y-3" onSubmit={handleSubmit}>
      <Input name="name" placeholder="Full name" required />
      <Input name="email" type="email" placeholder="Email" required />
      <Input autoComplete="off" name="password" type="password" placeholder="password" required />
      <Input name="phone" placeholder="Phone" required />
      <Input name="subject" placeholder="Subject" required />
      {error && <p>{error}</p>}
      <Button size={"lg"} type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Teacher"}
      </Button>
    </form>
    </Card>
  );
}