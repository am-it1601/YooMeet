"use client";
import { Button } from "@/components/ui/button";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-blue-300 lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl bg-background w-full p-4 rounded-md">
        {description}
      </h1>
    </div>
  );
};

const PersonalRoomPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();

  const meetingId = user?.id;

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Personal Meeting Room</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px] bg-sidebar p-4 rounded-md ">
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting ID" description={meetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <Button
          className="bg-sidebar-primary text-sidebar-primary-foreground hover:text-sidebar-primary"
          onClick={startRoom}
        >
          Start Meeting
        </Button>
        <Button
          className="bg-secondary text-secondary-foreground hover:text-secondary"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Link Copied");
          }}
        >
          Copy Invitation
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoomPage;
