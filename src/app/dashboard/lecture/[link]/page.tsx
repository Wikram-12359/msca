"use client"
import api from "@/lib/axios"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

function getYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);

    // youtube.com/watch?v=VIDEO_ID
    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }

    // youtu.be/VIDEO_ID
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1);
    }

    return null;
  } catch {
    return null;
  }
}

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
          setLecture(getYouTubeVideoId(res?.data?.link))
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
      {loading && <p className="text-xl">Loading...</p>}
      {lecture && (
        <iframe
          className="w-full min-h-[80vh]"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${lecture}?rel=0&modestbranding=1`}
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
