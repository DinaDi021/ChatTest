import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isRejected,
} from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { IAuth, IUser, IUserResponse } from "../../interfaces";
import { authService } from "../../services";

interface IState {
  error: {
    email?: string[];
    message?: string;
  };
  me: IUser;
}

const initialState: IState = {
  error: null,
  me: null,
};

const register = createAsyncThunk<void, { user: IAuth }>(
  "authSlice/register",
  async ({ user }, { rejectWithValue }) => {
    try {
      await authService.register(user);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const login = createAsyncThunk<IUserResponse, { user: IAuth }>(
  "authSlice/login",
  async ({ user }, { rejectWithValue }) => {
    try {
      return await authService.login(user);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const me = createAsyncThunk<IUser, void>(
  "authSlice/me",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await authService.me();
      return data;
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const logout = createAsyncThunk<void, void>(
  "authSlice/logout",
  async (_, { dispatch }) => {
    await authService.logout();
    dispatch(authActions.resetUser());
  },
);

const logoutAll = createAsyncThunk<void, void>(
  "authSlice/logoutAll",
  async (_, { dispatch }) => {
    await authService.logoutAll();
    dispatch(authActions.resetUser());
  },
);

const forgotPassword = createAsyncThunk<void, { email: string }>(
  "authSlice/forgotPassword",
  async ({ email }, { rejectWithValue }) => {
    try {
      await authService.forgotPassword(email);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const setForgotPassword = createAsyncThunk<
  void,
  { actionToken: string; newPassword: string }
>(
  "authSlice/setForgotPassword",
  async ({ actionToken, newPassword }, { rejectWithValue }) => {
    try {
      await authService.setForgotPassword(actionToken, newPassword);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const activateEmail = createAsyncThunk<void, { actionToken: string }>(
  "authSlice/activateEmail",
  async ({ actionToken }, { rejectWithValue }) => {
    try {
      await authService.activateEmail(actionToken);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const changePassword = createAsyncThunk<
  void,
  { token: string; oldPassword: string; newPassword: string }
>(
  "authSlice/changePassword",
  async ({ token, oldPassword, newPassword }, { rejectWithValue }) => {
    try {
      await authService.changePassword(token, oldPassword, newPassword);
    } catch (e) {
      const err = e as AxiosError;
      return rejectWithValue(err.response.data);
    }
  },
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.me = null;
    },
    setLoggedInUser: (state, action) => {
      state.me = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.me = action.payload.data;
      })
      .addCase(me.fulfilled, (state, action) => {
        state.me = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.me = null;
      })
      .addCase(logoutAll.fulfilled, (state) => {
        state.me = null;
      })
      .addMatcher(isRejected(), (state, action) => {
        state.error = action.payload;
      })
      .addMatcher(isFulfilled(), (state) => {
        state.error = null;
      }),
});

const { reducer: authReducer, actions } = authSlice;

const authActions = {
  ...actions,
  register,
  login,
  me,
  logoutAll,
  logout,
  forgotPassword,
  setForgotPassword,
  activateEmail,
  changePassword,
};

export { authActions, authReducer };
