import { createSlice } from "@reduxjs/toolkit"

type UserSliceType = {
  currentUser: object | null
  error: Error | null
  loading: boolean
}

const initialState: UserSliceType = {
  currentUser: {},
  error: null,
  loading: false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: state => {
      state.loading = true
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
    },
    signInFailure: (state, action) => {
      state.error = action.payload as Error
      state.loading = false
    },
  },
})

export const {actions: userActions, reducer: userReducer } = userSlice
