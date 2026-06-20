// app/dashboard/meetings/page.tsx
"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Link from "next/link";

type LecTypes = {
  _id: string;
  name: string;
  course: {
    title: string;
    _id: string;
  };
  subject: {
    _id: string;
    title: string;
  }
}

export default function RecordedLectures({courseId}: {courseId: string}) {
  const [loading, setLoading] = useState(false)
  const [lectures, setLectures] = useState<LecTypes[] | null>(null)

  useEffect(() => {
      let mounted = true
      async function load() {
        setLoading(true)
        try {
          const res = await api.get(`/student/lectures/${courseId}`)
          console.log(res);
          if (!mounted) return
          setLectures(res?.data ?? [])
        } catch (err: unknown) {
          if (!mounted) return
          console.error(err)
          setLectures(null)
        } finally {
          if (!mounted) return
          setLoading(false)
        }
      }
  
      load()
      return () => {
        mounted = false
      }
    }, [courseId])

  return (
    <div>
      <h1 className="text-3xl font-bold">Recorded Lectures</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Subject</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lectures?.length ? (
            lectures.map((e) => (
              <TableRow key={e?._id}>
                <TableCell>{e?.name}</TableCell>
                <TableCell>{e?.course?.title}</TableCell>
                <TableCell>{e?.subject?.title}</TableCell>
                <TableCell>
                  <Link
                    className="bg-primary px-4 py-2 text-white rounded-2xl"
                    href={`/dashboard/lecture/${e?._id}`}
                  >
                    Watch
                  </Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                No lectures found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}