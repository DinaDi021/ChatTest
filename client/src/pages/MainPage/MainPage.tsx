import React, { FC } from "react";
import { Link } from "react-router-dom";

import { MessageContainer, Sidebar } from "../../components";
import { useAppSelector } from "../../hooks";
import styles from "../pages.module.scss";

const MainPage: FC = () => {
  const { me } = useAppSelector((state) => state.auth);
  if (!me) {
    return (
      <Link to={"/login"}>
        <div className={styles.backTo}>
          <button>You have to be auth</button>
        </div>
      </Link>
    );
  }

  return (
    <div className={styles.chat__page}>
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export { MainPage };
