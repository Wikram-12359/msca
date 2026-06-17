// components/student/StudentResultsTable.tsx
"use client";
import { useStudentResults } from "@/hooks/use-student-results";
import { resultsColumns } from "./results-columns";
import { DataTable } from "@/components/DataTable";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StudentResultsTable() {
  const { data: results, isLoading, error } = useStudentResults();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-900">
            <AlertCircle className="h-4 w-4" />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-800">
            Failed to load your results. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!results || results.length === 0) {
    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <AlertCircle className="h-4 w-4" />
            No Results Yet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-blue-800">
            You haven&apos;t completed any tests yet. Once you complete a test, your results will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight">Your Test Results</h2>
        <p className="text-sm text-muted-foreground">
          Showing {results.length} completed test{results.length !== 1 ? "s" : ""}
        </p>
      </div>
      <DataTable columns={resultsColumns} data={results} getRowId={(row) => row._id} />
    </div>
  );
}
