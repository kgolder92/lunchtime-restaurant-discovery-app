import React from "react";
import styles from "./RestaurantItem.module.scss";
import PropTypes from "prop-types";

// const propTypes = {
//   restaurant: propTypes.arrayOf(PropTypes.object),
// };
const RestaurantItem = ({ restaurant }) => {
  const photo_reference = restaurant.photos?.length
    ? restaurant.photos[0].name
    : null;
  console.log("restaurant.photo_referenc", photo_reference);

  const imageUrl = photo_reference
    ? `/photos/${encodeURIComponent(photo_reference)}`
    : "TODO PLACEHODLER";

  return (
    <div className={styles.item}>
      <img
        src={imageUrl}
        alt={restaurant.name}
        className={styles.item__thumbnail}
      />
      <div className={styles.item__info}>
        <h3 className={styles.item__name}>{restaurant.displayName.text}</h3>
        <span>
          ⭐ {restaurant.rating} ({restaurant.userRatingCount} reviews)
        </span>
        <span>Supporting text</span>
      </div>
      <div className={styles.item_bookmark}>
        <div>bookmark</div>
      </div>
    </div>
  );
};

// RestaurantItem.propTypes = propTypes;
export default RestaurantItem;
