import React from "react";
import { Link } from "react-router-dom";

import { ResetPasswordForm } from "../../components";
import styles from "../pages.module.scss";

const ResetPasswordPage = () => {
  return (
    <div className={styles.auth__page}>
      <div className={styles.auth__container}>
        <div className={styles.auth__page__title}>
          <h3>Manage your records from your personal account</h3>
        </div>
        <div className={styles.auth__page__form}>
          <h4>Recover Password</h4>
          <ResetPasswordForm />
          <h5>Already have an account?</h5>
          <h5>
            <Link to={`/login`}>Log in</Link>
          </h5>
        </div>
      </div>
    </div>
  );
};

export { ResetPasswordPage };
