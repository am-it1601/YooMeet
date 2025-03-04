"use client";

import { StreamTokenProvider } from "@/actions/stream.actions";
import Loading from "@/components/Loading";
import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_CLERK_STREAM_API_KEY;

export const StreamVideoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();
  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error("Unable to connect to Stream");
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
      },
      tokenProvider: StreamTokenProvider,
    });
    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient) return <Loading />;
  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};
