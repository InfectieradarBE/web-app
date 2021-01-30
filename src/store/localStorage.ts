import { RootState } from "./rootReducer";
import { initialState as appState } from './appSlice';
import { initialState as dialogState } from './dialogSlice';
import { initialState as userState } from './userSlice';


import merge from 'lodash.merge';
import clonedeep from 'lodash.clonedeep';

const stateKey = 'state';

export const loadState = (): RootState => {
  let initialRootState: RootState = {
    app: clonedeep(appState),
    dialog: clonedeep(dialogState),
    user: clonedeep(userState),
  };
  try {
    const serializedState = localStorage.getItem(stateKey);
    if (serializedState === null) {
      return initialRootState;
    }
    const loadedState = JSON.parse(serializedState);
    initialRootState = merge(initialRootState, loadedState);
    // Object.assign(initialRootState, loadedState);
    return initialRootState;
  } catch (err) {
    console.log(err);
    return initialRootState;
  }
};

export const saveState = (state: RootState) => {
  try {
    if (state.app.persistState) {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(stateKey, serializedState);
    }
    else {
      localStorage.removeItem(stateKey);
    }
  } catch {
    // ignore write errors
  }
};

export const removePersistedState = () => {
  try {
    localStorage.removeItem(stateKey);
  } catch (error) {
    console.error(error);
  }
}
