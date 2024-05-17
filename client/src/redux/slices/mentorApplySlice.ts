import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type FormOne = {
  profile_image: File | null;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  job_title: string;
  company: string;
};

export type FormTwo = {
  job_category: string;
  skills: string[];
  bio: string;
  linked_in: string;
  twitter: string;
};

export type FormThree = {
  why_mentor: string;
  achievement: string;
};

interface Credentials {
  formOne: FormOne | null;
  formTwo: FormTwo | null;
  formThree: FormThree | null;
}

const initialState: Credentials = {
  formOne: null,
  formTwo: null,
  formThree: null,
};

export const mentorApplySlice = createSlice({
  name: "mentorApply",
  initialState,
  reducers: {
    submitFormOne: (state, action: PayloadAction<FormOne | null>) => {
      state.formOne = action.payload;
    },
    submitFormTwo: (state, action: PayloadAction<FormTwo | null>) => {
      state.formTwo = action.payload;
    },
    submitFormThree: (state, action: PayloadAction<FormThree | null>) => {
      state.formThree = action.payload;
    },
  },
});

export default mentorApplySlice.reducer;
export const { submitFormOne, submitFormTwo, submitFormThree } =
  mentorApplySlice.actions;
