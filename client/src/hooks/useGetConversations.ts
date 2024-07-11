import { useEffect } from "react";

import { usersActions } from "../redux";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

const useGetConversations = () => {
  const { users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(usersActions.getUsers());
  }, []);

  return { users };
};
export { useGetConversations };
