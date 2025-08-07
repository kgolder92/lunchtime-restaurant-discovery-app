import { useEffect, useState } from "react";
export const usePlacesSearch = (location) => {
  console.log("IN USEPLACESSEARCH");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("location passed in:", location);
    if (!location || !location.lat || !location.lng) return;
    console.log("in use effect");
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("api/restaurants/nearby", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(location),
        });

        if (!response.ok) {
          console.log("ERRor", response.status);
          throw new Error(`Status ${response.status}`);
        }
        const data = await response.json();
        console.log("data:", data);
        setResults(data);
      } catch (err) {
        setError(err);
        console.error(err);
        console.log("Failed to load nearby restaurants");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  return { results, error }; //loading, error
};
