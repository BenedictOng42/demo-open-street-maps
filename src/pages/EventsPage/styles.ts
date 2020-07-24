import { makeStyles, createStyles, Theme } from "@material-ui/core";

export default makeStyles<Theme>((theme) =>
  createStyles({
    divider: {
      marginBottom: theme.spacing(3),
      width: "100%",
    },
    header: {
      display: "flex",
      alignContent: "flex-end",
      justifyContent: "space-between",
    },
  })
);
