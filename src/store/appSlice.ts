import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from '../api/types/user';

export interface AuthInfo {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface AppState {
  instanceId: string;
  persistState: boolean;
  auth?: AuthInfo;
  surveyMode: {
    active: boolean;
    profile?: Profile;
  };
}

export const initialState: AppState = {
  instanceId: process.env.REACT_APP_DEFAULT_INSTANCE ? process.env.REACT_APP_DEFAULT_INSTANCE : 'default',
  persistState: false,
  auth: undefined,
  surveyMode: {
    active: false,
  }
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
    setAppAuth: (state, action: PayloadAction<AuthInfo>) => {
      state.auth = action.payload;
    },
    openSurveyMode: (state, action: PayloadAction<Profile>) => {
      state.surveyMode = {
        active: true,
        profile: action.payload
      }
    },
    closeSurveyMode: (state) => {
      state.surveyMode = {
        active: false
      }
    }
  },
});

export const {
  setPersistState,
  setAppAuth,
  reset,
  closeSurveyMode,
  openSurveyMode,
} = appSlice.actions;

export default appSlice.reducer;
