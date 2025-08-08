import React from "react";
import styles from "./Header.module.scss";

const Header = ({ children }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__leftContainer}>
        <img src="" alt="AllTrails logo" />
        <span>at lunch</span>
      </div>
      <div className={styles.header__rightContainer}>{children}</div>
    </header>
  );
};

export default Header;
