import { makeStyles, createStyles, Theme } from "@material-ui/core";

export default makeStyles<Theme>((theme) =>
  createStyles({
    navigation: {
      backgroundColor: theme.palette.background.default
    },
  })
);
