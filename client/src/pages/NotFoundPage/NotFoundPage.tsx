import React, { FC } from "react";
import { Link } from "react-router-dom";

import notFoundImage from "../../assets/img/404img.png";
import styles from "../pages.module.scss";

const NotFoundPage: FC = () => {
  return (
    <div className={styles.notFound__page}>
      <img
        src={notFoundImage}
        alt="not found page"
        className={styles.notFound__img}
      />
      <div className={styles.notFound__content}>
        <h4 className={styles.notFound__message}>
          We're sorry, the page you're looking for cannot be found. It might
          have been removed or you may have entered an incorrect URL.
        </h4>
        <Link to={"/main"}>
          <button>Return to main page</button>
        </Link>
      </div>
    </div>
  );
};

export { NotFoundPage };
