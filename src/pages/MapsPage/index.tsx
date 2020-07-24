import React, { FC } from "react";
import { useParams } from "react-router";
import MapboxGLMap from "../../components/MapboxGLMap";
import EventCard from "../../components/EventCard";
import { useDocumentData } from "../../hooks/firebase";
import { Event } from "../../types";

const MapsPage: FC = () => {
  const { id: eventId } = useParams<{ id?: string }>();
  const [event, error] = useDocumentData<Event>(`events/${eventId}`);

  return (
    <>
      <EventCard />
      <MapboxGLMap
        // longitude={event?.location.longitude}
        latitude={event?.location.latitude}
      />
    </>
  );
};

export default MapsPage;
