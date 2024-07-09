import { createSlice } from "@reduxjs/toolkit";

interface IState {
  isLoading: boolean;
}

const initialState: IState = {
  isLoading: false,
};
const progressSlice = createSlice({
  name: "progressSlice",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

const { reducer: progressReducer, actions: progressActions } = progressSlice;

export { progressActions, progressReducer };
