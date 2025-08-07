import React from "react";
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

const RestaurantList = ({ restaurants, loading }) => {
  if (loading)
    return <div className={styles.message}>Loading restaurants...</div>;
  if (!restaurants.length)
    return <div className={styles.message}>No restaurants found.</div>;
  console.log(restaurants, "RESYS");
  return (
    <ul className={styles.list}>
      {restaurants.map((r) => (
        <li key={r.id}>
          <RestaurantItem restaurant={r} />
        </li>
      ))}
    </ul>
  );
};

// RestaurantList.propTypes = propTypes;
export default RestaurantList;
