import React, { FC } from "react";

import empty_person from "../../../assets/img/empty_person.png";
import styles from "./MessageInfo.module.scss";

const MessageInfo: FC = () => {
  return (
    <div className={styles.message__container}>
      <div className={styles.message__avatarContainer}>
        <img alt="sdsd" src={empty_person} className={styles.message__avatar} />
      </div>
      <div className={styles.message__content}>
        <div className={styles.message__content__text}>
          <p>
            message fffffffffffff ffffffffffffffffff fffffffffffffffff
            fffffffffff
          </p>
        </div>
        <div className={styles.message__content__time}>time</div>
      </div>
    </div>
  );
};

export { MessageInfo };
