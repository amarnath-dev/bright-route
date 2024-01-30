import mongoose, { Schema } from "mongoose";
import { IMenteeProfile } from "../Interfaces";

const menteeProfileSchema: Schema<IMenteeProfile> =
  new mongoose.Schema<IMenteeProfile>(
    {
      mentee_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      first_name: {
        type: String,
      },
      last_name: {
        type: String,
      },
      profile_img: {
        type: String,
      },
      location: {
        type: String,
      },
      job_title: {
        type: String,
      },
      linkedIn: {
        type: String,
      },
      twitter: {
        type: String,
      },
      goal: {
        type: String,
      },
    },
    { timestamps: true }
  );

export default mongoose.model<IMenteeProfile>(
  "Menteeprofile",
  menteeProfileSchema
);
