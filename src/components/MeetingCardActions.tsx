"use client";

import React, { useState } from "react";
import MeetingCard from "./MeetingCard";
import { useRouter } from "next/navigation";

const MeetingCardActions = () => {
  const router = useRouter();
  const [meetingState, setmeetingState] = useState<
    "instant" | "scheduled" | "join" | undefined
  >(undefined);
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
    </section>
  );
};

export default MeetingCardActions;
