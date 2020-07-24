import React, { FC } from "react";
interface EventCardProps {
  description: string;
  eventName: string;
}
const EventCard: FC<EventCardProps> = (props) => {
  return <div>Card</div>;
};

export default EventCard;
