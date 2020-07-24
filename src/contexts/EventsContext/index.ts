import React from "react";
import { firestore } from "firebase/app";

import { Event } from "../../types";

/**
 * Informs its children about the availability of Firebase.
 */
const EventsContext = React.createContext<Event[]>([
  // Sample mock data
  {
    id: "1",
    title: "Foop Birthday",
    description: "Happy Birthday to you",
    date: firestore.Timestamp.fromDate(new Date()),
    location: new firestore.GeoPoint(37.8778971, 145.1831537),
  },
  {
    id: "2",
    title: "FoopLord Birthday",
    description: "Happy Birthday to me",
    date: firestore.Timestamp.fromDate(new Date()),
    location: new firestore.GeoPoint(-37.6690123, 144.8388386),
  },
]);

export default EventsContext;

export { EventsProvider } from "./EventsProvider";

export const useEventsStateContext = () => {
  const context = React.useContext(EventsContext);
  if (!context) {
    throw new Error(
      "useEventsStateContext needs to be within an the EventsProvider"
    );
  }
  return context;
};
