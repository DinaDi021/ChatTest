import SendIcon from "@mui/icons-material/Send";
import React, { FormEvent, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { messagesActions, usersActions } from "../../redux";
import { NoChatSelected } from "./MessageInfo";
import styles from "./MessageInfo/MessageInfo.module.scss";
import { Messages } from "./Messages";

const MessageContainer = () => {
  const { selectedUserChat } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    dispatch(usersActions.resetSelectedChatWithUser());
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newMessage) return;
    const payload = {
      message: newMessage,
    };
    await dispatch(
      messagesActions.sendMessageById({
        receiverId: selectedUserChat.id,
        message: payload,
      }),
    );
    setNewMessage("");
  };

  return (
    <>
      {!selectedUserChat ? (
        <NoChatSelected />
      ) : (
        <div className={styles.message__page}>
          <div className={styles.message__page__header}>
            <span>To:</span>
            <span className={styles.message__page__nameFor}>
              {selectedUserChat.firstName} {selectedUserChat.lastName}
            </span>
          </div>
          <div className={styles.message__page__body}>
            <Messages />
          </div>
          <div className={styles.message__sent}>
            <form onSubmit={handleSubmit}>
              <div className={styles.message__sent__form}>
                <textarea
                  name="message"
                  className={styles.message__sent__input}
                  placeholder="Send a message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
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
