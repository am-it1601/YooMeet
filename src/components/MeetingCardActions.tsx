"use client";

import React, { useState } from "react";
import MeetingCard from "./MeetingCard";
import { useRouter } from "next/navigation";
import MeetingDialog from "./MeetingDialog";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

const MeetingCardActions = () => {
  const router = useRouter();

  const [meetingState, setmeetingState] = useState<
    "instant" | "scheduled" | "join" | undefined
  >(undefined);

  const { user } = useUser();
  const videoClient = useStreamVideoClient();
  const [metadata, setMetaData] = useState<>({
    dateTime: new Date(),
    description: "",
    meetingLink: "",
  });

  const [videoCallDetails, setVideoCallDetails] = useState<Call>();
  const createMeeting = async () => {
    if (!user || !videoClient) return;
    try {
      const id = crypto.randomUUID();
      const call = videoClient.call("default", id);
      if (!call) throw new Error("Failed to create a call");

      const startDate =
        metadata.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = metadata.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startDate,
          custom: {
            description,
          },
        },
      });
      setVideoCallDetails(call);
      if (!metadata.description) router.push(`/meeting/${call.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <MeetingCard
        className="bg-orange-500"
        icon="/icons/add-meeting.svg"
        title="New Meeting"
        text="Start a new Meeting Immidiately."
        click={() => setmeetingState("instant")}
      />
      <MeetingCard
        className="bg-green-500"
        icon="/icons/schedule.svg"
        title="Schedule a Meeting"
        text="Plan a meeting for Later."
        click={() => setmeetingState("scheduled")}
      />
      <MeetingCard
        className="bg-blue-400"
        icon="/icons/add-meeting.svg"
        title="Join Meeting"
        text="via Invitation Link"
        click={() => setmeetingState("join")}
      />
      <MeetingCard
        className="bg-purple-600"
        icon="/icons/recordings.svg"
        title="View Recordings"
        text="Watch out your past meeting Recordings"
        click={() => router.push("/recordings")}
      />
      <MeetingDialog
        isOpen={meetingState === "instant"}
        onClose={() => setmeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        btnText="Start Meeting"
        onClick={createMeeting}
      />
    </section>
  );
};

export default MeetingCardActions;
