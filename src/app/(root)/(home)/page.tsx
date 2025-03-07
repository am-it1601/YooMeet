import React from "react";

import MeetingCardActions from "@/components/MeetingCardActions";
import CallList from "@/components/CallList";

const Home = () => {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const todayDate = new Date().toLocaleDateString("en-US", {
    dateStyle: "full",
  });
  return (
    <section className="flex size-full flex-col gap-10 text-primary-foreground">
      <div className="h-[300px] w-full rounded-lg bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting : 12:30
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl text-foreground">
              {time}
            </h1>
            <p className="text-lg font-medium lg:text-2xl text-blue-200/90">
              {todayDate}
            </p>
          </div>
        </div>
      </div>
      <MeetingCardActions />
      <div className="flex flex-col text-white w-full gap-5">
        <h1 className="text-3xl font-bold text-white">Upcoming Meetings</h1>
        <CallList type="upcoming" />
      </div>
    </section>
  );
};

export default Home;
