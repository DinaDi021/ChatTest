import ForumIcon from "@mui/icons-material/Forum";
import React, { FC } from "react";

import { useAppSelector } from "../../../hooks";
import styles from "./MessageInfo.module.scss";

const NoChatSelected: FC = () => {
  const { me } = useAppSelector((state) => state.auth);
  return (
    <div className={styles.noChat__container}>
      <h2>Welcome 👋 {me.firstName}</h2>
      <h4>Select a chat to start messaging</h4>
      <ForumIcon />
    </div>
  );
};

export { NoChatSelected };
