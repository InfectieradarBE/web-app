import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { reset as resetAppSlice } from './appSlice'
import { reset as resetDialogSlice } from './dialogSlice'
import { loadState, saveState } from './localStorage'
import throttle from 'lodash.throttle'

import rootReducer from './rootReducer'
import { userActions } from './userSlice'
import { appConfig } from './configSlice'


const middleWare = [...getDefaultMiddleware()];

const store = configureStore({
  reducer: rootReducer,
  middleware: middleWare,
  preloadedState: loadState(),
});

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 2000));


if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch

export default store


export const resetStore = () => {
  // let oldState = store.getState();
  store.dispatch(resetAppSlice());
  store.dispatch(appConfig.reset());
  store.dispatch(resetDialogSlice());
  store.dispatch(userActions.reset());
}
