import { useEffect, useState } from "react";

export const usePlacesSearch = ({ location, query }) => {
  console.log("IN USEPLACESSEARCH");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const endpoint = query
    ? "/api/restaurants/search"
    : "/api/restaurants/nearby";

  console.log("query", query);
  useEffect(() => {
    console.log("location passed in:", location);
    if (!location || !location.lat || !location.lng) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(query ? { query, location } : location),
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
  }, [location, query]);

  return { results, error, loading };
};
