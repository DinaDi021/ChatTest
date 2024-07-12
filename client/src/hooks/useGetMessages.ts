import { useEffect } from "react";

import { messagesActions } from "../redux";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

const useGetMessages = () => {
  const { selectedUserChat } = useAppSelector((state) => state.users);
  const { messages } = useAppSelector((state) => state.messages);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedUserChat?.id) {
      dispatch(
        messagesActions.getMessagesById({ receiverId: selectedUserChat.id }),
      );
    }
  }, [dispatch, selectedUserChat]);

  return { messages, dispatch };
};
export { useGetMessages };
