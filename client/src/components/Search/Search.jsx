import React, { useState } from "react";
import styles from "./Search.module.scss";

const Search = ({ onSearch }) => {
  const [input, setInput] = useState("");
  return (
    <form
      className={styles.searchForm}
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(input.trim());
      }}
    >
      <input
        className={styles.searchInput}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for restaurants..."
      />
    </form>
  );
};

export default Search;
