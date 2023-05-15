import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: null
}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.name = action.payload
    },
    logoutCurrentUser: (state) => {
      state.name = null
    }
  }
})

export const { setCurrentUser, logoutCurrentUser } = currentUserSlice.actions

export default currentUserSlice.reducer