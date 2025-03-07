import { IconName } from "lucide-react/dynamic";

export const MENU_LINKS: {
  label: string;
  route: string;
  imgUrl: IconName;
}[] = [
  {
    label: "Home",
    imgUrl: "home",
    route: "/",
  },
  {
    label: "Upcoming Meetings",
    imgUrl: "calendar-arrow-up",
    route: "/upcoming",
  },
  {
    label: "Previous Meetings",
    imgUrl: "calendar-minus-2",
    route: "/previous",
  },
  {
    label: "Recordings",
    imgUrl: "video",
    route: "/recordings",
  },
  {
    label: "Personal Room",
    imgUrl: "headset",
    route: "/personal-room",
  },
];
export const avatarImages = [
  "/images/avatar-1.jpeg",
  "/images/avatar-2.jpeg",
  "/images/avatar-3.png",
  "/images/avatar-4.png",
  "/images/avatar-5.png",
];
