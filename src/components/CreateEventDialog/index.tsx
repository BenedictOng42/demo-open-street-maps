import React, { FC } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import EventEditView from "../EventEditView";

import { CreateEventDialogProps } from "./types";

const CreateEventDialog: FC<CreateEventDialogProps> = ({
  open = false,
  onClose,
  onCreate,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Event</DialogTitle>
      <DialogContent>
        <EventEditView />
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
