import React, { FC } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

import { EventCardProps } from "./types";
import useStyles from "./styles";

const EventCard: FC<EventCardProps> = ({ event }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader title={event?.title} />
      <CardContent></CardContent>
    </Card>
  );
};

export default EventCard;
