import { makeStyles, createStyles, Theme } from "@material-ui/core";

export default makeStyles<Theme>((theme) =>
  createStyles({
    field: {
      marginBottom: theme.spacing(2),
    },
  })
);
