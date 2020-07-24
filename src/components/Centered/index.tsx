import React, { FC } from "react";
import clsx from "clsx";

import useStyles from "./styles";
import { CenteredProps } from "./types";

const Centered: FC<CenteredProps> = ({ className, children }) => {
  const classes = useStyles();
  return <div className={clsx(classes.centered, className)}>{children}</div>;
};

export default Centered;
