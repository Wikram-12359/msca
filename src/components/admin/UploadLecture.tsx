// app/admin/teachers/create/page.tsx
"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { SelectCourse } from "./SelectCourse";
import { SelectSubject } from "./SelectSubject";
import { uploadLectures } from "@/hooks/use-upload-lecture";

type subjectType = {
  _id: string,
  title: string
}

type Course = {
  _id: string;
  title: string;
  subject: [];
  teachers?: any[];
  subjects?: subjectType[];
  students?: any[];
}

export default function UploadLecture({courses} : {courses: Course[]}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState<subjectType[] | null>(null)


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    const name = form.get("name") as string
    const course = form.get("course") as string
    const subject = form.get("subject") as string
    const link = form.get("link") as string

    await uploadLectures(name,course,subject, link)

    toast.success("Lecture uploaded")
    setLoading(false);
    
    form.set("name", "")
    form.set("course", "")
    form.set("subject", "")
    form.set("link", "")
  }

  return (
    <Card className="p-4 max-w-120">
      <CardHeader>
        <CardTitle>Upload Lecture</CardTitle>
      </CardHeader>
      <form className="space-y-3" onSubmit={handleSubmit}>
      <Input name="name" placeholder="name" required />

      <SelectCourse setSubjects={setSubjects} courses={courses} />
      <SelectSubject subjects={subjects} />

      <Input name="link" placeholder="Link" required />
      {error && <p>{error}</p>}
      <Button size={"lg"} type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload Lecture"}
      </Button>
      
    </form>
    </Card>
  );
}