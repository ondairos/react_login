import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "./authTypes";

const initialState: AuthState = {
  isAuthenticated: false,
  error: null,
  email: null,
  password: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.error = null;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, loginFailure } = authSlice.actions;

export default authSlice.reducer;
