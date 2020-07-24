import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useAuthStateContext } from "../../contexts/AuthenticationContext";

const styles = {
  width: "100vw",
  height: "calc(100vh - 80px)",
  position: "absolute",
};

const MapboxGLMap = (props) => {
  const [map, setMap] = useState(null);
  const { location } = useAuthStateContext();
  const mapContainer = useRef(null);
  const longLat = {
    long: props.longitude || location.coords.longitude || 0,
    lat: props.latitude || location.coords.latitude || 0,
  };

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY || "";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [longLat.long, longLat.lat],
        zoom: 10,
      });
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
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  useEffect(() => {
    if (map) {
      map.flyTo({
        center: [longLat.long, longLat.lat],
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        zoom: 10,
      });
    }
  }, [longLat.long, longLat.lat, map]);

  return <div ref={(el) => (mapContainer.current = el)} style={styles} />;
};

export default MapboxGLMap;
