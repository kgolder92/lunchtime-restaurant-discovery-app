import React from "react";
import { useState } from "react";
//user location - create hook
import { useUserLocation } from "../hooks/useUserLocation";
//places - create hook
import { usePlacesSearch } from "../hooks/usePlacesSearch";
import styles from "./Discover.module.scss";
import Header from "../components/Header/Header";

const Discover = () => {
  /** 
   data - 
    location from location custom hook
    results, loading from places custom hook
   
   state- 
    searchMode
    searchQuery
  **/

  return (
    //favorites context?
    <main className={styles.container}>
      <Header />
      <div className={styles.layout}>
        <div>restaurant list here</div>
        <div>map view here</div>
      </div>
    </main>
  );
};

export default Discover;
