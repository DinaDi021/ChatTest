import AttachFileIcon from "@mui/icons-material/AttachFile";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import SendIcon from "@mui/icons-material/Send";
import React, { FC, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { messagesActions } from "../../redux";
import { NoChatSelected } from "./MessageInfo";
import styles from "./MessageInfo/MessageInfo.module.scss";
import { Messages } from "./Messages";

const MessageContainer: FC = () => {
  const { selectedUserChat } = useAppSelector((state) => state.users);
  const { error, editingMessage, isChatOpen } = useAppSelector(
    (state) => state.messages,
  );
  const dispatch = useAppDispatch();
  const [messageText, setMessageText] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  useEffect(() => {
    if (editingMessage) {
      setMessageText(editingMessage.messageText);
    }
  }, [editingMessage]);

  useEffect(() => {
    if (selectedUserChat && window.innerWidth <= 650) {
      dispatch(messagesActions.chahgeIsChatOpen());
    }
  }, [selectedUserChat]);

  const resetError = () => {
    if (error) {
      dispatch(messagesActions.resetError());
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!messageText && !selectedFiles) {
      return;
    }

    const formData = new FormData();
    formData.append("messageText", messageText);
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("files", selectedFiles[i]);
      }
    }

    if (selectedUserChat) {
      if (editingMessage) {
        await dispatch(
          messagesActions.updateMessage({
            conversationId: editingMessage.conversationId,
            messageId: editingMessage.id,
            formData,
          }),
        );
        dispatch(messagesActions.setEditingMessage(null));
      } else {
        await dispatch(
          messagesActions.sendMessageById({
            receiverId: selectedUserChat.id,
            formData,
          }),
        );
      }
      setMessageText("");
      setSelectedFiles(null);
    }
  };

  const toggleChat = () => {
    dispatch(messagesActions.chahgeIsChatOpen());
  };

  return (
    <>
      {!selectedUserChat ? (
        <NoChatSelected />
      ) : (
        <div
          className={`${styles.message__page} ${isChatOpen ? styles.open : styles.close}`}
        >
          <div className={styles.message__page__header}>
            <span>To:</span>
            <span className={styles.message__page__nameFor}>
              {selectedUserChat.firstName} {selectedUserChat.lastName}
            </span>
            <div
              className={` ${styles.message__button__back} ${isChatOpen ? styles.open : styles.close}`}
              onClick={toggleChat}
            >
              <KeyboardBackspaceIcon />
            </div>
          </div>
          <div className={styles.message__page__body}>
            <Messages />
          </div>
          <div className={styles.message__sent}>
            <form onSubmit={handleSubmit}>
              <div className={styles.message__sent__form}>
                <textarea
                  name="messageText"
                  className={styles.message__sent__input}
                  placeholder="Send a message"
                  value={messageText}
                  onChange={(e) => {
                    setMessageText(e.target.value);
                    resetError();
                  }}
                />
                {error && (
                  <p className={styles.message__sent__error}>{error.message}</p>
                )}
                <label className={styles.message__sent__svg}>
                  <AttachFileIcon />
                  <input
                    type={"file"}
                    style={{ display: "none" }}
                    multiple
                    onChange={(e) => {
                      setSelectedFiles(e.target.files);
                      resetError();
                    }}
                  />
                  {selectedFiles && (
                    <span className={styles.fileCount}>
                      {selectedFiles.length}
                    </span>
                  )}
                </label>

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
