"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody, 
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { useTeacherMeetings, useDeleteMeeting } from "@/hooks/use-meetings";
import { toast } from "sonner";

type Meeting = {
  _id: string;
  title: string;
  meetingLink: string;
  course?: { title: string };
  createdAt: string;
};

const ShowMeetings = () => {
  const { data: meetings, isLoading, isError } = useTeacherMeetings();

  if (isLoading) {
    return <p>Loading active meetings...</p>;
  }

  if (isError) {
    return <p>Failed to load meetings.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Your Active Meetings</h2>
          <p className="text-sm text-muted-foreground">Manage current classes and end sessions when finished.</p>
        </div>
      </div>

      {meetings?.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Meeting Link</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meetings.map((meeting: Meeting) => (
              <MeetingRow key={meeting._id} meeting={meeting} />
            ))}
          </TableBody>
          <TableCaption>Your active meetings are shown here.</TableCaption>
        </Table>
      ) : (
        <div className="rounded-lg border bg-muted/50 p-6 text-center text-sm text-muted-foreground">
          No active meetings found. Start a class to see it appear here.
        </div>
      )}
    </div>
  );
};

function MeetingRow({ meeting }: { meeting: Meeting }) {
  const toggleMeeting = useDeleteMeeting(meeting._id);

  const handleEndMeeting = () => {
    toggleMeeting.mutate(undefined, {
      onSuccess: () => toast.success("Meeting ended."),
      onError: () => toast.error("Failed to end meeting."),
    });
  };

  return (
    <TableRow>
      <TableCell>{meeting.title}</TableCell>
      <TableCell>{meeting.course?.title ?? "-"}</TableCell>
      <TableCell>
        <a href={meeting.meetingLink} target="_blank" rel="noreferrer" className="text-primary underline">
          Open link
        </a>
      </TableCell>
      <TableCell>{new Date(meeting.createdAt).toLocaleString()}</TableCell>
      <TableCell>
        <Button variant="destructive" size="sm" onClick={handleEndMeeting} disabled={toggleMeeting.isPending}>
          End meeting
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default ShowMeetings