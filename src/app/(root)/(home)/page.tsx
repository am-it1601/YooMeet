import React from "react";

import MeetingCardActions from "@/components/MeetingCardActions";

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
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium lg:text-2xl text-blue-200/90">
              {todayDate}
            </p>
          </div>
        </div>
      </div>
      <MeetingCardActions />
    </section>
  );
};

export default Home;
