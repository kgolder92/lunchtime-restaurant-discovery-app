import React from "react";
import { useState } from "react";
import { usePlacesSearch } from "../hooks/usePlacesSearch";
import styles from "./Discover.module.scss";
import RestaurantList from "../components/RestaurantList/RestaurantList";

import Search from "../components/Search/Search";
import Header from "../components/Header/Header";
import MapComponent from "../components/Map/MapComponent";

const Discover = ({ initialLocation, isReady }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);

  const { results, error, loading } = usePlacesSearch({
    location: initialLocation,
    query: searchQuery,
    isReady,
  });

  const places = results?.places || [];
  console.log("places", places);
  const center =
    places.length > 0
      ? { lat: places[0].location.latitude, lng: places[0].location.longitude }
      : initialLocation;

  const handleSelectPlace = (placeId) => {
    console.log(placeId, "PLACEID");
    setSelectedPlaceId(placeId);
  };
  console.log("RESULTS: ", results);
  return (
    //favorites context?
    <main className={styles.discover}>
      <Header>
        <Search onSearch={setSearchQuery} />
      </Header>
      {error && <div className={styles.discover__error}>{error}</div>}
      <div className={styles.discover__resultsContainer}>
        <div className={styles.discover_listScrollContainer}>
          <div className={styles.discover__list}>
            <RestaurantList
              restaurants={results.places || []}
              loading={loading}
              selectedPlaceId={selectedPlaceId}
              onSelectPlace={handleSelectPlace}
            />
          </div>
        </div>
        <div className={styles.discover__map}>
          <MapComponent
            center={center}
            places={places}
            selectedPlaceId={selectedPlaceId}
            onSelectPlace={handleSelectPlace}
          />
        </div>
      </div>
    </main>
  );
};

export default Discover;
