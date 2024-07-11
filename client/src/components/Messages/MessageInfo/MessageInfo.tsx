import React, { FC } from "react";

import empty_person from "../../../assets/img/empty_person.png";
import { useAppSelector } from "../../../hooks";
import { IMessage } from "../../../interfaces/messageInterface";
import styles from "./MessageInfo.module.scss";

interface IProps {
  messageInfo: IMessage;
}

const MessageInfo: FC<IProps> = ({ messageInfo }) => {
  const { me } = useAppSelector((state) => state.auth);
  const { message, createdAt, senderId } = messageInfo;
  const fromMe = senderId === me.id;

  const createdAtDate = createdAt ? new Date(createdAt._seconds * 1000) : null;

  const formattedTime = createdAtDate
    ? createdAtDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      })
    : "Time not available";

  const formattedDate = createdAtDate
    ? createdAtDate.toLocaleDateString("en-US")
    : "Date not available";
  return (
    <div
      className={`${styles.message__container} ${fromMe ? styles.message__container__fromMe : styles.message__container__fromOther}`}
    >
      <div
        className={`${styles.message__avatarContainer} ${fromMe ? styles.message__avatarContainer__fromMe : styles.message__avatarContainer__fromOther}`}
      >
        <img
          alt="{senderId}"
          src={empty_person}
          className={styles.message__avatar}
        />
      </div>
      <div
        className={`${styles.message__content} ${fromMe ? styles.message__content__fromMe : styles.message__content__fromOther}`}
      >
        <div className={styles.message__content__text}>
          <p>{message}</p>
        </div>
        <div className={styles.message__content__time}>
          {formattedDate} {formattedTime}
        </div>
      </div>
    </div>
  );
};

export { MessageInfo };
