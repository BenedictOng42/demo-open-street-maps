import React from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { useQueryData } from "../../hooks/firebase";

import { useAuthStateContext } from "../../contexts/AuthenticationContext";

import EventCard from "../../components/EventCard";
import Centered from "../../components/Centered";

import useStyles from "./styles";
import { Event } from "../../types";

const EventsPage = () => {
  const { user } = useAuthStateContext();
  const classes = useStyles();
  // const events = useEventsStateContext();

  const [events, error] = useQueryData<Event>("events", [
    {
      op: "where",
      args: ["owners", "array-contains", user?.uid],
    },
  ]);

  if (error) console.error(error);

  return (
    <Centered>
      <Typography variant="h6">{user?.displayName}'s events</Typography>
      <Container maxWidth="sm">
        <Divider className={classes.divider} />
        {events &&
          events.map((event) => <EventCard key={event.id} event={event} />)}
      </Container>
    </Centered>
  );
};

export default EventsPage;
