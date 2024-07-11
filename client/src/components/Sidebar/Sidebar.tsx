import ForumIcon from "@mui/icons-material/Forum";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useToggle } from "../../hooks";
import { authActions } from "../../redux";
import { Account } from "../Account";
import { Conversations } from "../Conversations";
import { Search } from "../Search";
import styles from "./Sidebar.module.scss";

const Sidebar: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchError, setSearchError] = useState<string | null>(null);

  const { value: showPersonalAccount, change: togglePersonalAccount } =
    useToggle(false);

  const logOut = async () => {
    const {
      meta: { requestStatus },
    } = await dispatch(authActions.logout());
    if (requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  return (
    <div className={styles.sidebar__container}>
      {showPersonalAccount ? (
        <Account />
      ) : (
        <>
          <Search onError={setSearchError} />
          {searchError ? (
            <div className={styles.sidebar__searchError}>
              <h4>{searchError}</h4>
            </div>
          ) : (
            <Conversations />
          )}
        </>
      )}

      <div className={styles.sidebar__actionButton}>
        <div className={styles.sidebar__toggle}>
          <button onClick={togglePersonalAccount}>
            {showPersonalAccount ? <ForumIcon /> : <PersonRoundedIcon />}
          </button>
        </div>
        <button onClick={logOut}>
          <LogoutIcon />
        </button>
      </div>
    </div>
  );
};

export { Sidebar };
