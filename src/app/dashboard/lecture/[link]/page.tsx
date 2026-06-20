"use client"
import api from "@/lib/axios"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Lecture(){
  const {link} = useParams()

  const [loading, setLoading] = useState(false)
  const [lecture, setLecture] = useState<string | null>(null)
  useEffect(() => {
      let mounted = true
      async function load() {
        setLoading(true)
        try {
          const res = await api.get(`/student/lecture/${link}`)
          console.log(res);
          if (!mounted) return
          setLecture(res?.data?.link ?? "")
        } catch (err: unknown) {
          if (!mounted) return
          console.error(err)
          setLecture(null)
        } finally {
          if (!mounted) return
          setLoading(false)
        }
      }
  
      load()
      return () => {
        mounted = false
      }
    }, [link])

  return (
    <div className="p-2">
      <p className="text-xl">{loading ?? "Loading...."}</p>
      {lecture && (
        <iframe
          className="w-full min-h-[80vh]"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${lecture}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
      <Link className="bg-primary text-xl px-4 py-2 text-white rounded-2xl mt-5 block w-40 text-center" href="/dashboard">Go Back</Link>
    </div>
  )
}
