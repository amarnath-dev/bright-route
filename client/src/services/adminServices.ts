import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import API from "../api";

export const approveApplication = createAsyncThunk(
  "admin/application-review",
  async (id: string, thunkAPI) => {
    console.log("this is id of the user", id);
    try {
      const response = await API.patch(
        `admin/single-application/approve/${id}`
      );
      if (response) {
        const result = response.data;
        return result.status;
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
