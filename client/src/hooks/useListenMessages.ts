import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import { messagesActions } from "../redux";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, message } = useAppSelector((state) => state.messages);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleNewMessage = (newMessage: FormData) => {
      dispatch(messagesActions.setMessages([...messages, newMessage]));
    };

    const handleDeletedMessage = (delMessage: string) => {
      dispatch(messagesActions.resetMessages(delMessage));
    };

    socket?.on("newMessage", handleNewMessage);
    socket?.on("deletedMessage", handleDeletedMessage);

    return () => {
      socket?.off("newMessage", handleNewMessage);
      socket?.off("deletedMessage", handleDeletedMessage);
    };
  }, [socket, messages, dispatch, message]);
};
export { useListenMessages };
