import React from "react";
import styles from "./Header.module.scss";

const Header = ({ children }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__leftContainer}>
        <img src="/assets/logo.svg" alt="AllTrails logo" />
      </div>
      <div className={styles.header__rightContainer}>{children}</div>
    </header>
  );
};

export default Header;
