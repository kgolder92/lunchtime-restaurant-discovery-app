import React from "react";
import { useEffect, useRef } from "react";
import RestaurantItem from "../RestaurantItem/RestaurantItem";
import PropTypes from "prop-types";
import styles from "./RestaurantList.module.scss";

// const propTypes = {
//   restaurants: propTypes.arrayOf(
//     PropTypes.shape({
//       displayName: PropTypes.string,
//     })
//   ),
//   loading: propTypes.boolean,
// };

const RestaurantList = ({
  restaurants,
  loading,
  selectedPlaceId,
  onSelectPlace,
}) => {
  const itemRefs = useRef({});

  useEffect(() => {
    if (selectedPlaceId && itemRefs.current[selectedPlaceId]) {
      itemRefs.current[selectedPlaceId].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedPlaceId]);

  if (loading)
    return <div className={styles.message}>Loading restaurants...</div>;
  if (!restaurants.length)
    return <div className={styles.message}>No restaurants found.</div>;
  console.log(restaurants, "RESYS");
  return (
    <ul className={styles.list}>
      {restaurants.map((r) => (
        <li
          key={r.id}
          className={r.id === selectedPlaceId ? styles.active : ""}
          onClick={() => onSelectPlace(r.id)}
          ref={(el) => {
            if (el) itemRefs.current[r.id] = el;
          }}
        >
          <RestaurantItem
            restaurant={r}
            isSelected={selectedPlaceId === r.id}
          />
        </li>
      ))}
    </ul>
  );
};

// RestaurantList.propTypes = propTypes;
export default RestaurantList;
