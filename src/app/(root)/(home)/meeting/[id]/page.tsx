import React from "react";

const MeetingRoom = ({ params }: { params: { id: string } }) => {
  return <div>MeetingRoom : {params.id}</div>;
};

export default MeetingRoom;
