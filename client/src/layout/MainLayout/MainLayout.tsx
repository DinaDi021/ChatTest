import React from "react";
import { Outlet } from "react-router-dom";

import { Footer, Header } from "../../components";

const MainLayout = () => {
  return (
    <>
      <>
        <Header />
      </>
      <div>
        <Outlet />
      </div>
      <>
        <Footer />
      </>
    </>
  );
};

export { MainLayout };
