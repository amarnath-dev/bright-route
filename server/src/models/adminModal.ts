import mongoose, { Schema } from "mongoose";
import { IAdmin } from "../Interfaces";

const adminSchema: Schema<IAdmin> = new mongoose.Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAdmin>("Admin", adminSchema);
