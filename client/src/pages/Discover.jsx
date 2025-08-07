import React from "react";
import { useState } from "react";
//user location - create hook
import { useUserLocation } from "../hooks/useUserLocation";
//places - create hook
import { usePlacesSearch } from "../hooks/usePlacesSearch";
import styles from "./Discover.module.scss";
import RestaurantList from "../components/RestaurantList/RestaurantList";

const Discover = () => {
  /**    
   state- 
    searchMode
    searchQuery
  **/
  const { location } = useUserLocation();
  const { results, error, loading } = usePlacesSearch(location);

  //handle loading
  console.log("RESULTS: ", results);
  return (
    //favorites context?
    <main className={styles.discover}>
      {error && <div className={styles.discover__error}>{error}</div>}
      <div className={styles.discover__sidebar}>
        <RestaurantList restaurants={results.places || []} loading={loading} />
      </div>
      <div className={styles.discover__map}>
        <div>map view here</div>
      </div>
    </main>
  );
};

export default Discover;
