import { RootState } from "./rootReducer";
import { initialState as appState } from './appSlice';
import { initialState as dialogState } from './dialogSlice';
import { initialState as userState } from './userSlice';
import { initialState as configState } from './configSlice';


import merge from 'lodash.merge';
import clonedeep from 'lodash.clonedeep';

const stateKey = 'state';

export const loadState = (): RootState => {
  let initialRootState: RootState = {
    app: clonedeep(appState),
    dialog: clonedeep(dialogState),
    user: clonedeep(userState),
    config: clonedeep(configState)
  };
  try {
    const serializedState = localStorage.getItem(stateKey);
    if (serializedState === null) {
      return initialRootState;
    }
    const loadedState = JSON.parse(serializedState);
    initialRootState = merge(initialRootState, loadedState);
    initialRootState.app.surveyMode = {
      active: false,
    }
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
      const savedState = clonedeep(state);
      savedState.config = clonedeep(configState);
      savedState.dialog = clonedeep(dialogState);

      const serializedState = JSON.stringify(savedState);
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
