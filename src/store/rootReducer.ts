import { combineReducers } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import dialogSlice from './dialogSlice';

const rootReducer = combineReducers({
  dialog: dialogSlice,
  app: appSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
