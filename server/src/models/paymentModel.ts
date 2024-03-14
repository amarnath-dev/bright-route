import mongoose, { Schema } from "mongoose";
import { IApplication } from "../Interfaces";

const paymentSchema: Schema<IApplication> = new mongoose.Schema<IApplication>(
  {
    mentor_id: {
      type: String,
      required: true,
    },
    mentee_id: {
      type: String,
      required: true,
    },
    razorPay_id: {
      type: String,
    },
    plan_price: {
      type: Number,
    },
    mentor_plan_id: {
      type: String,
      required: true,
    },
    goal_of_mentorship: {
      type: String,
    },
    time_to_reach_goal: {
      type: String,
    },
    message_to_mentor: {
      type: String,
    },
    paymentDone: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 1,
    },
    isExpired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IApplication>("payment", paymentSchema);
