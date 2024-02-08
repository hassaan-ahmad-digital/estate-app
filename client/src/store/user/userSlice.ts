import { createSlice } from "@reduxjs/toolkit"
import { RootState } from ".."
import { Document } from "mongoose"

interface CurrentUser extends Document {
  username: string;
  email: string;
  photo: string;
} 

type UserSliceType = {
  currentUser: CurrentUser | null
  error: Error | null
  loading: boolean
}

const initialState: UserSliceType = {
  currentUser: null,
  error: null,
  loading: false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUpStart: state => {
      state.loading = true;
    },
    signUpSuccess: (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.error = null
    },
    signUpFailure: (state, action) => {
      state.error = action.payload as Error
      state.loading = false
    },
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

export const errorSelector = (state:RootState) => state.user.error
export const loadingSelector = (state:RootState) => state.user.loading
export const userSelector = (state:RootState) => state.user.currentUser

export const {actions: userActions, reducer: userReducer } = userSlice
