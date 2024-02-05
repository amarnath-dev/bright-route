import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//We can create a seperate file for user data and
//Import from there

export type user = {
  _id: string;
  first_name: string;
  email: string;
  role: string;
};

interface Credentials {
  user: user | null;
  isLoading: boolean;
  isSuccess: boolean;
}

const initialState: Credentials = {
  user: null,
  isLoading: false,
  isSuccess: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<user | null>) {
      // console.log("payload data has recived", action.payload);
      state.user = action.payload;
    },
    // user Log out
    userLogout(state) {
      state.user = null;
    },
    reset: (state) => {
      state.isSuccess = false;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
