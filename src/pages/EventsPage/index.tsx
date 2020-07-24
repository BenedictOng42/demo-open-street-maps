import React, { FC } from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import AddIcon from "@material-ui/icons/Add";

import { useQueryData } from "../../hooks/firebase";

import { useAuthStateContext } from "../../contexts/AuthenticationContext";

import EventCard from "../../components/EventCard";
import Centered from "../../components/Centered";

import useStyles from "./styles";
import { Event } from "../../types";

const EventsPage: FC = () => {
  const classes = useStyles();
  const { user } = useAuthStateContext();
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
      <Container maxWidth="sm">
        <div className={classes.header}>
          <Typography variant="h6">{user?.displayName}'s events</Typography>
          <Tooltip title="Create event">
            <IconButton edge="end">
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Divider className={classes.divider} />
        {events &&
          events.map((event) => <EventCard key={event.id} event={event} />)}
      </Container>
    </Centered>
  );
};

export default EventsPage;
