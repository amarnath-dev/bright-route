import mongoose, { Schema } from "mongoose";
import { IApplication } from "../Interfaces";

const applicationShema: Schema<IApplication> =
  new mongoose.Schema<IApplication>({
    mentor_id: {
      type: String,
      required: true,
    },
    mentee_id: {
      type: String,
      required: true,
    },
    mentor_plan_id: {
      type: String,
      required: true,
    },
    goal_of_mentorship: {
      type: String,
    },
    time_to_reach: {
      type: String,
    },
    message_to_mentor: {
      type: String,
    },
    paymentDone: {
      type: Boolean,
      default: false,
    },
  });

export default mongoose.model<IApplication>(
  "mentorshipapplication",
  applicationShema
);
