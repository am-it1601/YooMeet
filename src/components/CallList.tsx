"use client";
import { useGetCalls } from "@/hooks/useGetCall";
import { CallRecording } from "@stream-io/node-sdk";
import { Call } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import CallCard from "./CallCard";
import { CalendarCheck, CalendarDays, Video } from "lucide-react";

const CallList = ({ type }: { type: "upcoming" | "ended" | "recordings" }) => {
  const { isLoading, upcomingCalls, callRecordings, endedCalls } =
    useGetCalls();
  const router = useRouter();
  const [recordings, setrecordings] = useState<CallRecording[]>();

  const getCalls = () => {
    switch (type) {
      case "upcoming":
        return upcomingCalls;
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "upcoming":
        return "No Upcoming Calls";
      case "recordings":
        return "No Recordings";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      const callData = await Promise.all(
        callRecordings?.map((meeting: Call) => meeting.queryRecordings()) ?? []
      );

      console.log("Call Data ", callData);
      const recordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      // eslint-disable-next-line
      //@ts-expect-error
      setrecordings(recordings);
    };

    if (type === "recordings") {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  if (isLoading) return <Loading />;

  const calls = getCalls();

  const noCallsMessage = getNoCallsMessage();
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 justify-items-center">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <CallCard
            key={(meeting as Call).id}
            icon={
              type === "ended" ? (
                <CalendarCheck width={20} height={20} />
              ) : type === "upcoming" ? (
                <CalendarDays width={20} height={20} />
              ) : (
                <Video width={20} height={20} />
              )
            }
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as CallRecording).filename?.substring(0, 20) ||
              "No Description"
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time?.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            link={
              type === "recordings"
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (meeting as Call).id
                  }`
            }
            buttonIcon={type === "recordings" ? "/icons/play.svg" : undefined}
            buttonText={type === "recordings" ? "Play" : "Start"}
            onClick={
              type === "recordings"
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
            participantCount={(meeting as Call).state?.participantCount || 1}
          />
        ))
      ) : (
        <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
