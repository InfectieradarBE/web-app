import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, ContactPreferences } from '../api/types/user';
import { TokenResponse } from '../api/types/authAPI';


export interface UserState {
  currentUser: User,
  selectedProfileId: string,
}

export const initialState: UserState = {
  currentUser: {
    id: '',
    account: {
      type: '',
      accountId: '',
      accountConfirmedAt: 0,
      preferredLanguage: '',
    },
    roles: [],
    timestamps: {
      createdAt: 0,
      updatedAt: 0,
      lastLogin: 0,
      lastTokenRefresh: 0,
    },
    profiles: [],
    contactPreferences: {
      subscribedToNewsletter: false,
      sendNewsletterTo: [],
      subscribedToWeekly: true,
      receiveWeeklyMessageDayOfWeek: -1,
    } as ContactPreferences,
    contactInfos: [],
  } as User,
  selectedProfileId: "",
} as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state = { ...initialState };
      return state;
    },
    initializeLanguage: (state, action: PayloadAction<string>) => {
      if (state.currentUser.account.preferredLanguage === '') {
        state.currentUser.account.preferredLanguage = action.payload;
        return state;
      } else {
        return state;
      }
    },
    setState: (state, action: PayloadAction<UserState>) => {
      state = action.payload
    },
    setFromTokenResponse: (state, action: PayloadAction<TokenResponse>) => {
      state.currentUser.profiles = action.payload.profiles;
      state.currentUser.account.preferredLanguage = action.payload.preferredLanguage;
      state.selectedProfileId = action.payload.selectedProfileId;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    setUserID: (state, action: PayloadAction<string>) => {
      state.currentUser.account.accountId = action.payload;
    },
    setPreferredLanguage: (state, action: PayloadAction<string>) => {
      state.currentUser.account.preferredLanguage = action.payload;
    },
    setSelectedProfileID: (state, action: PayloadAction<string>) => {
      state.selectedProfileId = action.payload;
    }
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
