import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import { INewMessage } from "../interfaces/messageInterface";
import { messagesActions } from "../redux";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages } = useAppSelector((state) => state.messages);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleNewMessage = (newMessage: INewMessage) => {
      dispatch(messagesActions.setMessages([...messages, newMessage]));
    };

    socket?.on("newMessage", handleNewMessage);

    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [socket, messages, dispatch]);
};
export { useListenMessages };
