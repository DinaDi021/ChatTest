import React, { FC } from "react";

import empty from "../../../assets/img/empty_person.png";
import { useSocketContext } from "../../../context/SocketContext";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IUser } from "../../../interfaces";
import { usersActions } from "../../../redux";
import { getAvatarUrl } from "../../../utils/getImagePath";
import styles from "./Conversation.module.scss";

interface IProps {
  user: IUser;
}

const Conversation: FC<IProps> = ({ user }) => {
  const { selectedUserChat } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const { onlineUsersId } = useSocketContext();
  const isOnline = onlineUsersId.includes(user.id);
  const userAvatar = user.avatar;
  const selectUserChat = () => {
    dispatch(usersActions.selectedChatWithUser(user));
  };

  const isSelected = selectedUserChat?.id === user.id;
  return (
    <>
      <div
        className={`${styles.conversation__container} ${isSelected ? styles.conversation__selected : ""}`}
        onClick={selectUserChat}
      >
        <div className={styles.conversation__avatarContainer}>
          {isOnline && (
            <span className={styles.conversation__avatar__dot}></span>
          )}
          <img
            className={styles.conversation__avatar}
            src={userAvatar ? getAvatarUrl(userAvatar) : empty}
            alt={user.id}
          />
        </div>

        <div className={styles.conversation__info}>
          <p>
            {user.firstName} {user.lastName}
          </p>
        </div>
      </div>
    </>
  );
};

export { Conversation };
