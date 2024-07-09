import { configureStore } from "@reduxjs/toolkit";

import { authReducer, progressReducer, usersReducer } from "./slice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    progress: progressReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export type { RootState, AppDispatch };

export { store };
