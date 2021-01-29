import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthInfo {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface AppState {
  instanceId: string;
  persistState: boolean;
  auth?: AuthInfo;
}

export const initialState: AppState = {
  instanceId: process.env.REACT_APP_DEFAULT_INSTANCE ? process.env.REACT_APP_DEFAULT_INSTANCE : 'default',
  persistState: false,
  auth: undefined
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
    setPersistState: (state, action: PayloadAction<boolean>) => {
      state.persistState = action.payload;
    },
  },
});

export const { setPersistState } = appSlice.actions;

export default appSlice.reducer;
