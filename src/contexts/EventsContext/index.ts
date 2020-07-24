import { Event } from "./types";
import React from "react";

/**
 * Informs its children about the availability of Firebase.
 */
const EventsContext = React.createContext<Event[]>([]);

export default EventsContext;

export { EventsProvider } from "./EventsProvider";

export * from "./hooks";
