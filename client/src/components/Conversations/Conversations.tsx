import React, { FC } from "react";

import { useAppSelector, useGetConversations } from "../../hooks";
import { IsLoading } from "../IsLoading";
import { Conversation } from "./Conversation";
import styles from "./Conversation/Conversation.module.scss";

const Conversations: FC = () => {
  const { isLoading } = useAppSelector((state) => state.progress);
  const { users } = useGetConversations();

  return (
    <div className={styles.conversation}>
      {isLoading ? (
        <IsLoading />
      ) : users.length > 0 ? (
        users.map((user) => <Conversation key={user.id} user={user} />)
      ) : (
        <div>No conversations yet.</div>
      )}
    </div>
  );
};

export { Conversations };
