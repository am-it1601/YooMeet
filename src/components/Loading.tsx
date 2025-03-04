import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Image
        src="/icons/loading-circle.svg"
        width={64}
        height={64}
        alt="loading"
      />
    </div>
  );
};

export default Loading;
