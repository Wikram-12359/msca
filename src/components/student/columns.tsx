// app/admin/students/columns.tsx
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export type Student = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  emailVerified: boolean;
  enrolledCourses: string[];
  createdAt: string;
};

export const studentColumns: ColumnDef<Student>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => row.original.phone ?? "—",
  },
  {
    accessorKey: "emailVerified",
    header: "Verified",
    cell: ({ row }) => (
      <Badge variant={row.original.emailVerified ? "default" : "destructive"}>
        {row.original.emailVerified ? "Yes" : "No"}
      </Badge>
    ),
  },
  {
    accessorKey: "enrolledCourses",
    header: "Enrolled",
    cell: ({ row }) => row.original.enrolledCourses?.length ?? 0,
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
];