import mongoose, { Schema } from "mongoose";
import { IAdmin } from "../interfaces/schema.interface";

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
