import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { IUpdateProfileParams, IUser, IUserResponse } from "../../interfaces";
import { usersService } from "../../services";
import { progressActions } from "./progressSlice";

interface IState {
  me: IUser | null;
}

const initialState: IState = {
  me: null,
};

const updateUserById = createAsyncThunk<
  IUserResponse,
  { id: number; params: IUpdateProfileParams }
>(
  "usersSlice/updateUserById",
  async ({ id, params }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const { data } = await usersService.updateProfile(id, params);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const deleteUserById = createAsyncThunk<void, { id: number }>(
  "usersSlice/deleteUserById",
  async ({ id }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      await usersService.deleteProfile(id);
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
  reducers: {},
  extraReducers: (build) =>
    build
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.me = action.payload.data;
      })
      .addCase(deleteUserById.fulfilled, (state) => {
        state.me = null;
      }),
});

const { reducer: usersReducer, actions } = usersSlice;

const usersActions = {
  ...actions,
  updateUserById,
  deleteUserById,
};
export { usersActions, usersReducer };
