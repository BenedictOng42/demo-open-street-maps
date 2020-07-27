import React, { FC, useEffect } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import EventEditView from "../EventEditView";
import { Event, DestLoc } from "../../types";

interface EditEventDialogProps {
  open?: boolean;
  onClose?: () => void;
  event?: Event | null;
  onEdit?: () => void;
  setTitle: (title: string) => void;
  title: string;
  desc: string;
  setDesc: (desc: string) => void;
  date: string;
  setDate: (date: string) => void;
  setDestLoc: (destLoc: DestLoc) => void;
  destLoc: DestLoc;
}

const EditEventDialog: FC<EditEventDialogProps> = ({
  open = false,
  onClose,
  setTitle,
  title,
  desc,
  setDesc,
  event,
  onEdit,
  setDate,
  date,
  setDestLoc,
  destLoc,
}) => {
  useEffect(() => {
    const rawDateArr = event?.date.toDate().toISOString().split(":");

    if (event) {
      setDesc(event?.description);
      if (rawDateArr) setDate(`${rawDateArr[0]}:${rawDateArr[1]}`);
      setDestLoc({
        address: event?.address,
        location: [event?.location?.longitude, event?.location?.latitude],
      });
      setTitle(event?.title);
    }
  }, [event]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit {event?.title}</DialogTitle>
      <DialogContent>
        <EventEditView
          setTitle={setTitle}
          title={title}
          desc={desc}
          setDesc={setDesc}
          setDate={setDate}
          date={date}
          setDestLoc={setDestLoc}
          destLoc={destLoc}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={onEdit} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEventDialog;
