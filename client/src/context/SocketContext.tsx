import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";

import { useAppSelector } from "../hooks";

interface SocketContextProviderProps {
  children: ReactNode;
}

interface SocketContextValue {
  socket: Socket | null;
  onlineUsersId: string[];
}

const SocketContext = createContext<SocketContextValue>({
  socket: null,
  onlineUsersId: [],
});

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider: FC<SocketContextProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsersId, setOnlineUsers] = useState([]);
  const { me } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (me) {
      if (socket) {
        socket.close();
      }

      const newSocket = io(process.env.REACT_APP_API, {
        query: {
          userId: me.id,
        },
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [me]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsersId }}>
      {children}
    </SocketContext.Provider>
  );
};
