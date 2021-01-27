import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DialogWithoutPayload {
  type: string;
}

interface LoginDialog {
  type: 'login'
  payload: {
    email: string
    password: string
  }
}

interface DialogState {
  config?: DialogWithoutPayload | LoginDialog
}

let initialState: DialogState = {
  config: undefined
}

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    closeDialog(state) {
      state.config = undefined
    },
    openDialogWithoutPayload(state, action: PayloadAction<string>) {
      state.config = {
        type: action.payload,
      }
    },
    openLoginDialog(state, action: PayloadAction<LoginDialog>) {
      state.config = {
        type: action.payload.type,
        payload: action.payload.payload
      }
    },
  }
})

export const {
  closeDialog,
  openDialogWithoutPayload,
  openLoginDialog,
} = dialogSlice.actions

export default dialogSlice.reducer
