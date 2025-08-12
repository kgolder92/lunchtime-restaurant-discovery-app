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
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowRef = useRef(null);
  const isLoaded = useApiIsLoaded();

  useEffect(() => {
    if (!isLoaded || !center || mapInstanceRef.current) return;

    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 13,
    });

    infoWindowRef.current = new window.google.maps.InfoWindow();

    // close popup when clicking outside and set selectedplace to null
    mapInstanceRef.current.addListener("click", () => {
      infoWindowRef.current.close();
      onSelectPlace(null);
    });
  }, [isLoaded, center, onSelectPlace]);

  // update markers when places change
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
          onSelectPlace(place.id);
        });

        return { marker, placeId: place.id, place };
      })
      .filter(Boolean);

    if (places.length > 0) {
      mapInstanceRef.current.setCenter({
        lat: places[0].location?.latitude ?? places[0].location?.lat,
        lng: places[0].location?.longitude ?? places[0].location?.lng,
      });
    }
  }, [places, selectedPlaceId, onSelectPlace]);

  /** show popup when selection changes */
  useEffect(() => {
    if (!selectedPlaceId || !mapInstanceRef.current) return;

    const match = markersRef.current.find((m) => m.placeId === selectedPlaceId);
    if (!match) return;

    markersRef.current.forEach(({ marker, placeId }) => {
      marker.setIcon({
        url:
          placeId === selectedPlaceId
            ? "/assets/pin-selected.svg"
            : "/assets/pin-resting.svg",
        scaledSize: new window.google.maps.Size(32, 32),
      });
    });

    // render RestaurantItem in popup
    const container = document.createElement("div");
    const root = createRoot(container);
    root.render(
      <RestaurantItem
        restaurant={match.place}
        variant="mapPopup"
        isSelected={false}
      />
    );

    infoWindowRef.current.setContent(container);

    window.google.maps.event.addListenerOnce(
      infoWindowRef.current,
      "domready",
      () => {
        const iw = document.querySelector(".gm-style-iw");
        if (iw) {
          iw.parentElement.style.padding = "0";
          iw.style.padding = "0";
          iw.style.background = "transparent";
        }
        const closeBtn = document.querySelector(".gm-ui-hover-effect");
        if (closeBtn) closeBtn.style.display = "none";
      }
    );

    infoWindowRef.current.open(mapInstanceRef.current, match.marker);
    mapInstanceRef.current.panTo(match.marker.getPosition());
  }, [selectedPlaceId]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

export default MapComponent;
