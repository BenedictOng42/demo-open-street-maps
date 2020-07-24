import React, { FC } from "react";

import TextField from "@material-ui/core/TextField";

import useStyles from "./styles";

const EventEditView: FC = () => {
  const classes = useStyles();
  return (
    <div>
      <TextField className={classes.field} fullWidth label="Event title" />
      <TextField
        className={classes.field}
        fullWidth
        label="Description"
        multiline
      />
    </div>
  );
};

export default EventEditView;
