import React from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type MeetingDialogProps = {
  isOpen: boolean;
  title?: string;
  btnText?: string;
  className?: string;
  children?: React.ReactNode;
  onClick: () => void;
  onClose: () => void;
  image?: string;
  btnIcon?: React.ReactNode;
};
const MeetingDialog = ({
  isOpen,
  title,
  onClick,
  btnText,
  onClose,
  className,
  children,
  image,
  btnIcon,
}: MeetingDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-card px-6">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image src={image} alt="image" width={72} height={72} />
            </div>
          )}
          <h1 className={cn("font-bold text-3xl leading-11", className)}>
            {title}
          </h1>
          {children}
          <Button
            className="bg-sidebar-primary text-sidebar-primary-foreground hover:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={onClick}
          >
            {btnIcon}
            {btnText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingDialog;
