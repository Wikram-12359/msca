import { TrendingUpIcon } from 'lucide-react';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

type ICourses = { title: string; description: string };
const EnrolledCourses = () => {
  const courses: ICourses[] = [
    {
      title: 'ECAT Course',
      description: 'this is a ecat course',
    },
  ];
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
                <Button>Open</Button>
              </CardAction>
            </CardHeader>
            
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;
