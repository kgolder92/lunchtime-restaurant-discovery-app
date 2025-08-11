import React, { useRef, useEffect } from "react";
import { useApiIsLoaded } from "@vis.gl/react-google-maps";
import { createRoot } from "react-dom/client";
import RestaurantItem from "../RestaurantItem/RestaurantItem";

const MapComponent = ({
  center,
  places = [],
  selectedPlaceId,
  onSelectPlace,
}) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const isLoaded = useApiIsLoaded();

  // creatmap only once
  useEffect(() => {
    if (!isLoaded || mapInstanceRef.current) return;

    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 13,
    });
    infoWindowRef.current = new window.google.maps.InfoWindow();
  }, [isLoaded]);

  // update map center when prop changes
  useEffect(() => {
    if (mapInstanceRef.current && center) {
      mapInstanceRef.current.panTo(center);
    }
  }, [center]);

  // build or update markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // make helper function to clear old markers?
    markersRef.current.forEach(({ marker }) => marker.setMap(null));
    markersRef.current = [];

    // make helper function to add new markers?
    markersRef.current = places
      .map((place) => {
        const lat = place.location?.latitude ?? place.location?.lat;
        const lng = place.location?.longitude ?? place.location?.lng;
        if (!lat || !lng) return null;

        const marker = new window.google.maps.Marker({
          map: mapInstanceRef.current,
          position: { lat, lng },
          title: place.displayName?.text || place.name || "Restaurant",
          icon: {
            url:
              place.id === selectedPlaceId
                ? "/assets/pin-selected.svg"
                : "/assets/pin-resting.svg",
            scaledSize: new window.google.maps.Size(32, 32),
          },
        });

        marker.addListener("click", () => {
          onSelectPlace?.(place.id);
        });

        return { marker, placeId: place.id, place };
      })
      .filter(Boolean);
  }, [places, selectedPlaceId, onSelectPlace]);

  // Show popup when selection changes
  useEffect(() => {
    if (!selectedPlaceId || !mapInstanceRef.current) return;

    const match = markersRef.current.find((m) => m.placeId === selectedPlaceId);
    if (!match) return;

    // update icon
    markersRef.current.forEach(({ marker, placeId }) => {
      marker.setIcon({
        url:
          placeId === selectedPlaceId
            ? "/assets/pin-selected.svg"
            : "/assets/pin-resting.svg",
        scaledSize: new window.google.maps.Size(32, 32),
      });
    });

    const container = document.createElement("div");
    const root = createRoot(container);
    root.render(<RestaurantItem restaurant={match.place} variant="mapPopup" />);

    infoWindowRef.current.setContent(container);
    infoWindowRef.current.open(mapInstanceRef.current, match.marker);
    mapInstanceRef.current.panTo(match.marker.getPosition());
  }, [selectedPlaceId]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

export default MapComponent;
