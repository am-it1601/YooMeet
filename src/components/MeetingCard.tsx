import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const MeetingCard = ({
  className,
  title,
  text,
  icon,
  click,
}: {
  className?: string;
  title?: string;
  text?: string;
  icon?: string;
  click?: () => void;
}) => {
  return (
    <div
      className={cn(
        "meeting-box shadow-xl hover:animate-pulse shadow-primary/15",
        className
      )}
      onClick={click}
    >
      {icon && (
        <div className="flex items-center justify-center glassmorphism size-12 rounded-sm">
          <Image
            src={icon}
            alt="add_meeting"
            width={24}
            height={24}
            onClick={click}
          />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{text}</p>
      </div>
    </div>
  );
};

export default MeetingCard;
