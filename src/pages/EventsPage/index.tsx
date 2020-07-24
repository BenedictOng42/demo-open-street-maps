import React from "react";
import { Container, IconButton } from "@material-ui/core";
import { useAuthStateContext } from "../../contexts/AuthenticationContext";
import { useEventsStateContext } from "../../contexts/EventsContext";
import EventCard from "../../components/EventCard";
import AddIcon from "@material-ui/icons/AddCircleRounded";

const EventsPage = () => {
  const { user } = useAuthStateContext();
  const events = useEventsStateContext();
  return (
    <>
      <Container style={{ textAlign: "center" }}>
        <h2>{user?.displayName}'s events</h2>
        <Container
          style={{
            backgroundColor: "#CDCDCD",
            borderRadius: "1rem",
            height: "60vh",
            maxWidth: "50rem",
          }}
        >
          <IconButton
            style={{
              float: "right",
              paddingTop: "1.3rem",
              paddingRight: "0",
            }}
            onClick={() => console.log("clicked")}
          >
            <AddIcon color="primary" />
          </IconButton>

          {events && events.length ? (
            events.map((event) => (
              <EventCard
                description="my desc"
                eventName="myEvent"
                key={"asd"}
              />
            ))
          ) : (
            <h2 style={{ paddingTop: "2rem" }}>No events</h2>
          )}
        </Container>
      </Container>
    </>
  );
};

export default EventsPage;
