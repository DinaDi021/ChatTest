import React from "react";
import { Outlet } from "react-router-dom";

import { Footer, Header } from "../../components";
import styles from "./MainLayout.module.scss";

const MainLayout = () => {
  return (
    <div className={styles.layout__container}>
      <>
        <Header />
      </>
      <div className={styles.layout__outlet}>
        <Outlet />
      </div>
      <>
        <Footer />
      </>
    </div>
  );
};

export { MainLayout };
