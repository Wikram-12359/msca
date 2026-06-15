// components/jitsi-meeting-dynamic.tsx
import dynamic from "next/dynamic";

const JitsiMeetingEmbed = dynamic(
  () => import("@/components/jitsi-meeting"),
  {
    ssr: false,
    loading: () => <p>Loading meeting...</p>,
  }
);

export default JitsiMeetingEmbed;