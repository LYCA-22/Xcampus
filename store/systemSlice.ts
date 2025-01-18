// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isLoading: boolean;
}

const initialState: UserState = {
  isLoading: true,
};

export const systemSlice = createSlice({
  name: "systemStatus", // slice 的名稱
  initialState, // 初始狀態
  reducers: {
    updateStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { updateStatus } = systemSlice.actions;
