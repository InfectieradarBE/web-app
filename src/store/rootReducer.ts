import { combineReducers } from '@reduxjs/toolkit';
import dialogSlice from './dialogSlice';

const rootReducer = combineReducers({
  dialog: dialogSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
