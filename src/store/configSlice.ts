import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppConfig, AvatarConfig, LanguageConfig } from '../types/config/appConfig';

export const initialState: AppConfig = {
  instanceId: 'default',
  languages: [],
  avatars: [],
};

const configSlice = createSlice({
  name: 'config',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state = { ...initialState };
      return state;
    },
    updateInstanceID: (state, action: PayloadAction<string>) => {
      state.instanceId = action.payload;
    },
    updateLanguages: (state, action: PayloadAction<Array<LanguageConfig>>) => {
      state.languages = action.payload;
    },
    updateAvatars: (state, action: PayloadAction<Array<AvatarConfig>>) => {
      state.avatars = action.payload;
    }
  },
});

export const appConfig = configSlice.actions;

export default configSlice.reducer;
