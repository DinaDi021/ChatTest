import DescriptionIcon from "@mui/icons-material/Description";
import React, { FC } from "react";

import empty from "../../../assets/img/empty_person.png";
import { useAppSelector } from "../../../hooks";
import { IMessage } from "../../../interfaces/messageInterface";
import { getUrl } from "../../../utils/getImagePath";
import styles from "./MessageInfo.module.scss";

interface IProps {
  messageInfo: IMessage;
}

const MessageInfo: FC<IProps> = ({ messageInfo }) => {
  const { me } = useAppSelector((state) => state.auth);
  const { message, createdAt, senderId, files } = messageInfo;
  const userAvatar = me.avatar;
  const fromMe = senderId === me.id;

  let formattedDate: string | null = null;
  let formattedTime: string | null = null;

  if (createdAt) {
    const createdAtDate = new Date(createdAt._seconds * 1000);

    formattedTime = createdAtDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });

    formattedDate = createdAtDate.toLocaleDateString("en-US");
  }

  return (
    <div
      className={`${styles.message__container} ${fromMe ? styles.message__container__fromMe : styles.message__container__fromOther}`}
    >
      <div
        className={`${styles.message__avatarContainer} ${fromMe ? styles.message__avatarContainer__fromMe : styles.message__avatarContainer__fromOther}`}
      >
        <img
          alt="{senderId}"
          src={userAvatar ? getUrl(userAvatar) : empty}
          className={styles.message__avatar}
        />
      </div>
      <div
        className={`${styles.message__content} ${fromMe ? styles.message__content__fromMe : styles.message__content__fromOther}`}
      >
        {files && (
          <div className={styles.message__content__files}>
            {files.map((file, index) => (
              <a key={index} href={getUrl(file)} target="_blank">
                <DescriptionIcon />
              </a>
            ))}
          </div>
        )}
        <div className={styles.message__content__text}>
          <p>{message}</p>
        </div>
        <div className={styles.message__content__time}>
          {createdAt ? `${formattedDate} ${formattedTime}` : "now"}
        </div>
      </div>
    </div>
  );
};

export { MessageInfo };
