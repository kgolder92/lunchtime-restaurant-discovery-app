import React from "react";
import styles from "./RestaurantItem.module.scss";
import PropTypes from "prop-types";

const RestaurantItem = ({ restaurant, isSelected, variant = "list" }) => {
  const photo_reference = restaurant.photos?.length
    ? restaurant.photos[0].name
    : null;

  console.log("restaurant.photo_referenc", photo_reference);

  const imageUrl = photo_reference
    ? `/photos/${encodeURIComponent(photo_reference)}`
    : "TODO PLACEHODLER";

  const itemClassNames = [
    styles.item,
    isSelected && variant === "list" ? styles.item__selected : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={itemClassNames}>
      <img
        src={imageUrl}
        alt={restaurant.displayName?.text || "Restaurant"}
        className={styles.item__thumbnail}
      />
      <div className={styles.item__info}>
        <h3 className={styles.item__name}>{restaurant.displayName?.text}</h3>
        <div className={styles.item__ratingInfoContainer}>
          <img
            src="/assets/star.svg"
            alt="star rating icon"
            className={styles.item__ratingIcon}
          />{" "}
          {restaurant.rating ?? "N/A"} ({restaurant.userRatingCount ?? 0}{" "}
          reviews)
        </div>
        <span>Supporting text</span>
      </div>

      <button className={styles.item_bookmark}>
        <img src="/assets/bookmark-resting.svg" alt="book mark icon" />
      </button>
    </div>
  );
};

RestaurantItem.propTypes = {
  restaurant: PropTypes.object.isRequired,
  variant: PropTypes.oneOf(["list", "mapPopup"]),
};

export default RestaurantItem;
