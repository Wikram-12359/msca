"use client"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

type ICourses = { title: string; description: string };
const EnrolledCourses = () => {
  const courses: ICourses[] = [
    {
      title: 'ECAT Course',
      description: 'this is a ecat course',
    },
  ];
  const router = useRouter()
  return (
    <div>
      <div className='flex p-5'>
        {courses.map((e: ICourses) => (
          <Card key={e.title} className='w-60 @container/card'>
            <CardHeader>
              <CardDescription>{e.title}</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                {e.title}
              </CardTitle>
              <CardAction>
                <Badge variant={"outline"}>active</Badge>
              </CardAction>
                <Button onClick={()=> router.push("/dashboard/course/sdfsdsdj")}>Open</Button>
            </CardHeader>
            
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;
