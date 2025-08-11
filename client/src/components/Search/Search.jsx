import React, { useState } from "react";
import styles from "./Search.module.scss";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const triggerSearch = () => {
    const trimmedQuery = query.trim();
    onSearch(trimmedQuery); // empty string triggers nearby search for now
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      triggerSearch();
    }
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search restaurants"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={styles.search__input}
      />
      <button
        type="button"
        onClick={triggerSearch}
        className={styles.search__button}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
