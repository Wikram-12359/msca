"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useAdminCourses, useDeleteCourse } from "@/hooks/use-course-admin";
import { Loader2, Trash2 } from "lucide-react";

interface Course {
  _id: string;
  title: string;
  teachers?: any[];
  subjects?: any[];
  students?: any[];
}

const DisplayCourses = () => {
  const { data: courses = [], isLoading, error } = useAdminCourses();
  const { mutate: deleteCourse, isPending: isDeleting } = useDeleteCourse();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (courseId: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setDeletingId(courseId);
      deleteCourse(courseId, {
        onSettled: () => setDeletingId(null),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-md">
        Failed to load courses
      </div>
    );
  }

  if (courses?.length === 0) {
    return (
      <div className="p-4 text-gray-600 text-center">
        No courses found
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course Name</TableHead>
            <TableHead>Teachers</TableHead>
            <TableHead>Subjects</TableHead>
            <TableHead>Students Enrolled</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses?.map((course: Course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">{course.title}</TableCell>
              <TableCell>
                {course.teachers?.length || 0} teacher(s)
              </TableCell>
              <TableCell>
                {course.subjects?.length || 0} subject(s)
              </TableCell>
              <TableCell>
                {course.students?.length || 0} student(s)
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(course._id)}
                  disabled={isDeleting && deletingId === course._id}
                >
                  {isDeleting && deletingId === course._id ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </>
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DisplayCourses;
