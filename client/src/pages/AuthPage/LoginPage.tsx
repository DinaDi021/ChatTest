import React from "react";
import { Link } from "react-router-dom";

import { LoginForm } from "../../components";
import styles from "../pages.module.scss";

const LoginPage = () => {
  return (
    <div className={styles.auth__page}>
      <div className={styles.auth__container}>
        <div className={styles.auth__page__title}>
          <h3>Manage your records from your personal account</h3>
        </div>
        <div className={styles.auth__page__form}>
          <h4>Hi! Welcome</h4>
          <LoginForm />
          <h5 style={{ marginBottom: "15px" }}>
            <Link to={`/forgotPassword`}>Forgotten your password ?</Link>
          </h5>
          <h5>Don’t have an account ?</h5>
          <h5>
            <Link to={`/register`}>Create an Account</Link>
          </h5>
        </div>
      </div>
    </div>
  );
};

export { LoginPage };
