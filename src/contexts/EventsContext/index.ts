import { Event } from "./types";
import React from "react";

/**
 * Informs its children about the availability of Firebase.
 */
const EventsContext = React.createContext<Event[]>([]);

export default EventsContext;

export { EventsProvider } from "./EventsProvider";

export * from "./hooks";

const useEventsStateContext = () => {
  const context = React.useContext(EventsContext);
  if (!context) {
    throw new Error(
      "useEventsStateContext needs to be within an the EventsProvider"
    );
  }
  return context;
};

export { useEventsStateContext };
