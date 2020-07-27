import React, { FC } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    formControl: {
      margin: theme.spacing(3),
    },
  })
);
interface CheckboxesGroupProps {
  removeTraffic: () => void;
  addTraffic: () => void;
}
const CheckboxesGroup: FC<CheckboxesGroupProps> = ({
  removeTraffic,
  addTraffic,
}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    traffic: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    if (event.target.checked) {
      addTraffic();
    } else removeTraffic();
  };

  const { traffic } = state;

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Overlay Choices</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={traffic}
                onChange={handleChange}
                name="traffic"
                color="primary"
              />
            }
            label="Traffic"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
};
export default CheckboxesGroup;
