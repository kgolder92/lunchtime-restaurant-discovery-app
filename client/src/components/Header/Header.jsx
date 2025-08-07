import React from "react";
import styles from "./Header.module.scss";
//search bar

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.leftContainer}>
        <img src="" alt="AllTrails logo" />
        <span>at lunch</span>
      </div>
      <div className={styles.rightContainer}>search bar</div>
    </header>
  );
};

export default Header;
