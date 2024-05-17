import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Form = {
  mentor_plan_id: string;
  mentor_id: string;
  mentor_plan_amount: string;
  mentorship_goal: string;
  time_to_reach: string;
  message_to_mentor: string;
};

export type PlanID = {
  mentor_plan_id: string;
};

export type MentorID = {
  mentor_id: string;
};

export type PlanAmount = {
  plan_amount: string;
};

interface Credentials {
  form: Form | null;
  planId: PlanID | null;
  mentorId: MentorID | null;
  planAmount: PlanAmount | null;
}

const initialState: Credentials = {
  form: null,
  planId: null,
  mentorId: null,
  planAmount: null,
};

export const applySlice = createSlice({
  name: "formApply",
  initialState,
  reducers: {
    submitForm: (state, action: PayloadAction<Form | null>) => {
      state.form = action.payload;
    },
    submitPlanId: (state, action: PayloadAction<PlanID | null>) => {
      state.planId = action.payload;
    },
    submitMentorId: (state, action: PayloadAction<MentorID | null>) => {
      state.mentorId = action.payload;
    },
    submitPlanAmount: (state, action: PayloadAction<PlanAmount | null>) => {
      state.planAmount = action.payload;
    },
  },
});

export default applySlice.reducer;
export const { submitForm, submitPlanId, submitMentorId, submitPlanAmount } =
  applySlice.actions;
