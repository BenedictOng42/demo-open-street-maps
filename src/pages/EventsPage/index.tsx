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
import { Event, DestLoc } from "../../types";
import { useDataField } from "../../hooks/state";
import { useFirestore } from "../../contexts/FirebaseContext";
import firebase from "firebase";

import moment from "moment";
import { LinearProgress } from "@material-ui/core";
const EventsPage: FC = () => {
  const classes = useStyles();
  const { user } = useAuthStateContext();
  const [search, setSearch] = useRouteSearchState();
  const [title, setTitle] = useDataField<string>("");
  const [desc, setDesc] = useDataField<string>("");
  const [destLoc, setDestLoc] = useDataField<DestLoc>({
    address: "",
    location: [],
  });
  const [date, setDate] = useDataField<string>("");
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
  const closeDialog = useCallback(() => {
    setTitle("");
    setDate("");
    setDesc("");
    setDestLoc({
      address: "",
      location: [],
    });
    setSelectedEvent(undefined);
    setSearch("event");
  }, [setSearch, setDate, setDestLoc, setDesc, setTitle]);

  // Remember the event we want to show in a dialog
  const [selectedEvent, setSelectedEvent] = useState<Event>();

  // Find the event to show in a dialog if there is an id in the URL query
  useEffect(() => {
    if (selectedEventId)
      setSelectedEvent(events?.find((event) => event.id === selectedEventId));
  }, [selectedEventId, events, setSelectedEvent]);

  const store = useFirestore();

  const createEvent = useCallback(async () => {
    if (store) {
      const ref = store.collection("events").doc();
      ref.set({
        date: firebase.firestore.Timestamp.fromDate(new Date(date)),
        address: destLoc.address,
        location: new firebase.firestore.GeoPoint(
          destLoc.location[1],
          destLoc.location[0]
        ),
        title,
        description: desc,
        id: ref.id,
        owners: [user?.uid],
      });
      setTitle("");
      setDate("");
      setDesc("");
      setDestLoc({
        address: "",
        location: [],
      });
    }
  }, [
    store,
    desc,
    title,
    user,
    date,
    setDate,
    setTitle,
    setDesc,
    setDestLoc,
    destLoc,
  ]);

  const editEvent = useCallback(async () => {
    if (store) {
      const ref = store.collection("events").doc(selectedEventId);
      ref.update({
        date: firebase.firestore.Timestamp.fromDate(new Date(date)),
        address: destLoc.address,
        location: new firebase.firestore.GeoPoint(
          destLoc.location[1],
          destLoc.location[0]
        ),
        title,
        description: desc,
        id: ref.id,
        owners: [user?.uid],
      });
      setTitle("");
      setDate("");
      setDesc("");
      setDestLoc({
        address: "",
        location: [],
      });
    }
  }, [
    store,
    desc,
    title,
    user,
    date,
    setDate,
    setTitle,
    setDesc,
    setDestLoc,
    destLoc,
    selectedEventId,
  ]);

  const onCreate = async () => {
    await createEvent();
    closeDialog();
  };

  const onEdit = async () => {
    await editEvent();
    closeDialog();
  };
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
        {loading && (
          <>
            <div>Loading events...</div>
            <LinearProgress />
          </>
        )}
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
      <CreateEventDialog
        open={showCreate}
        onClose={closeDialog}
        title={title}
        setTitle={setTitle}
        desc={desc}
        setDesc={setDesc}
        onCreate={onCreate}
        setDate={setDate}
        date={date}
        destLoc={destLoc}
        setDestLoc={setDestLoc}
      />
      <EditEventDialog
        open={Boolean(selectedEventId && selectedEvent)}
        onClose={closeDialog}
        event={selectedEvent}
        title={title}
        setTitle={setTitle}
        desc={desc}
        setDesc={setDesc}
        setDate={setDate}
        date={date}
        destLoc={destLoc}
        setDestLoc={setDestLoc}
        onEdit={onEdit}
      />
    </Centered>
  );
};

export default EventsPage;
