"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useUIStore } from "@/store/ui-store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Course = () => {

  const {setActivePage} = useUIStore()
  useEffect(()=>{
    setActivePage("Course")
  },[])

  const classes = [
    {
      name: "Biology",
      time: "9:00 am",
      url: "/",
      active: false
    },
    {
      name: "Chemistry",
      time: "11:00 am",
      url: "/",
      active: false
    },
    {
      name: "Physics",
      time: "1:00 pm",
      url: "/",
      active: true
    }
  ]
  const router = useRouter()

  return (
    <section className="p-6">
      <div className="rounded-lg border p-6">
        <h2 className="font-semibold mb-4">Course Information</h2>

        <div className="space-y-2">
          <p>
            <strong>Course Name:</strong> MDCAT
          </p>

          <p>
            <strong>Subjects:</strong> Physics, Bio, Chem
          </p>

        </div>
      </div>

        <div className="py-6">
        <h2 className="my-3 text-3xl font-bold">Classes</h2>
        <div className="flex gap-4 flex-wrap">
          {classes.map((e,i)=>(
          <Card key={i} className="min-w-40">
            <CardHeader>
              <CardTitle>{e.name}</CardTitle>
              <CardDescription>{e.time}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={()=> router.push(e.url)} disabled={!e.active} size={"lg"}>Start Classes</Button>
            </CardFooter>
          </Card>
          ))}
        </div>
      </div>

      <div className="py-6">
        <h2 className="my-3 text-3xl font-bold">Tests</h2>
        <Card>
          <CardHeader>
            <CardTitle>Biology Test</CardTitle>
            <CardDescription>9:00 am</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button disabled={true} size={"lg"}>Start Test</Button>
          </CardFooter>
        </Card>
      </div>


    </section>
  )
}

export default Course