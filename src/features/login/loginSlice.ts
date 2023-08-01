import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchLogin } from "./loginAPI"

interface LoginFormValues {
  email: string
  password: string
}
export interface LoginState {
  isLoggedIn: boolean
  status: "idle" | "loading" | "failed"
  email: string
}

const initialState: LoginState = {
  isLoggedIn: false,
  status: "idle",
  email: "",
}

export const loginAction = createAsyncThunk(
  "login/fetchLogin",
  async (data: LoginFormValues) => {
    const response = await fetchLogin(data)
    return response
  },
)

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true
      state.status = "idle"
      state.email = action.payload.email
      //
      localStorage.setItem("loginState", JSON.stringify(state))
    },
    logout: (state) => {
      localStorage.removeItem("loginState")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.status = "loading"
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.status = "idle"
        state.isLoggedIn = true
        state.email = action.payload.email
      })
      .addCase(loginAction.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { loginSuccess } = loginSlice.actions

export default loginSlice.reducer
