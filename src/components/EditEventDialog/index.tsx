import React, { FC } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

import EventEditView from "../EventEditView";

import { EditEventDialogProps } from "./types";

const EditEventDialog: FC<EditEventDialogProps> = ({
  open = false,
  onClose,
  event,
  onEdit,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit {event?.title}</DialogTitle>
      <DialogContent>
        <EventEditView />
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
