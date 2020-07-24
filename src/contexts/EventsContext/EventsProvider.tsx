import React, { FC, useState } from "react";

import EventsContext from ".";

import { Event } from "../../types";

export const EventsProvider: FC = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);

  // TODO: get events from firestore

  return (
    <EventsContext.Provider value={events}>{children}</EventsContext.Provider>
  );
};
