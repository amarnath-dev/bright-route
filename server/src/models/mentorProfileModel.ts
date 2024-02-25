import mongoose, { Schema } from "mongoose";
import { IMentorProfile } from "../Interfaces";

const mentorProfileSchema: Schema<IMentorProfile> =
  new mongoose.Schema<IMentorProfile>(
    {
      mentor_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      profile_img: {
        type: String,
      },
      first_name: {
        type: String,
      },
      last_name: {
        type: String,
      },
      job_title: {
        type: String,
      },
      company: {
        type: String,
      },
      state: {
        type: String,
      },
      category: {
        type: String,
      },
      bio: {
        type: String,
      },
      linkedIn: {
        type: String,
      },
      twitter: {
        type: String,
      },
      web_url: {
        type: String,
      },
      why_mentor: {
        type: String,
      },
      achievement: {
        type: String,
      },
      profile_state: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },
      skills: {
        type: [],
      },
      isPaymentDetails: {
        type: Boolean,
        default: false,
      },
      isBlocked: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

export default mongoose.model<IMentorProfile>(
  "Mentorprofile",
  mentorProfileSchema
);
