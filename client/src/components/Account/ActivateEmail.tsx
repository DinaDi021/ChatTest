import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { authActions } from "../../redux";
import styles from "./Account.module.scss";

const ActivateEmail = () => {
  const { error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { actionToken } = useParams();

  console.log(actionToken);

  useEffect(() => {
    dispatch(authActions.activateEmail({ actionToken }));
  }, []);

  return (
    <div className={styles.activateEmail__container}>
      <div className={styles.activateEmail__success}>
        <h2>Email Confirmed</h2>
        <p>Your email has been successfully confirmed.</p>
        <Link to="/login">
          <button className={styles.activateEmail__button}>Go to Login</button>
        </Link>
      </div>
      {error && (
        <div className={styles.activateEmail__error}>
          <h2>Error</h2>
          <p>{error.message}</p>
          <Link to="/main">
            <button className={styles.activateEmail__button}>
              Go to Main Page
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export { ActivateEmail };
