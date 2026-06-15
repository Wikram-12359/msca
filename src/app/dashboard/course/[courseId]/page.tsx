"use client"

import ActiveTests from "@/components/student/ActiveTests"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useStudentMeetings } from "@/hooks/use-student-data"
import { useStudentStore } from "@/store/student-store"
import { useUIStore } from "@/store/ui-store"
import { useRouter } from "next/navigation"
import { useEffect, use } from "react"



type Meeting = {
  _id: string
  title: string
  meetingLink: string
  isActive: boolean
}



const Course = ({ params }: { params: Promise<{ courseId: string }> }) => {
  const { courseId } = use(params)
  const { setActivePage } = useUIStore()
  const router = useRouter()

  useEffect(() => {
    setActivePage("Course")
  }, [setActivePage])
 
  const course = useStudentStore((s) => s.getCourse(courseId))
  

  const { data: meetings, isLoading } = useStudentMeetings(courseId)
  return (
    <section className="p-6">
      <div className="rounded-lg border p-6">
        <h2 className="font-semibold mb-4">Course Information</h2>
        <div className="space-y-2">
          <p><strong>Course Name:</strong> {course?.title}</p>
          <p><strong>Description:</strong> {course?.description}</p>
        </div>
      </div>

      <div className="py-6">
        <h2 className="my-3 text-3xl font-bold">Classes</h2>
        {isLoading ? (
          <p>Loading classes...</p>
        ) : meetings?.length === 0 ? (
          <p className="text-muted-foreground">No active classes right now.</p>
        ) : (
          <div className="flex gap-4 flex-wrap">
            {meetings?.map((meeting: Meeting) => (
              <Card key={meeting._id} className="min-w-40">
                <CardHeader>
                  <CardTitle>{meeting.title}</CardTitle>
                  <Badge variant={"outline"}>{meeting?.isActive ? "Active" : "Ended"}</Badge>
                  </CardHeader>
                <CardFooter>
                  <Button
                    onClick={() => router.push(meeting?.meetingLink ?? "")}
                    size="lg"
                  >
                    Join Class
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="py-6">
        <h2 className="my-3 text-3xl font-bold">Active Tests</h2>
        <ActiveTests courseId={courseId} />
      </div>
    </section>
  )
}

export default Course