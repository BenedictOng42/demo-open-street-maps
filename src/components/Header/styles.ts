import { makeStyles, createStyles, Theme } from "@material-ui/core";

export default makeStyles<Theme>((theme) =>
  createStyles({
    header: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(2),
    },
    title: {
      marginBottom: theme.spacing(2),
    },
  })
);
