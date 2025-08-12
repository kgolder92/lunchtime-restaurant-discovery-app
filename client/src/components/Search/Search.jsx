import React, { useState } from "react";
import styles from "./Search.module.scss";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const triggerSearch = () => {
    onSearch(query.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") triggerSearch();
  };

  return (
    <div className={styles.search}>
      <button
        type="button"
        onClick={triggerSearch}
        className={styles.search__iconBtn}
      >
        <img src="/assets/search.svg" alt="search icon" />
      </button>
      <input
        type="text"
        placeholder="Search restaurants"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles.search__input}
      />
    </div>
  );
};

export default Search;
