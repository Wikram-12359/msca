// components/jitsi-meeting.tsx
"use client";
import { authClient } from "@/lib/auth-client";
import { JitsiMeeting } from "@jitsi/react-sdk";

type Props = {
  roomName: string;
  displayName: string;
  email: string;
  isModerator: boolean;
  onLeave: () => void;
};

export default function JitsiMeetingEmbed({
  roomName,
  displayName,
  email,
  isModerator,
  onLeave,
}: Props) {
  const session = authClient.useSession()
  
  return (
    <JitsiMeeting
      domain="meet.jit.si"
      roomName={roomName}
      configOverwrite={{
        startWithAudioMuted: true,
        startWithVideoMuted: false,
        prejoinPageEnabled: false,
        enableWelcomePage: false,
        enableLobby: false,
        lobby: {
          enabled: false,
        },
        disableModeratorIndicator: false,
        // Teachers lock the room so random people can't join
        ...(isModerator && {
          startAsModerator: true,
          roomPasswordNumberOfDigits: false, // disable random password prompt
        }),
      }}
      interfaceConfigOverwrite={{
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: false,
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
      }}
      userInfo={{ displayName, email }}
      onApiReady={(api) => {
  api.addEventListener("videoConferenceJoined", () => {
    api.executeCommand("toggleLobby", false);
    api.executeCommand("password", null);
  });
}}
      onReadyToClose={onLeave}
      getIFrameRef={(iframeRef) => {
        iframeRef.style.height = "600px";
        iframeRef.style.width = "100%";
        iframeRef.style.border = "none";
        iframeRef.style.borderRadius = "8px";
      }}
    />
  );
}