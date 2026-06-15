"use client";

import { use, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/student/Pagination";
import api from "@/lib/axios";

const PAGE_SIZE = 10;

type StudentResult = {
  _id: string;
  score: number;
  totalScore: number;
  createdAt: string;
  student: {
    _id: string;
    name: string;
    email: string;
  };
};

type AdminTestDetail = {
  _id: string;
  title: string;
  duration: number;
  marksPerQuestion: number;
  negativeMarking: number;
  isPublished: boolean;
  createdAt: string;
  course: {
    _id?: string;
    title?: string;
  } | null;
  questionsCount: number;
  totalMarks: number;
};

type TestResultResponse = {
  test: AdminTestDetail;
  results: StudentResult[];
};

const EachTest = () => {
   const params = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<TestResultResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get<TestResultResponse>(`/tests/${params.id}/results`);
        setData(response.data);
      } catch (err: unknown) {
        const message =
          typeof err === "object" && err !== null && "message" in err
            ? (err as { message?: string }).message
            : undefined;
        setError(message ?? "Failed to load test details.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [params.id]);

  const results = useMemo(() => data?.results ?? [], [data]);
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(results.length / PAGE_SIZE)),
    [results.length]
  );

  const currentPageResults = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return results.slice(start, start + PAGE_SIZE);
  }, [page, results]);

  const averageScore = useMemo(() => {
    if (!results.length) return 0;
    return (
      results.reduce((sum, item) => sum + item.score, 0) / results.length
    );
  }, [results]);

  function formatDate(value: string) {
    return new Date(value).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatPercentage(score: number, total: number) {
    if (!total) return "0%";
    return `${Math.round((score / total) * 100)}%`;
  }

  if (loading) {
    return <p className="p-6 text-sm">Loading test details...</p>;
  }

  if (error) {
    return (
      <div className="p-6 space-y-4">
        <p className="text-sm text-destructive">{error}</p>
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>
    );
  }

  if (!data) {
    return <p className="p-6 text-sm">No test details available.</p>;
  }

  const test = data.test;
  const statusLabel = test.isPublished ? "Active" : "Inactive";

  return (
    <section className="p-6 space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">{test.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {test.course?.title ?? "No course"} · {test.questionsCount} questions · {test.totalMarks} total marks
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Badge variant={test.isPublished ? "secondary" : "outline"}>{statusLabel}</Badge>
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border bg-background p-4">
          <p className="text-sm text-muted-foreground">Duration</p>
          <p className="mt-1 text-lg font-medium">{test.duration} min</p>
        </div>
        <div className="rounded-lg border bg-background p-4">
          <p className="text-sm text-muted-foreground">Average score</p>
          <p className="mt-1 text-lg font-medium">{averageScore.toFixed(1)} / {test.totalMarks}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Total marks</TableHead>
              <TableHead>Percentage</TableHead>
              <TableHead>Submitted</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPageResults.length ? (
              currentPageResults.map((resultItem) => (
                <TableRow key={resultItem._id} className="hover:bg-muted">
                  <TableCell>{resultItem.student.name}</TableCell>
                  <TableCell>{resultItem.student.email}</TableCell>
                  <TableCell>{resultItem.score}</TableCell>
                  <TableCell>{resultItem.totalScore}</TableCell>
                  <TableCell>{formatPercentage(resultItem.score, resultItem.totalScore)}</TableCell>
                  <TableCell>{formatDate(resultItem.createdAt)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-sm text-muted-foreground">
                  No students have participated in this test yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableCaption>Student participation and obtained marks per test.</TableCaption>
        </Table>
      </div>

      {results.length > PAGE_SIZE && (
        <Pagination page={page} totalPages={totalPages} onPageChange={(newPage) => setPage(newPage)} />
      )}
    </section>
  );
};

export default EachTest;
