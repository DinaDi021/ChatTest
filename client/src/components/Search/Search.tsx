import SearchIcon from "@mui/icons-material/Search";
import React, { FC } from "react";

import styles from "./Search.module.scss";

const Search: FC = () => {
  return (
    <div className={styles.search__container}>
      <form className={styles.search__form}>
        <input
          className={styles.search__form__input}
          type="text"
          placeholder="Search…"
          // value={search}
          // onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className={styles.search__form__button}>
          <SearchIcon />
        </button>
      </form>
    </div>
  );
};

export { Search };
