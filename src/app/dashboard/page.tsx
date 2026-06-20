"use client"
import EnrolledCourses from '@/components/student/EnrolledCourses';
import { useEnrolledCourses } from '@/hooks/use-student-data';
import { authClient } from '@/lib/auth-client';
import { useStudentStore } from '@/store/student-store';
import { useUIStore } from '@/store/ui-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
  const {setActivePage} = useUIStore()
  const { setEnrolledCourses } = useStudentStore()

  const router = useRouter()

  useEffect(()=>{
    setActivePage("Dashboard")
  },[])

    const { data: session } = authClient.useSession();
    const user = session?.user;
  
    const {data, isLoading} = useEnrolledCourses()

    console.log(data); //TODO

    useEffect(() => {
    if (data?.data) {
      setEnrolledCourses(data.data)
    }
  }, [data])

  useEffect(()=>{
    if(user?.role == "teacher"){
        return router.replace("/teacher")
      } else if (user?.role == "admin"){
        return router.replace("/admin/dashboard")
      }
  },[user])

  if (isLoading) return <p className="text-muted-foreground text-center p-4">Loading...</p>

  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col '>
        <div className='flex flex-col gap-4 py-4 '>
          <EnrolledCourses data={data?.data} />
        </div>
      </div>
    </div>
  );
}
