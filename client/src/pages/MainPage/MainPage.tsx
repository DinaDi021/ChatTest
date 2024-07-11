import React, { FC } from "react";

import { MessageContainer, Sidebar } from "../../components";
import { useAppSelector } from "../../hooks";
import styles from "../pages.module.scss";

const MainPage: FC = () => {
  const { me } = useAppSelector((state) => state.auth);

  if (!me) {
    return <div>You have to be auth</div>;
  }

  return (
    <div className={styles.chat__page}>
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export { MainPage };
