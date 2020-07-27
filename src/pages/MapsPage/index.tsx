import React, { FC } from "react";
import { useParams } from "react-router";
import MapboxGLMap from "../../components/MapboxGLMap";
import EventCard from "../../components/EventCard";
import { useDocumentData } from "../../hooks/firebase";
import { Event } from "../../types";

const MapsPage: FC = () => {
  const { id: eventId } = useParams<{ id?: string }>();
  const [event] = useDocumentData<Event>(`events/${eventId}`);
  console.log("event", event);
  return (
    <>
      <MapboxGLMap
        longitude={event?.location?.longitude}
        latitude={event?.location?.latitude}
        event={event}
      />
      {event && (
        <div
          style={{
            position: "absolute",
            top: "12rem",
            width: "20rem",
            left: "20px",
            color: "black",
            backgroundColor: "white",
          }}
        >
          <EventCard key={event?.id} event={event} viewMapButton={false} />
        </div>
      )}
    </>
  );
};

export default MapsPage;
