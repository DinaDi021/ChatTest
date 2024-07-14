import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isRejected,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import {
  IMessage,
  IMessageData,
  IMessageResponse,
} from "../../interfaces/messageInterface";
import { messagesService } from "../../services/messagesService";
import { progressActions } from "./progressSlice";

interface IState {
  messages: IMessage[];
  message: IMessageData;
  error: {
    email?: string[];
    message?: string;
  };
}

const initialState: IState = {
  messages: [],
  message: null,
  error: null,
};

const getMessagesById = createAsyncThunk<
  IMessageResponse,
  { receiverId: string }
>(
  "messagesSlice/getMessagesById",
  async ({ receiverId }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(progressActions.setIsLoading(true));
      const { data } = await messagesService.getMessagesById(receiverId);
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    } finally {
      dispatch(progressActions.setIsLoading(false));
    }
  },
);

const sendMessageById = createAsyncThunk<
  IMessageData,
  { receiverId: string; formData: FormData }
>(
  "messagesSlice/sendMessageById",
  async ({ receiverId, formData }, { rejectWithValue }) => {
    try {
      const { data } = await messagesService.sendMessageById(
        receiverId,
        formData,
      );
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const messagesSlice = createSlice({
  name: "messagesSlice",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
  extraReducers: (build) =>
    build
      .addCase(getMessagesById.fulfilled, (state, action) => {
        state.messages = action.payload.data;
      })
      .addCase(sendMessageById.fulfilled, (state, action) => {
        state.message = action.payload;
        state.messages.push(action.payload.data);
      })
      .addMatcher(isRejected(), (state, action) => {
        state.error = action.payload;
      })
      .addMatcher(isFulfilled(), (state) => {
        state.error = null;
      }),
});

const { reducer: messagesReducer, actions } = messagesSlice;

const messagesActions = {
  ...actions,
  getMessagesById,
  sendMessageById,
};
export { messagesActions, messagesReducer };
