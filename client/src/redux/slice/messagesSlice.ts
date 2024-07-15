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
  editingMessage: IMessage | null;
  error: {
    email?: string[];
    message?: string;
  };
}

const initialState: IState = {
  messages: [],
  message: null,
  editingMessage: null,
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

const updateMessage = createAsyncThunk<
  IMessageData,
  { conversationId: string; messageId: string; formData: FormData }
>(
  "messagesSlice/updateMessage",
  async ({ conversationId, messageId, formData }, { rejectWithValue }) => {
    try {
      const { data } = await messagesService.updateMessage(
        conversationId,
        messageId,
        formData,
      );
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const deleteMessage = createAsyncThunk<
  void,
  { conversationId: string; messageId: string }
>(
  "messagesSlice/deleteMessage",
  async ({ conversationId, messageId }, { rejectWithValue }) => {
    try {
      await messagesService.deleteMessage(conversationId, messageId);
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
    resetMessages: (state, action) => {
      state.messages = state.messages.filter(
        (message) => message.id !== action.payload,
      );
    },
    setUpdateMessage: (state, action) => {
      state.messages = state.messages.map((message) =>
        message.id === action.payload.id ? action.payload : message,
      );
    },
    setEditingMessage: (state, action) => {
      state.editingMessage = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (build) =>
    build
      .addCase(getMessagesById.fulfilled, (state, action) => {
        state.messages = action.payload.data;
      })
      .addCase(sendMessageById.fulfilled, (state, action) => {
        state.messages.push(action.payload.data);
      })
      .addCase(updateMessage.fulfilled, (state, action) => {
        state.messages = state.messages.map((message) =>
          message.id === action.payload.data.id ? action.payload.data : message,
        );
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(
          (message) => message.id !== action.meta.arg.messageId,
        );
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
  updateMessage,
  deleteMessage,
};
export { messagesActions, messagesReducer };
