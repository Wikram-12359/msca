import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import api from "@/lib/axios"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"


type TestSummary = {
  _id: string
  title: string
  questions?: { text: string }[]
  duration: number
}


export default function ActiveTests({ courseId }: { courseId: string }) {
  const [tests, setTests] = useState<TestSummary[] | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      try {
        const res = await api.get(`/student/tests?courseId=${courseId}`)
        console.log(res);
        if (!mounted) return
        setTests(res.data?.data ?? [])
      } catch (err: unknown) {
        if (!mounted) return
        console.error(err)
        setTests(null)
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

  if (loading) return <p>Loading tests...</p>
  if (tests === null) return <p className="text-sm text-muted-foreground">Unable to load tests.</p>
  if (tests.length === 0) return <p className="text-muted-foreground">No active tests for this course.</p>

  return (
    <div className="flex gap-4 flex-wrap">
      {tests.map((test: TestSummary) => (
        <Card key={test._id} className="min-w-40">
          <CardHeader>
            <CardTitle>{test.title}</CardTitle>
            <CardDescription>
              {test.questions?.length ?? 0} questions · {test.duration} min
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push(`/dashboard/tests/${test._id}`)} size="lg">
              Take Test
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}