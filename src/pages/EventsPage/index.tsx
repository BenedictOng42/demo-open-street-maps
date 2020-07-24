import React, { FC, useCallback, useState, useEffect } from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import AddIcon from "@material-ui/icons/Add";

import { useQueryData } from "../../hooks/firebase";
import { useRouteSearchState } from "../../hooks/route";
import { useMenuWithData } from "../../hooks/menu";

import { useAuthStateContext } from "../../contexts/AuthenticationContext";

import EventCard from "../../components/EventCard";
import Centered from "../../components/Centered";
import CreateEventDialog from "../../components/CreateEventDialog";
import EditEventDialog from "../../components/EditEventDialog";

import useStyles from "./styles";
import { Event } from "../../types";

const EventsPage: FC = () => {
  const classes = useStyles();
  const { user } = useAuthStateContext();
  const [search, setSearch] = useRouteSearchState();

  // Get the current users' events, ordered by date
  const [events, error, loading] = useQueryData<Event>("events", [
    {
      op: "where",
      args: ["owners", "array-contains", user?.uid],
    },
    {
      op: "orderBy",
      args: ["date", "desc"],
    },
  ]);

  if (error) console.error(error);

  // Menu anchor for opening the options menu for an event
  const [anchor, eventId, openMenu, closeMenu] = useMenuWithData<string>("");

  // Show the create event dialog
  const showCreate = search["event"] === "new";

  // The id of the selected event retrieved from the URL query
  const selectedEventId = (!showCreate && (search["event"] as string)) || "";

  // Callback to open the create event dialog
  const openCreate = useCallback(() => setSearch("event", "new"), [setSearch]);

  // Callback to open the edit event dialog
  const openEdit = useCallback(
    (eventId: string) => setSearch("event", eventId),
    [setSearch]
  );

  // Callback to close dialog
  const closeDialog = useCallback(() => setSearch("event"), [setSearch]);

  // Remember the event we want to show in a dialog
  const [selectedEvent, setSelectedEvent] = useState<Event>();

  // Find the event to show in a dialog if there is an id in the URL query
  useEffect(() => {
    if (selectedEventId)
      setSelectedEvent(events?.find((event) => event.id === selectedEventId));
  }, [selectedEventId, events, setSelectedEvent]);

  return (
    <Centered>
      <Container maxWidth="xs">
        <div className={classes.header}>
          <Typography variant="h6">My Events</Typography>
          <Tooltip title="Create event">
            <IconButton edge="end" onClick={openCreate}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Divider className={classes.divider} />
        {!loading && (!events || events.length === 0) && (
          <Typography color="textSecondary">No events</Typography>
        )}
        {events &&
          events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onOptions={(e) => openMenu(e, event.id)}
            />
          ))}
      </Container>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={closeMenu}>
        <MenuItem
          onClick={() => {
            closeMenu();
            openEdit(eventId);
          }}
        >
          Edit event
        </MenuItem>
      </Menu>
      <CreateEventDialog open={showCreate} onClose={closeDialog} />
      <EditEventDialog
        open={Boolean(selectedEventId && selectedEvent)}
        onClose={closeDialog}
        event={selectedEvent}
      />
    </Centered>
  );
};

export default EventsPage;
