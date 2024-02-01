import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import API from "../api";
import { FormData } from "../datatypes/Datatypes";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../app/firebase";
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

//Mentor
export const apply = createAsyncThunk(
  "auth/mentor",
  async (mentorData: FormData, thunkAPI) => {
    try {
      //Store the profile image in firebase
      console.log("reached at auth service", mentorData);
      const fileObj = mentorData.profile_img;
      if (fileObj?.name) {
        const filename = new Date().getTime() + fileObj?.name;
        const reference = ref(storage, filename);
        const snapshot = await uploadBytes(reference, fileObj);
        if (snapshot.metadata) {
          const img_firebase_id: string = snapshot.metadata.fullPath;
          const response = await API.post("/mentor/apply", {
            mentorData,
            firebase_img_id: img_firebase_id,
          });
          if (response) {
            if (response.data.status == "success") {
              console.log(response.data);
              return response.data;
            }
          }
        }
      }
    } catch (error) {
      const err = error as AxiosError<{ status?: string; message?: string }>;
      const payload = {
        status: err.response?.status,
        message: err.response?.data?.message,
      };
      return thunkAPI.rejectWithValue(payload);
    }
  }
);

//Admin Login
export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async (adminData: UserWithEmailAndPassword, thunkAPI) => {
    try {
      const response = await API.post("/admin/login", adminData);
      if (response) {
        if (response.data.status == "success") {
          console.log("admin sign up successfull", response.data);
        }
      }
    } catch (error) {
      const err = error as AxiosError<{ status?: string; message?: string }>;
      const payload = {
        status: err.response?.status,
        message: err.response?.data?.message,
      };
      return thunkAPI.rejectWithValue(payload);
    }
  }
);
