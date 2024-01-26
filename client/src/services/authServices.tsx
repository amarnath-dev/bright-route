import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import API from "../api";

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
      const response = await API.post("/verifyOTP", {
        userData,
      });
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
