import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import API from "../config/api";

type Credentials = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  otpNumber: string;
};

export const changePassword = createAsyncThunk(
  "profile/changePassword",
  async (data: Credentials, thunkAPI) => {
    try {
      const response = await API.post("/change-password", data, {
        withCredentials: true,
      });
      console.log("change password response", response);
      return response.data;
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

export const sendOTP = createAsyncThunk(
  "profile/changePassword/sendOTP",
  async (_, thunkAPI) => {
    try {
      const response = await API.post(
        "/managment/password/sentotp",
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
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
