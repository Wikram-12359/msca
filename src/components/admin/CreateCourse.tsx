"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { MultiSelect } from "./MultiSelect";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { getSubjects } from "@/app/admin/dashboard/actions";

type CreateCourseInput = {
  title: string;
  teachers: string[];
  subjects: string[];
};

async function createCourse(data: CreateCourseInput) {
  const res = await api.post("/admin/course", data);
  return res.data;
}

const CreateCourse = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [teachers, setTeachers] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);


  const { data, isLoading } = useQuery({
    queryKey: ["subjects"],
    queryFn: getSubjects,
  });

  console.log(data);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createCourse,

    onSuccess: () => {
      toast.success("Course created successfully");
      setSubjects([]);
      setTeachers([]);
      setTitle("");
      queryClient.invalidateQueries({ queryKey: ["admin", "courses"] });
      // router.push("/dashboard/courses");
    },

    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "Failed to create course"
      );
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate({
      title,
      teachers: teachers,
      subjects: subjects
    });
  };

  return (
    <Card className="max-w-120 p-6">
      <CardHeader>
        <CardTitle>Create Course</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <Input
          placeholder="Course title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          autoFocus
        />


        <MultiSelect setSubjects={setSubjects} subjects={subjects} options={data?.data}  setValue={setTeachers} value={teachers} />

        {/* Submit */}
        <br />
        <Button
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create Course"}
        </Button>
      </form>
    </Card>
  );
};

export default CreateCourse;