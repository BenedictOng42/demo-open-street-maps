import { makeStyles, createStyles, Theme } from "@material-ui/core";

export default makeStyles<Theme>((theme) =>
  createStyles({
    card: {
      "&:not(:last-child)": {
        marginBottom: theme.spacing(2),
      },
    },
  })
);
