import mongoose, { Schema } from "mongoose";
import { IRefreshToken } from "../Interfaces";

const refreshSchema: Schema<IRefreshToken> = new mongoose.Schema<IRefreshToken>(
  {
    refreshToken: {
      type: String,
    },
  }
);

export default mongoose.model<IRefreshToken>("refreshToken", refreshSchema);
