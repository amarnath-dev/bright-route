import mongoose, { Schema } from "mongoose";
import { IPlans } from "../Interfaces";

const planSchema: Schema<IPlans> = new mongoose.Schema<IPlans>(
  {
    mentor_id: {
      type: String,
      required: true,
    },
    planDetails: [
      {
        planAmount: {
          type: Number,
        },
        planType: {
          type: String,
        },
        planDescription: {
          type: String,
        },
        planServices: [
          {
            serviceName: {
              type: String,
            },
            serviceCount: {
              type: Number,
            },
          },
        ],
        isDeleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
    planLimit: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPlans>("MentorPlan", planSchema);
