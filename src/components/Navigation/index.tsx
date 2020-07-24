import React from "react";
import { Link, useLocation } from "react-router-dom";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import MapIcon from "@material-ui/icons/MapSharp";
import EventIcon from "@material-ui/icons/CalendarToday";

import useStyles from "./styles";

export default function LabelBottomNavigation() {
  const location = useLocation();
  const classes = useStyles();

  return (
    <BottomNavigation
      value={location.pathname.split("/")[1]}
      className={classes.navigation}
    >
      <BottomNavigationAction
        label="Events"
        value="events"
        icon={<EventIcon />}
        component={Link}
        to="/events"
      />
      <BottomNavigationAction
        label="Maps"
        value="maps"
        icon={<MapIcon />}
        component={Link}
        to="/maps"
      />
    </BottomNavigation>
  );
}
