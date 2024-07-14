import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import {
  IUpdateProfileParams,
  IUser,
  IUserResponse,
  IUsersResponse,
} from "../../interfaces";
import { usersService } from "../../services";
import { authActions } from "./authSlice";
import { progressActions } from "./progressSlice";

interface IState {
  me: IUser | null;
  users: IUser[];
  selectedUserChat: IUser | null;
}

const initialState: IState = {
  me: null,
  users: [],
  selectedUserChat: null,
};

const getUsers = createAsyncThunk<IUsersResponse>(
  "usersSlice/getUsers",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const response = await usersService.getUsers();
      const { data } = response.data;
      return {
        data,
      };
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const addAvatar = createAsyncThunk<
  IUserResponse,
  { id: string; data: FormData }
>(
  "usersSlice/addAvatar",
  async ({ id, data }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const response = await usersService.postAvatar(id, data);
      dispatch(authActions.setLoggedInUser(response.data.data));
      return response.data;
    } catch (err) {
      const e = err as AxiosError;
      return rejectWithValue(e.response?.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const updateUserById = createAsyncThunk<
  IUserResponse,
  { id: string; params: IUpdateProfileParams }
>(
  "usersSlice/updateUserById",
  async ({ id, params }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const { data } = await usersService.updateProfile(id, params);
      dispatch(authActions.setLoggedInUser(data.data));
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const deleteUserById = createAsyncThunk<void, { id: string }>(
  "usersSlice/deleteUserById",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      await usersService.deleteProfile(id);
      dispatch(authActions.resetUser());
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const deleteAvatar = createAsyncThunk<void, { id: string }>(
  "usersSlice/deleteAvatar",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      await usersService.deleteAvatar(id);
      dispatch(authActions.setLoggedInUser({ avatar: null }));
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    updateAuthUser: (state, action) => {
      state.me = action.payload;
    },
    resetChangeInUser: (state) => {
      state.me = null;
    },
    selectedChatWithUser: (state, action) => {
      state.selectedUserChat = action.payload;
    },
    resetSelectedChatWithUser: (state) => {
      state.selectedUserChat = null;
    },
  },
  extraReducers: (build) =>
    build
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload.data;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.me = action.payload.data;
      })
      .addCase(deleteUserById.fulfilled, (state) => {
        state.me = null;
      })
      .addCase(addAvatar.fulfilled, (state, action) => {
        state.me = action.payload.data;
      }),
});

const { reducer: usersReducer, actions } = usersSlice;

const usersActions = {
  ...actions,
  getUsers,
  addAvatar,
  updateUserById,
  deleteUserById,
  deleteAvatar,
};
export { usersActions, usersReducer };
