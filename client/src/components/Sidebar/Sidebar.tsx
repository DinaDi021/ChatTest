import LogoutIcon from "@mui/icons-material/Logout";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../hooks";
import { authActions } from "../../redux";
import { Conversations } from "../Conversations";
import { Search } from "../Search";
import styles from "./Sidebar.module.scss";

const Sidebar: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
      <Search />
      <Conversations />
      <div className={styles.sidebar__logout}>
        <button onClick={logOut}>
          <LogoutIcon />
        </button>
      </div>
    </div>
  );
};

export { Sidebar };
