import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Form = {
  mentorship_goal: string;
  time_to_reach: string;
  message_to_mentor: string;
};

interface Credentials {
  form: Form | null;
}

const initialState: Credentials = {
  form: null,
};

export const applySlice = createSlice({
  name: "formApply",
  initialState,
  reducers: {
    submitForm: (state, action: PayloadAction<Form>) => {
      state.form = action.payload;
    },
  },
});

export default applySlice.reducer;
export const { submitForm } = applySlice.actions;
