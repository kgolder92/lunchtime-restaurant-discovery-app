import React from "react";
import { useState } from "react";
import { usePlacesSearch } from "../hooks/usePlacesSearch";
import styles from "./Discover.module.scss";
import RestaurantList from "../components/RestaurantList/RestaurantList";

import Search from "../components/Search/Search";
import Header from "../components/Header/Header";

const Discover = ({ initialLocation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { results, error, loading } = usePlacesSearch({
    location: initialLocation,
    query: searchQuery,
  });
  const center = results[0]?.location || { lat: 0, lng: 0 };

  console.log("RESULTS: ", results);
  return (
    //favorites context?
    <main className={styles.discover}>
      <Header>
        <Search onSearch={setSearchQuery} />
      </Header>
      {error && <div className={styles.discover__error}>{error}</div>}
      <div className={styles.discover__sidebar}>
        <RestaurantList restaurants={results.places || []} loading={loading} />
      </div>
      <div className={styles.discover__map}>map</div>
    </main>
  );
};

export default Discover;
