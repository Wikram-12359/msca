"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
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
import { Pagination } from "@/components/student/Pagination";
import { useTests, usePublishTest } from "@/hooks/use-tests";

type AdminTest = {
  _id: string;
  title: string;
  course: { title?: string } | string | null;
  questions?: { text: string }[];
  duration: number;
  isPublished: boolean;
  createdAt: string;
};

const PAGE_SIZE = 10;

const AdminTestListPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error, isFetching } = useTests();
  const publishMutation = usePublishTest();

  const tests = useMemo<AdminTest[]>(() => data?.data ?? [], [data]);
  const totalPages = Math.max(1, Math.ceil(tests.length / PAGE_SIZE));

  const currentTests = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return tests.slice(start, start + PAGE_SIZE);
  }, [page, tests]);

  const handleTogglePublish = (id: string, published: boolean) => {
    publishMutation.mutate({ id, isPublished: !published });
  };

  if (isLoading) {
    return <p className="p-6 text-sm">Loading tests...</p>;
  }

  if (isError) {
    return (
      <section className="p-6">
        <h1 className="text-2xl font-semibold mb-3">Tests</h1>
        <p className="text-sm text-destructive">Unable to load tests.</p>
        <p className="mt-2 text-sm text-muted-foreground">{(error as Error)?.message}</p>
      </section>
    );
  }

  return (
    <section className="p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Tests</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {tests.length} test{tests.length === 1 ? "" : "s"} created by you.
            {isFetching ? " Updating..." : ""}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Link href="/admin/dashboard/tests/create">
            <Button>New test</Button>
          </Link>
          <Button variant="outline" onClick={() => setPage(1)}>
            Refresh
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Questions</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTests.length ? (
              currentTests.map((test) => {
                const courseTitle =
                  typeof test.course === "string"
                    ? "Unknown course"
                    : test.course?.title ?? "Unknown course";

                return (
                  <TableRow
                    key={test._id}
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => router.push(`/admin/dashboard/tests/${test._id}`)}
                  >
                    <TableCell className="font-medium text-primary">
                      <span className="underline decoration-dotted underline-offset-4">
                        {test.title}
                      </span>
                    </TableCell>
                    <TableCell>{courseTitle}</TableCell>
                    <TableCell>{test.questions?.length ?? 0}</TableCell>
                    <TableCell>{test.duration} min</TableCell>
                    <TableCell>
                      <Badge variant={test.isPublished ? "secondary" : "outline"}>
                        {test.isPublished ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={test.isPublished ? "destructive" : "secondary"}
                        size="sm"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleTogglePublish(test._id, test.isPublished);
                        }}
                        disabled={publishMutation.isPending}
                      >
                        {test.isPublished ? "Deactivate" : "Activate"}
                      </Button>
                    </TableCell>
                    <TableCell>
                      {new Date(test.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-sm text-muted-foreground">
                  No tests found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableCaption>Click any row to view the test details.</TableCaption>
        </Table>
      </div>

      {tests.length > PAGE_SIZE && (
        <Pagination page={page} totalPages={totalPages} onPageChange={(newPage) => setPage(newPage)} />
      )}
    </section>
  );
};

export default AdminTestListPage;
