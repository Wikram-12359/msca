"use client"
import CreateCourse from '@/components/admin/CreateCourse';
import { authClient } from '@/lib/auth-client';
import { useUIStore } from '@/store/ui-store';
import { useEffect } from 'react';
import CreateTeacherPage from '@/components/admin/CreateTeacher';
import DisplayCourses from '@/components/admin/DisplayCourses';
import UploadLecture from '@/components/admin/UploadLecture';
import { useAdminCourses } from '@/hooks/use-course-admin';




export default function AdminDashboard() {
  const {setActivePage} = useUIStore()

  useEffect(()=>{
    setActivePage("Dashboard")
  },[])

    const { data: session } = authClient.useSession();
    const user = session?.user;


    const { data: courses, isLoading, error } = useAdminCourses();
  
  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
      <h1 className="text-2xl font-semibold px-7 mt-4">Courses</h1>
        <div className='px-4 lg:px-6 pb-6'>
          <DisplayCourses isLoading={isLoading} error={error} courses={courses ?? []} />
        </div>
        <div className='flex flex-wrap  py-4 md:gap-6 md:py-6'>
          <div className='px-4 lg:px-6'>
            <CreateCourse />
          </div>
          <div className='px-4 lg:px-6'>
            <CreateTeacherPage />
          </div>
        </div>

      </div>
      <div className='px-4 py-4'>
        <UploadLecture courses={courses ?? []} />
      </div>
    </div>
  );
}
