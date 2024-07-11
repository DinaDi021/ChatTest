import React, { FC } from "react";

import empty_person from "../../../assets/img/empty_person.png";
import { IConversation } from "../../../interfaces/conversationInterface";
import styles from "./Conversation.module.scss";

interface IProps {
  conversation: IConversation;
}

const Conversation: FC<IProps> = ({ conversation }) => {
  // const { id, messages, participants } = conversation;
  //   const { selectedConversation, setSelectedConversation } = useConversation();
  return (
    <>
      <div
        className={styles.conversation__container}
        // onClick={() => setSelectedConversation(conversation)}
      >
        <div className={styles.conversation__avatarContainer}>
          <span className={styles.conversation__avatar__dot}></span>
          <img
            className={styles.conversation__avatar}
            src={empty_person}
            alt={conversation.id}
          />
        </div>

        <div className={styles.conversation__info}>
          <p>User name</p>
          <span>last message</span>
        </div>
      </div>
    </>
  );
};

export { Conversation };
