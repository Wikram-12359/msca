"use client"
import CreateCourse from '@/components/admin/CreateCourse';
import { authClient } from '@/lib/auth-client';
import { useUIStore } from '@/store/ui-store';
import { useEffect } from 'react';
import CreateTeacherPage from '@/components/admin/CreateTeacher';

export default function AdminDashboard() {
  const {setActivePage} = useUIStore()

  useEffect(()=>{
    setActivePage("Dashboard")
  },[])

    const { data: session } = authClient.useSession();
    const user = session?.user;
  
  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-wrap  py-4 md:gap-6 md:py-6'>
          <div className='px-4 lg:px-6'>
          <CreateCourse />
          </div>
          <div className='px-4 lg:px-6'>
          <CreateTeacherPage />
          </div>
        </div>
      </div>
    </div>
  );
}
