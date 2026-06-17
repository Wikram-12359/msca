"use client"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

type ICourses = { _id: string, active: boolean, title: string; description: string };
const EnrolledCourses = ({data}: {data: ICourses[]}) => {
  // const courses: ICourses[] = [
  //   {
  //     title: 'ECAT Course',
  //     description: 'this is a ecat course',
  //   },
  // ];
  const router = useRouter()
  return (
    <div>
      <div className='flex px-4 space-x-3 flex-wrap'>
        {data.length == 0 ? (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <AlertCircle className="h-4 w-4" />
                No Courses enrolled Yet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-blue-800">
                You haven&apos;t enrolled in any courses yet. Once you enroll in a course, your course will appear here.
              </p>
              <Link href="https://wa.me/923453536289" className="mt-4 bg-primary px-4 py-3 block text-white rounded-2xl">Enroll Now</Link>
            </CardContent>
          </Card>
        ):(
          data?.map((e: ICourses) => (
          <Card key={e.title} className='w-60 @container/card'>
            <CardHeader>
              <CardDescription>{e.title}</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {e.title}
              </CardTitle>
              <CardAction>
                <Badge variant={"outline"}>{e?.active ? "active" : "ended"}</Badge>
              </CardAction>
                <Button disabled={!e?.active} onClick={()=> router.push(`/dashboard/course/${e?._id}`)}>Open</Button>
            </CardHeader>
            
          </Card>
        ))
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;
