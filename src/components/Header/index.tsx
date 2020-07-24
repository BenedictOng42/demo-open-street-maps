import React, { FC } from "react";
import clsx from "clsx";

import Typography from "@material-ui/core/Typography";

import Navigation from "../Navigation";
import Centered from "../Centered";

import { HeaderProps } from "./types";
import useStyles from "./styles";

const Header: FC<HeaderProps> = ({ className }) => {
  const classes = useStyles();
  return (
    <Centered className={clsx(className, classes.header)}>
      <Typography variant="h4" className={classes.title}>
        <b>Demo Event Planner</b>
      </Typography>
      <Navigation />
    </Centered>
  );
};

export default Header;
