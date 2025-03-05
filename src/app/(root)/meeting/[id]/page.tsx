"use client";

import Loading from "@/components/Loading";
import MeetingSetup from "@/components/MeetingSetup";
import MeetingWindow from "@/components/MeetingWindow";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";

const MeetingRoom = ({ params }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [isSetupDone, setIsSetupDone] = useState<boolean>(false);
  const { call, isCallLoading } = useGetCallById(params.id);

  if (!isLoaded || isCallLoading) return <Loading />;
  return (
    <section className="w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupDone ? (
            <MeetingSetup setIsSetupDone={setIsSetupDone} />
          ) : (
            <MeetingWindow />
          )}
        </StreamTheme>
      </StreamCall>
    </section>
  );
};

export default MeetingRoom;
