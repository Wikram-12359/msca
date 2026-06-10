import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import EnrolledCourses from '@/components/student/EnrolledCourses';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { requireRole } from '@/lib/get-session';

export default async function Page() {
  await requireRole('student');
  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
          <div className='px-4 lg:px-6'>
            <Card className='max-w-80'>
              <CardHeader>
                <div className='w-15 h-15 bg-red-400 rounded-full'></div>
                <CardTitle>Vishal</CardTitle>
                <CardDescription>vishaldewani500@gmail.com</CardDescription>
                <CardAction>
                  <Button
                    className='rounded-full px-3 py-5'
                    variant={'destructive'}
                    size={'lg'}
                  >
                    Logout
                  </Button>
                </CardAction>
              </CardHeader>
            </Card>
          </div>
          <div className='px-4 lg:px-6'>
            <ChartAreaInteractive />
          </div>
          <EnrolledCourses />
        </div>
      </div>
    </div>
  );
}
