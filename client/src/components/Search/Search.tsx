import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import React, { FC, useState } from "react";

import { useAppDispatch, useGetConversations } from "../../hooks";
import { usersActions } from "../../redux";
import styles from "./Search.module.scss";

interface IProps {
  onError: (error: string) => void;
}

const Search: FC<IProps> = ({ onError }) => {
  const [search, setSearch] = useState<string>("");
  const { users } = useGetConversations();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      onError(null);
      if (!search) throw new Error("Search term cannot be empty");
      if (search.length < 3)
        throw new Error("Search term must be at least 3 characters long");

      const conversation = users.find(
        (c) =>
          c.firstName.toLowerCase().includes(search.toLowerCase()) ||
          c.lastName.toLowerCase().includes(search.toLowerCase()),
      );

      console.log(conversation);

      if (conversation) {
        dispatch(usersActions.selectedChatWithUser(conversation));
        setSearch("");
      } else throw new Error("No such user found!");
    } catch (err: any) {
      onError(err.message);
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    onError(null);
  };

  return (
    <div className={styles.search__container}>
      <form onSubmit={handleSubmit} className={styles.search__form}>
        <input
          className={styles.search__form__input}
          type="text"
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            type="button"
            style={{
              position: "absolute",
              background: "transparent",
              color: "lightslategrey",
              right: "50px",
              boxShadow: "none",
            }}
            onClick={handleClearSearch}
          >
            <CloseIcon />
          </button>
        )}
        <button type="submit" className={styles.search__form__button}>
          <SearchIcon />
        </button>
      </form>
    </div>
  );
};

export { Search };
