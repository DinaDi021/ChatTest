import React, { FC } from "react";

import { useAppSelector } from "../../hooks";
import { IsLoading } from "../IsLoading";
import { Conversation } from "./Conversation";
import styles from "./Conversation/Conversation.module.scss";

const Conversations: FC = () => {
  const { isLoading } = useAppSelector((state) => state.progress);
  const conversations = [
    {
      id: "1",
      participants: { senderId: "user1", receiverId: "user2" },
      messages: ["Hello there!"],
      createdAt: Date.now() - 100000,
      updatedAt: Date.now(),
    },
    {
      id: "2",
      participants: { senderId: "user3", receiverId: "user4" },
      messages: ["How are you?"],
      createdAt: Date.now() - 50000,
      updatedAt: Date.now(),
    },
    {
      id: "3",
      participants: { senderId: "user3", receiverId: "user4" },
      messages: ["How are you?"],
      createdAt: Date.now() - 50000,
      updatedAt: Date.now(),
    },
    {
      id: "4",
      participants: { senderId: "user3", receiverId: "user4" },
      messages: ["How are you?"],
      createdAt: Date.now() - 50000,
      updatedAt: Date.now(),
    },
    {
      id: "5",
      participants: { senderId: "user3", receiverId: "user4" },
      messages: ["How are you?"],
      createdAt: Date.now() - 50000,
      updatedAt: Date.now(),
    },
    {
      id: "6",
      participants: { senderId: "user3", receiverId: "user4" },
      messages: ["How are you?"],
      createdAt: Date.now() - 50000,
      updatedAt: Date.now(),
    },
    {
      id: "27",
      participants: { senderId: "user3", receiverId: "user4" },
      messages: ["How are you?"],
      createdAt: Date.now() - 50000,
      updatedAt: Date.now(),
    },
  ];

  return (
    <div className={styles.conversation}>
      {isLoading ? (
        <IsLoading />
      ) : conversations.length > 0 ? (
        conversations.map((conversation) => (
          <Conversation key={conversation.id} conversation={conversation} />
        ))
      ) : (
        <div>No conversations yet.</div>
      )}
    </div>
  );
};

export { Conversations };
