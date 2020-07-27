import React, { FC } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import EventEditView from "../EventEditView";
import { DestLoc } from "../../types";

interface CreateEventDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
  setTitle: (title: string) => void;
  title: string;
  desc: string;
  setDesc: (desc: string) => void;
  date: string;
  setDate: (date: string) => void;
  setDestLoc: (destLoc: DestLoc) => void;
  destLoc: DestLoc;
}

const CreateEventDialog: FC<CreateEventDialogProps> = ({
  open = false,
  onClose,
  onCreate,
  setTitle,
  title,
  desc,
  setDate,
  date,
  setDesc,
  setDestLoc,
  destLoc,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Event</DialogTitle>
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
        <Button onClick={onCreate} color="primary" variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEventDialog;
