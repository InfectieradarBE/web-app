import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  instanceId: string;
  persistState: boolean;
}

export const initialState: AppState = {
  instanceId: process.env.REACT_APP_DEFAULT_INSTANCE ? process.env.REACT_APP_DEFAULT_INSTANCE : 'default',
  persistState: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
      return state;
    },
    setPersistState: (state, action: PayloadAction<boolean>) => {
      state.persistState = action.payload;
    },
  },
});

export const { setPersistState } = appSlice.actions;

export default appSlice.reducer;
