"use client"
import CreateMeeting from '@/components/teacher/CreateMeeting'
import ShowMeetings from '@/components/teacher/ShowMeetings'
import { useUIStore } from '@/store/ui-store'
import { useEffect } from 'react'

const Teacher =  () => {
  const {setActivePage} = useUIStore()

  useEffect(()=>{
    setActivePage("Teacher")
  },[setActivePage])
  return (
    <section className='p-6 space-y-6'>
      <CreateMeeting />
      <ShowMeetings />
    </section>
  )
}

export default Teacher