import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { CopyIcon } from "lucide-react";
import { avatarImages } from "@/constants";
import Image from "next/image";
type CallCardProps = {
  icon: ReactNode;
  title?: string;
  date?: string;
  isPreviousMeeting: boolean;
  link: string;
  buttonIcon?: ReactNode;
  buttonText?: string;
  onClick?: () => void;
  participantCount: number;
};
const CallCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon,
  buttonText,
  link,
  onClick,
  participantCount,
}: CallCardProps) => {
  return (
    <section className="flex min-h-[240px] w-full flex-col justify-between rounded-[14px] bg-sidebar px-5 py-8 xl:max-w-[568px] shadow-sm shadow-muted hover:scale-105">
      <article className="flex flex-col gap-5">
        {icon}
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-center relative", {})}>
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="attendees"
              width={40}
              height={40}
              className={cn("rounded-full", { absolute: index > 0 })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          <div className="flex items-center justify-center absolute left-[136px] size-11 rounded-full border-[5px] border-secondary bg-background">
            +{participantCount}
          </div>
        </div>
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button
              onClick={onClick}
              className="rounded bg-sidebar-primary px-6 text-sidebar-primary-foreground hover:text-primary-foreground"
            >
              {buttonIcon}
              &nbsp; {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast.success("Link Copied");
              }}
              className="bg-sidebar text-sidebar-foreground hover:text-sidebar px-6 rounded"
            >
              <CopyIcon width={20} height={20} />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default CallCard;
