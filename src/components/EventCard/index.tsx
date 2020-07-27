import React, { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment/moment";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";

import MapIcon from "@material-ui/icons/Map";
import MoreIcon from "@material-ui/icons/MoreVert";

import { EventCardProps } from "./types";
import useStyles from "./styles";

const EventCard: FC<EventCardProps> = ({
  event,
  onOptions,
  viewMapButton = true,
}) => {
  const classes = useStyles();

  const past = event && moment(event?.date.toDate()).isBefore();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card} raised>
      <CardHeader
        titleTypographyProps={{
          color: past ? "textSecondary" : undefined,
        }}
        title={event?.title}
        subheader={
          <>
            <div>
              {moment(event?.date.toDate()).format("Do MMMM YYYY h:mm a")}
            </div>
            {event?.address}
          </>
        }
        action={
          !past && onOptions ? (
            <IconButton onClick={onOptions}>
              <MoreIcon />
            </IconButton>
          ) : !past ? null : (
            <Typography
              style={{ float: "right", padding: "0.5rem" }}
              color="textSecondary"
            >
              Past
            </Typography>
          )
        }
      />
      <CardActions className={classes.actions} style={{ padding: 0 }}>
        {viewMapButton && (
          <Button
            color="primary"
            startIcon={<MapIcon />}
            component={Link}
            to={`maps/${event?.id}`}
          >
            View Map
          </Button>
        )}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph color={past ? "textSecondary" : undefined}>
            Description:
          </Typography>
          <Typography paragraph color={past ? "textSecondary" : undefined}>
            {event?.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default EventCard;
