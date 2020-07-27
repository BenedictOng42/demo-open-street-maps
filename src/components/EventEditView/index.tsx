import React, { FC, useState, useEffect } from "react";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import useStyles from "./styles";
import { useSearchMapbox } from "../../hooks/mapboxgl/hooks";
import { DestLoc } from "../../types";

interface EventEditViewProps {
  setDesc: (desc: string) => void;
  setTitle: (title: string) => void;
  title: string;
  desc: string;
  date: string;
  setDate: (date: string) => void;
  setDestLoc: (destLoc: DestLoc) => void;
  destLoc: DestLoc;
}
const EventEditView: FC<EventEditViewProps> = ({
  title,
  desc,
  setTitle,
  setDesc,
  date,
  setDate,
  setDestLoc,
  destLoc,
}) => {
  const classes = useStyles();
  const [searchMaps] = useSearchMapbox();
  const [options, setOptions] = useState<any[]>([]);
  const [prox, setProx] = useState<{ lat: number; lng: number } | null>(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((data) => {
      const lat = data.coords.latitude;
      const lng = data.coords.longitude;
      setProx({
        lat,
        lng,
      });
    });
  }, []);
  const onChangeMapQuery = async (searchQuery: any) => {
    const search = searchQuery.value;
    if (search.trim()) {
      const data = await searchMaps(search, prox);
      setOptions(
        data.features.map((option: any) => {
          return {
            address: option.place_name,
            location: option.geometry?.coordinates,
          };
        })
      );
    }
  };
  return (
    <div>
      <TextField
        value={title}
        className={classes.field}
        fullWidth
        label="Event title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        value={desc}
        className={classes.field}
        fullWidth
        label="Description"
        multiline
        onChange={(e) => setDesc(e.target.value)}
      />

      <TextField
        id="datetime-local"
        label="Event date and time"
        type="datetime-local"
        className={classes.textField}
        value={date}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        onChange={(e) => {
          setDate(e.target.value);
        }}
      />
      <Autocomplete
        id="combo-box-demo"
        options={options}
        getOptionLabel={(option) => option.address}
        style={{ paddingTop: "1.5rem", paddingBottom: "5rem" }}
        renderInput={(params) => (
          <TextField {...params} label="Location of Event" variant="outlined" />
        )}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
          onChangeMapQuery(e.target)
        }
        autoComplete
        onChange={(_, value: DestLoc) => setDestLoc(value)}
        autoSelect
        value={destLoc}
      />
    </div>
  );
};

export default EventEditView;
