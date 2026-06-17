// components/student/results-columns.tsx
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { StudentResult } from "@/hooks/use-student-results";

export const resultsColumns: ColumnDef<StudentResult>[] = [
  {
    accessorKey: "test.title",
    header: "Test Name",
  },
  {
    accessorKey: "test.course.title",
    header: "Course",
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => {
      const score = row.original.score;
      const totalScore = row.original.totalScore;
      const percentage = totalScore > 0 ? ((score / totalScore) * 100).toFixed(1) : "0";
      return (
        <div className="flex items-center gap-2">
          <span className="font-medium">
            {score}/{totalScore}
          </span>
          <Badge variant={parseFloat(percentage) >= 60 ? "default" : "destructive"}>
            {percentage}%
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Completed Date",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
];
