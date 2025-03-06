"use client";

import React, { useState } from "react";
import MeetingCard from "./MeetingCard";
import { useRouter } from "next/navigation";
import MeetingDialog from "./MeetingDialog";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner";
import { CircleCheckBig, CircleX } from "lucide-react";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
const MeetingCardActions = () => {
  const router = useRouter();

  const [meetingState, setmeetingState] = useState<
    "instant" | "scheduled" | "join" | undefined
  >(undefined);

  const { user } = useUser();
  const videoClient = useStreamVideoClient();
  const [metadata, setMetaData] = useState<{
    dateTime: Date | undefined;
    description?: string;
    meetingLink?: string;
  }>({
    dateTime: new Date(),
    description: "",
    meetingLink: "",
  });

  const [videoCallDetails, setVideoCallDetails] = useState<Call>();
  const createMeeting = async () => {
    if (!user || !videoClient) return;
    try {
      if (!metadata.dateTime) {
        toast.error("Please select a Date Time");
        return;
      }
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

      if (!metadata.description) {
        router.push(`/meeting/${call.id}`);
        toast.success("Meeting Scheduled", {
          icon: <CircleCheckBig className="w-6 h-6" />,
          description: "Redirecting to Meeting Room.",
          duration: 5000,
          className: "px-4",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to Create Meeting", {
        icon: <CircleX className="w-24 h-24" />,
        description: "Something went wrong while creating a new Meeting",
      });
    }
  };
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${videoCallDetails?.id}`;
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4 justify-items-center content-around">
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
      {!videoCallDetails ? (
        <MeetingDialog
          isOpen={meetingState === "scheduled"}
          onClose={() => setmeetingState(undefined)}
          title="Schedule a Meeting"
          className="text-center"
          onClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label
              className="text-base font-normal leading-6 text-muted-foreground"
              htmlFor="agenda"
            >
              Add Agenda
            </label>
            <Textarea
              id="agenda"
              className="border-none bg-sidebar focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setMetaData({
                  ...metadata,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label
              className="text-base font-normal leading-6 text-muted-foreground"
              htmlFor="date"
            >
              Select Date & Time
            </label>
            <ReactDatePicker
              selected={metadata.dateTime}
              onChange={(date) =>
                setMetaData({
                  ...metadata,
                  dateTime: date!,
                })
              }
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="MMM d, yyyy h:mm aa"
              className="w-full rounded bg-sidebar p-2 focus:outline-0"
            />
          </div>
        </MeetingDialog>
      ) : (
        <MeetingDialog
          isOpen={meetingState === "scheduled"}
          onClose={() => setmeetingState(undefined)}
          title="Start an Instant Meeting"
          className="text-center"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Link Copied");
          }}
          image="/icons/checked.svg"
          btnIcon="/icons/copy.svg"
          btnText="Copy Meeting Link"
        />
      )}
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
