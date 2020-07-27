import React, { FC } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import OverlayCheckbox from "../OverlayCheckbox";
import TerrainIcon from "@material-ui/icons/Terrain";
import IconButton from "@material-ui/core/IconButton";
import { theme } from "../../config";
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

type Anchor = "top" | "left" | "bottom" | "right";

interface MapOptionsProps {
  removeTraffic: () => void;
  addTraffic: () => void;
}
const MapOptions: FC<MapOptionsProps> = ({ removeTraffic, addTraffic }) => {
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  return (
    <div>
      <>
        <div
          style={{
            position: "fixed",
            bottom: "2em",
            left: "2.5rem",
          }}
        >
          <IconButton
            onClick={toggleDrawer(true)}
            style={{ backgroundColor: theme.palette.primary.main }}
          >
            <TerrainIcon style={{ fill: "white" }} />
          </IconButton>
        </div>
        <Drawer open={state} onClose={toggleDrawer(false)}>
          <div className={clsx(classes.list)} role="presentation">
            <OverlayCheckbox
              addTraffic={addTraffic}
              removeTraffic={removeTraffic}
            />
          </div>
        </Drawer>
      </>
    </div>
  );
};

export default MapOptions;
