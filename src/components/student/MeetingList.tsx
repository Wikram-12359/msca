// app/dashboard/meetings/page.tsx
"use client";
import { useMeetings } from "@/hooks/use-meetings";
import { useRouter } from "next/navigation";

export default function Meetings() {
  const { data: meetings, isLoading } = useMeetings();
  const router = useRouter();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Meetings</h1>
      {meetings?.map((m: any) => (
        <div key={m._id} style={{ padding: 16, border: "1px solid #ccc", marginBottom: 8 }}>
          <h3>{m.title}</h3>
          <p>Teacher: {m.teacher?.name}</p>
          <p>Scheduled: {new Date(m.scheduledAt).toLocaleString()}</p>
          <p>Status: {m.isActive ? "🟢 Live now" : "⏳ Not started"}</p>
          <button
            onClick={() => router.push(`/meeting/${m._id}`)}
            disabled={!m.isActive}
          >
            {m.isActive ? "Join Meeting" : "Waiting..."}
          </button>
        </div>
      ))}
    </div>
  );
}