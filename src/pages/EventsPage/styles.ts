import { makeStyles, createStyles, Theme } from "@material-ui/core";

export default makeStyles<Theme>((theme) =>
  createStyles({
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3),
      width: "100%",
    },
  })
);
