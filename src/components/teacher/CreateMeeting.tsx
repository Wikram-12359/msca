// app/teacher/meetings/create/page.tsx
"use client";
import { useCreateMeeting } from "@/hooks/use-meetings";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { useTeacherStats } from "@/hooks/use-teacher-stats";
import { toast } from "sonner";

export default function CreateMeeting() {
  const createMeeting = useCreateMeeting();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    console.log(form.get("course"));

    createMeeting.mutate(
      {
        title: form.get("title") as string,
        meetingLink: form.get("meetingLink") as string,
        course: form.get("course") as string
      },
      {
        onSuccess: () => toast.success("Meeting created successfully"),
        onError: () => toast.error("Failed to create meeting"),
      }
    );
  }

  const {data: courses} = useTeacherStats()


  return (
    <Card className="max-w-120">
      <CardHeader>
        <CardTitle>Create Class</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Input name="title" placeholder="Meeting title" required />
          <Input placeholder="meeting link" className="mt-3" name="meetingLink" type="url" required />
          <Select name="course">
            <SelectTrigger className="w-full max-w-48 mt-4">
              <SelectValue placeholder="Select a course" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Courses</SelectLabel>
                {courses?.courses?.map((e)=>(
                  <SelectItem key={e?._id} value={e?._id}>{e?.title} </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button size={"lg"} className="mt-4 cursor-pointer" type="submit" disabled={createMeeting.isPending}>
            {createMeeting.isPending ? "Creating..." : "Start class"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}