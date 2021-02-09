import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppConfig, LanguageConfig } from '../types/config/appConfig';

export const initialState: AppConfig = {
  instanceId: 'default',
  languages: [],
};

const configSlice = createSlice({
  name: 'config',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
    updateInstanceID: (state, action: PayloadAction<string>) => {
      state.instanceId = action.payload;
    },
    updateLanguages: (state, action: PayloadAction<Array<LanguageConfig>>) => {
      state.languages = action.payload;
    }
  },
});

export const appConfig = configSlice.actions;

export default configSlice.reducer;
