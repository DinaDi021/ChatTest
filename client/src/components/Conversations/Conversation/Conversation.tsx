import React, { FC } from "react";

import empty_person from "../../../assets/img/empty_person.png";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { IUser } from "../../../interfaces";
import { usersActions } from "../../../redux";
import styles from "./Conversation.module.scss";

interface IProps {
  user: IUser;
}

const Conversation: FC<IProps> = ({ user }) => {
  // const { id, messages, participants } = conversation;
  const { selectedUserChat } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

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
          <span className={styles.conversation__avatar__dot}></span>
          <img
            className={styles.conversation__avatar}
            src={empty_person}
            alt={user.id}
          />
        </div>

        <div className={styles.conversation__info}>
          <p>
            {user.firstName} {user.lastName}
          </p>
          <span>last message</span>
        </div>
      </div>
    </>
  );
};

export { Conversation };
