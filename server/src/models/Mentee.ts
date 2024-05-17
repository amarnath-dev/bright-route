import mongoose, { Schema } from "mongoose";
import { IMenteeProfile } from "../interfaces/schema.interface";

const menteeProfileSchema: Schema<IMenteeProfile> =
  new mongoose.Schema<IMenteeProfile>(
    {
      mentee_id: {
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
      linkedIn: {
        type: String,
      },
      twitter: {
        type: String,
      },
      goal: {
        type: String,
      },
      available_time: {
        type: String,
      },
      country: {
        type: String,
      },
      region: {
        type: String,
      },
    },
    { timestamps: true }
  );

export default mongoose.model<IMenteeProfile>(
  "Menteeprofile",
  menteeProfileSchema
);
