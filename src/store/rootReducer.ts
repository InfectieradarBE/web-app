import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import configSlice from './configSlice';
import dialogSlice from './dialogSlice';
import userSlice from './userSlice';

const rootReducer = combineReducers({
  dialog: dialogSlice,
  app: appSlice,
  config: configSlice,
  user: userSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
