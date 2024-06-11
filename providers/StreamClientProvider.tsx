"use client";
import { useUser } from "@clerk/nextjs";
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";
import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
// const userId = "user-id";
// const token = "authentication-token";
// const user: User = { id: userId };

// const client = new StreamVideoClient({ apiKey, user, token });
// const calld = client.call("default", "my-first-call");
// call.join({ create: true });

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();
  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error("Stream API KEY missing");
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.imageUrl,
        //   2:00:00
      },
      tokenProvider,
    });
    setVideoClient(client);
  }, [user, isLoaded]);
  if (!videoClient) return <Loader />;
  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
