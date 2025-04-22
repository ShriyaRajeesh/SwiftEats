import React, { useEffect, useRef } from "react";
import L from "leaflet";

const Map = ({ currentLocation, orderLocation }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([currentLocation.lat, currentLocation.lng], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    // Marker for current location
    L.marker([currentLocation.lat, currentLocation.lng]).addTo(map)
      .bindPopup("You are here")
      .openPopup();

    // Marker for order location
    L.marker([orderLocation.lat, orderLocation.lng]).addTo(map)
      .bindPopup("Order Location")
      .openPopup();
  }, [currentLocation, orderLocation]);

  return <div id="map" ref={mapRef} className="h-64 w-full" />;
};

export default Map;
