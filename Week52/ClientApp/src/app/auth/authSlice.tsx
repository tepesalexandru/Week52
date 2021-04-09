import { createSlice } from "@reduxjs/toolkit";

export interface User {
  id: string;
  username: string;
}

export interface IAuthState {
  user: User;
}

const AuthState: IAuthState = {
  user: {
    id: "",
    username: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState: AuthState,
  reducers: {
    setUser: (state, action: { payload: User }) => {
      state.user.id = action.payload.id;
      state.user.username = action.payload.username;
    },
    logout: (state) => {
      state.user.id = "";
      state.user.username = "";
    },
  },
});

export const { setUser, logout } = authSlice.actions;
