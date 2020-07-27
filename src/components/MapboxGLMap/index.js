import React, { useEffect, useRef, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import MapOptionsDrawer from "../MapOptionsDrawer";
import { useAuthStateContext } from "../../contexts/AuthenticationContext";
import { mapboxToken } from "../../config";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
const styles = {
  // width: "100vw",
  // height: "100%",
  // position: "absolute",
  flexGrow: 1,
};

const MapboxGLMap = (props) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const destinationLngLat = {
    long: props.longitude,
    lat: props.latitude,
  };

  const vicinity = {
    long: props.longitude || 145.0737,
    lat: props.latitude || -37.82067,
  };

  const directions = new MapboxDirections({
    unit: "metric",
    profile: "mapbox/driving-traffic",
    accessToken: mapboxToken,
    alternatives: true,
    congestion: true,
    // controls: {
    //   inputs: false,
    // },
  });

  const addTraffic = useCallback(() => {
    map.setLayoutProperty("traffic", "visibility", "visible");
  }, [map]);

  const removeTraffic = useCallback(() => {
    map.setLayoutProperty("traffic", "visibility", "none");
  }, [map]);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY || "";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [vicinity.long, vicinity.lat],
        zoom: 14,
      });

      map.addControl(directions, "top-right");
      navigator.geolocation.getCurrentPosition((data) => {
        directions.setOrigin([data.coords.longitude, data.coords.latitude]);
      });

      directions.options.alternatives = true;
      const locator = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        showAccuracyCircle: true,
        trackUserLocation: true,
        showUserLocation: true,
      });

      map.addControl(locator);

      map.on("load", () => {
        setMap(map);
        map.addSource("mapbox-traffic", {
          type: "vector",
          url: "mapbox://mapbox.mapbox-traffic-v1",
        });
        const contoursLayer = {
          id: "traffic",
          source: "mapbox-traffic",
          "source-layer": "traffic",
          type: "line",
          paint: {
            "line-width": 2,
            "line-color": [
              "case",
              ["==", "low", ["get", "congestion"]],
              "#aab7ef",
              ["==", "moderate", ["get", "congestion"]],
              "#4264fb",
              ["==", "heavy", ["get", "congestion"]],
              "#ee4e8b",
              ["==", "severe", ["get", "congestion"]],
              "#b43b71",
              "#000000",
            ],
          },
        };
        map.addLayer(contoursLayer);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  useEffect(() => {
    if (!props.event) {
      console.log("hello there im in");
      directions.removeRoutes();
    }
    if (map && destinationLngLat.long && destinationLngLat.lat) {
      console.log(map.getStyle());

      map.flyTo({
        center: [destinationLngLat.long, destinationLngLat.lat],
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        zoom: 15,
      });

      directions.setDestination(props.event?.address);
      navigator.geolocation.getCurrentPosition((data) => {
        directions.setOrigin([data.coords.longitude, data.coords.latitude]);
      });
    }
  }, [
    destinationLngLat.long,
    destinationLngLat.lat,
    map,
    props.event,
    directions,
  ]);

  return (
    <>
      <div ref={(el) => (mapContainer.current = el)} style={styles} />
      <MapOptionsDrawer addTraffic={addTraffic} removeTraffic={removeTraffic} />
    </>
  );
};

export default MapboxGLMap;
