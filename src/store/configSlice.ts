import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppConfig } from '../types/config/appConfig';

export const initialState: AppConfig = {
  instanceId: 'default',
};

const configSlice = createSlice({
  name: 'config',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
    update: (state, action: PayloadAction<AppConfig>) => {
      state = action.payload;
    },
  },
});

export const appConfig = configSlice.actions;

export default configSlice.reducer;
