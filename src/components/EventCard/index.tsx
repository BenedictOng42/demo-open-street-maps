import React, { FC } from "react";
import { Link } from "react-router-dom";
import moment from "moment/moment";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import MapIcon from "@material-ui/icons/Map";
import MoreIcon from "@material-ui/icons/MoreVert";

import { EventCardProps } from "./types";
import useStyles from "./styles";

const EventCard: FC<EventCardProps> = ({ event, onOptions }) => {
  const classes = useStyles();
  const past = event && moment(event?.date.toDate()).isBefore();
  return (
    <Card className={classes.card}>
      <CardHeader
        titleTypographyProps={{
          color: past ? "textSecondary" : undefined,
        }}
        title={event?.title}
        subheader={moment(event?.date.toDate()).format("Do MMMM YYYY h:mm a")}
        action={
          !past &&
          onOptions && (
            <IconButton onClick={onOptions}>
              <MoreIcon />
            </IconButton>
          )
        }
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {event?.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          startIcon={<MapIcon />}
          component={Link}
          to={`maps/${event?.id}`}
        >
          View Map
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
