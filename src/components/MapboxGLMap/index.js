import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useAuthStateContext } from "../../contexts/AuthenticationContext";

const styles = {
  width: "100vw",
  height: "calc(100vh - 80px)",
  position: "absolute",
};

const addMarkerIfNeeded = (map, long, lat) => {
  if (long && lat) {
    new mapboxgl.Marker().setLngLat([long, lat]).addTo(map);
  }
};
const MapboxGLMap = (props) => {
  const [map, setMap] = useState(null);
  const { location } = useAuthStateContext();
  const mapContainer = useRef(null);
  const destinationLngLat = {
    long: props.longitude,
    lat: props.latitude,
  };

  const vicinity = {
    long: props.longitude || location?.coords.longitude || 145.0737,
    lat: props.latitude || location?.coords.latitude || -37.82067,
  };

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY || "";
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [vicinity.long, vicinity.lat],
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
    if (map && destinationLngLat.long && destinationLngLat.lat) {
      map.flyTo({
        center: [destinationLngLat.long, destinationLngLat.lat],
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        zoom: 15,
      });
      addMarkerIfNeeded(map, destinationLngLat.long, destinationLngLat.lat);
    }
  }, [destinationLngLat.long, destinationLngLat.lat, map]);

  return <div ref={(el) => (mapContainer.current = el)} style={styles} />;
};

export default MapboxGLMap;
