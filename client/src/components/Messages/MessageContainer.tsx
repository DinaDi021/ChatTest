import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";

import { NoChatSelected } from "./MessageInfo";
import styles from "./MessageInfo/MessageInfo.module.scss";
import { Messages } from "./Messages";

const MessageContainer = () => {
  const [selectedConversation] = useState(true);
  // const [message, setMessage] = useState("");

  return (
    <>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <div className={styles.message__page}>
          <div className={styles.message__page__header}>
            <span>To:</span>
            <span className={styles.message__page__nameFor}>
              {/* {selectedConversation.userName} */}User name
            </span>
          </div>
          <div className={styles.message__page__body}>
            <Messages />
          </div>
          <div className={styles.message__sent}>
            <form>
              <div className={styles.message__sent__form}>
                <textarea
                  className={styles.message__sent__input}
                  placeholder="Send a message"
                />
                <button type="submit" className={styles.message__sent__button}>
                  <SendIcon />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export { MessageContainer };
