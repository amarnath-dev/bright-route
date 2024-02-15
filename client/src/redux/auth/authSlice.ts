import { createSlice } from "@reduxjs/toolkit";
import {
  signup,
  signin,
  MentorLogin,
  MultiFromApply,
} from "../../services/authServices";
import { changePassword } from "../../services/profileService";
import Cookies from "js-cookie";

export type user = {
  _id: string;
  first_name: string;
  email: string;
  role: string;
};

interface Credentials {
  user: user | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  status: number | null;
}

const initialState: Credentials = {
  user: null,
  isLoading: false,
  isError: true,
  errorMessage: "",
  status: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        Cookies.set("token", action.payload.token, { expires: 3 });
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        const error = action.payload as {
          message: string;
          status: number;
        };
        state.errorMessage = error?.message;
        state.status = error?.status;
      })
      //Signin In
      .addCase(signin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        Cookies.set("token", action.payload.token, { expires: 3 });
      })
      .addCase(signin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        const error = action.payload as {
          message: string;
          status: number;
        };
        state.errorMessage = error?.message;
        state.status = error?.status;
      })
      //Mentor sign In
      .addCase(MentorLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(MentorLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        Cookies.set("token", action.payload.token, { expires: 3 });
      })
      .addCase(MentorLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        const error = action.payload as {
          message: string;
          status: number;
        };
        state.errorMessage = error?.message;
        state.status = error?.status;
      })
      //Mentor Apply
      .addCase(MultiFromApply.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(MultiFromApply.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(MultiFromApply.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        const error = action.payload as {
          message: string;
          status: number;
        };
        state.errorMessage = error?.message;
        state.status = error?.status;
      })
      //Change Password mentee -> profile -> changePassword
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        const error = action.payload as {
          message: string;
          status: number;
        };
        state.errorMessage = error?.message;
        state.status = error?.status;
      });
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
