import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import API from "../api";
import Cookies from "js-cookie";

export type UserWithIdAndRoles = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  otp: string;
};

export const signup = createAsyncThunk(
  "auth/verifyOTP",
  async (userData: UserWithIdAndRoles, thunkAPI) => {
    try {
      const response = await API.post("/verifyOTP", { userData });
      if (response.data) {
        return response.data.user;
      }
    } catch (error) {
      const err = error as AxiosError<{
        message?: string;
      }>;
      const payload = {
        message: err.response?.data?.message,
        status: err.response?.status,
      };
      return thunkAPI.rejectWithValue(payload);
    }
  }
);

export type UserWithEmailAndPassword = {
  email: string;
  password: string;
};

export const signin = createAsyncThunk(
  "auth/signin",
  async (userData: UserWithEmailAndPassword, thunkAPI) => {
    try {
      const response = await API.post("/login", { userData });
      if (response.data) {
        Cookies.set("token", response.data.token, { expires: 3 });
        return response.data.user;
      }
    } catch (error) {
      const err = error as AxiosError<{
        message?: string;
      }>;
      const payload = {
        message: err.response?.data?.message,
        status: err.response?.status,
      };
      return thunkAPI.rejectWithValue(payload);
    }
  }
);

export const googleAuth = createAsyncThunk(
  "auth/google-auth",
  async (userData: string, thunkAPI) => {
    try {
      const response = await API.post("/google-auth", { userData });
      if (response) {
        if (response.data.status == "success") {
          return response.data;
        }
      }
    } catch (error) {
      const err = error as AxiosError<{
        status?: string;
        message?: string;
      }>;
      const payload = {
        status: err.response?.status,
        message: err.response?.data?.message,
      };
      return thunkAPI.rejectWithValue(payload);
    }
  }
);
