import { makeStyles, createStyles, Theme } from "@material-ui/core";

export default makeStyles<Theme>(
  createStyles({
    centered: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  })
);
