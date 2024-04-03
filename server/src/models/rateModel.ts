import mongoose, { Schema } from "mongoose";
import { IRate } from "../Interfaces";

const rateSchema: Schema<IRate> = new mongoose.Schema<IRate>(
  {
    mentor_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    mentee_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rating: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IRate>("Rate", rateSchema);
