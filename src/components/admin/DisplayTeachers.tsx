
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
import { useAdminTeachers, useDeleteTeacher } from "@/hooks/use-teacher-admin";
import { Loader2, Trash2, Mail } from "lucide-react";

interface Teacher {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  createdAt?: Date;
}

const DisplayTeachers = () => {
  const { data: teachers = [], isLoading, error } = useAdminTeachers();
  const { mutate: deleteTeacher, isPending: isDeleting } = useDeleteTeacher();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (teacherId: string, teacherName: string) => {
    if (
      confirm(
        `Are you sure you want to delete ${teacherName}? This will:\n- Remove all subjects created by this teacher\n- Remove the teacher from all courses\n- Delete the user account`
      )
    ) {
      setDeletingId(teacherId);
      deleteTeacher(teacherId, {
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
        Failed to load teachers
      </div>
    );
  }

  if (teachers.length === 0) {
    return (
      <div className="p-4 text-gray-600 text-center">
        No teachers found
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Teacher Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Joined Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.map((teacher: Teacher) => (
            <TableRow key={teacher._id}>
              <TableCell className="font-medium">{teacher.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  {teacher.email}
                </div>
              </TableCell>
              <TableCell>
                <span className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                  {teacher.role}
                </span>
              </TableCell>
              <TableCell>
                {teacher.createdAt
                  ? new Date(teacher.createdAt).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(teacher._id, teacher.name)}
                  disabled={isDeleting && deletingId === teacher._id}
                >
                  {isDeleting && deletingId === teacher._id ? (
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

export default DisplayTeachers;