// app/admin/students/page.tsx
"use client";
import { useState } from "react";
import { RowSelectionState } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import { studentColumns } from "@/components/student/columns";
import { useStudents } from "@/hooks/use-students";
import { useAdminCourses, useEnrollStudents } from "@/hooks/use-course-admin";
import { Pagination } from "@/components/student/Pagination";
import { toast } from "sonner";

const EnrollStudents = () => {
  const [page, setPage] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const { data, isLoading, isFetching } = useStudents(page);
  const { data: courses } = useAdminCourses();
  const enroll = useEnrollStudents();
  console.log(courses);

  // Get selected student IDs from row selection state
  // rowSelection keys are the row IDs (student._id via getRowId)
  const selectedStudentIds = Object.keys(rowSelection).filter(
    (k) => rowSelection[k]
  );

  async function handleEnroll() {
    if (!selectedCourse) return toast.error("Please select a course.");
    if (!selectedStudentIds.length) return toast.error("Please select at least one student.");

    enroll.mutate(
      { courseId: selectedCourse, studentIds: selectedStudentIds },
      {
        onSuccess: () => {
          setRowSelection({});   // clear selection after enroll
          setSelectedCourse(""); // reset dropdown
          toast.success(`Enrolled ${selectedStudentIds.length} student(s) successfully.`);
        },
        onError: () => toast.error("Enrollment failed. Try again."),
      }
    );
  }

  if (isLoading) return <p className="p-6">Loading students...</p>;

  return (
    <section className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Enroll Students</h1>
        <p className="text-sm text-muted-foreground">
          {data?.total} total · {selectedStudentIds.length} selected
          {isFetching && " · Updating..."}
        </p>
      </div>

      {/* Course dropdown + enroll button */}
      <div className="flex items-center gap-3">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="border rounded px-3 py-2 text-sm bg-background"
        >
          <option value="">Select a course...</option>
          {courses?.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>

        <button
          onClick={handleEnroll}
          disabled={
            !selectedCourse ||
            !selectedStudentIds.length ||
            enroll.isPending
          }
          className="px-4 py-2 bg-primary text-primary-foreground rounded text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {enroll.isPending
            ? "Enrolling..."
            : `Enroll ${selectedStudentIds.length || ""} Student${selectedStudentIds.length !== 1 ? "s" : ""}`}
        </button>
      </div>

      <DataTable
        columns={studentColumns}
        data={data?.students ?? []}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        getRowId={(row) => row._id} // use MongoDB _id as row ID
      />

      {data && data.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={data.totalPages}
          onPageChange={(p) => {
            setPage(p);
            setRowSelection({}); // clear selection on page change
          }}
        />
      )}
    </section>
  );
};

export default EnrollStudents;
