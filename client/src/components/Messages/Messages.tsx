import React, { FC, useEffect, useRef } from "react";

import { useAppSelector, useGetMessages, useListenMessages } from "../../hooks";
import { MessageInfo } from "./MessageInfo";
import styles from "./MessageInfo/MessageInfo.module.scss";
import { SkeletonMessages } from "./SkeletonMessages/SkeletonMessages";

const Messages: FC = () => {
  const { isLoading } = useAppSelector((state) => state.progress);
  const { messages } = useGetMessages();
  useListenMessages();

  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "auto", block: "end" });
    }
  }, [messages]);

  return (
    <>
      {isLoading ? (
        [...Array(3)].map((_, idx) => <SkeletonMessages key={idx} />)
      ) : messages.length > 0 ? (
        messages.map((messageInfo, index) => (
          <div
            key={messageInfo.id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <MessageInfo messageInfo={messageInfo} />
          </div>
        ))
      ) : (
        <div className={styles.message__startConversation}>
          <h3 className={styles.message__startConversation__title}>
            Send a message to start the conversation
          </h3>
        </div>
      )}
    </>
  );
};

export { Messages };
