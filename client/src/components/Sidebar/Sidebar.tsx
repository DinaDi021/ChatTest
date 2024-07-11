import LogoutIcon from "@mui/icons-material/Logout";
import React, { FC } from "react";

import { Conversations } from "../Conversations";
import { Search } from "../Search";
import styles from "./Sidebar.module.scss";

const Sidebar: FC = () => {
  return (
    <div className={styles.sidebar__container}>
      <Search />
      <Conversations />
      <div className={styles.sidebar__logout}>
        <button>
          <LogoutIcon />
        </button>
      </div>
    </div>
  );
};

export { Sidebar };
