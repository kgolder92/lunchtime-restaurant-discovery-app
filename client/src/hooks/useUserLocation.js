import { useEffect, useState } from "react";

export const useUserLocation = () => {
  const fallback = { lat: 37.7749, lng: -122.4194 }; //san fran
  const [location, setLocation] = useState(fallback);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(fallback);
      setIsReady(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsReady(true);
      },
      () => {
        setLocation(fallback);
        setIsReady(true);
      }
    );
  }, []);

  return { location, isReady };
};
