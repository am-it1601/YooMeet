"use Client";
import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

const MeetingSetup = ({
  setIsSetupDone,
}: {
  setIsSetupDone: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [mediaToggleOn, setmediaToggleOn] = useState<
    true | false | "indeterminate"
  >(false);

  const call = useCall();

  if (!call)
    throw new Error("useCall must be used within StreamCall Component");

  if (mediaToggleOn === true) {
    call?.camera.disable();
    call?.microphone.disable();
  } else {
    call?.camera.enable();
    call?.microphone.enable();
  }
  useEffect(() => {}, [call?.camera, call?.microphone]);

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-3 text-foreground">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <Checkbox
          id="mediaToggle"
          checked={mediaToggleOn}
          onCheckedChange={(e) => setmediaToggleOn(e)}
        />
        <label
          htmlFor="mediaToggle"
          className="flex items-center justify-center gap-2 font-medium"
        >
          Join with your microphone and camera turned off.
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md px-4 py-2.5 bg-sidebar-primary"
        onClick={() => {
          call.join();
          setIsSetupDone(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
