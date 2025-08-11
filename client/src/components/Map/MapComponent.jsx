import React, { useRef, useEffect } from "react";
import { useApiIsLoaded } from "@vis.gl/react-google-maps";

const MapComponent = ({ center, places = [] }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const isLoaded = useApiIsLoaded();

  useEffect(() => {
    if (!isLoaded || !center) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 13,
    });

    // make helper function to clear old markers?
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // make helper function to add markers for each place?
    markersRef.current = places
      .map((place) => {
        const lat = place.location?.latitude ?? place.location?.lat;
        const lng = place.location?.longitude ?? place.location?.lng;
        if (!lat || !lng) return null;

        return new window.google.maps.Marker({
          map,
          position: { lat, lng },
          title: place.displayName?.text || place.name || "Restaurant",
          icon: {
            url: "/assets/pin-resting.svg",
            scaledSize: new window.google.maps.Size(32, 32),
          },
        });
      })
      .filter(Boolean);

    // auto-center if thre are places
    if (places.length > 0) {
      map.setCenter({
        lat: places[0].location?.latitude ?? places[0].location?.lat,
        lng: places[0].location?.longitude ?? places[0].location?.lng,
      });
    }
  }, [isLoaded, center, places]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

export default MapComponent;
