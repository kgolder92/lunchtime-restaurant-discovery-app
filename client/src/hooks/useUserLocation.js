import { useEffect, useState } from "react";

export const useUserLocation = () => {
  const fallback = { lat: 37.7749, lng: -122.4194 }; //san fran
  const [location, setLocation] = useState(fallback);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(fallback);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        setLocation(fallback);
      }
    );
  }, []);

  return { location };
};
