import mongoose, { Schema } from "mongoose";
import { ISession } from "../interfaces/schema.interface";

const sessionSchema: Schema<ISession> = new mongoose.Schema<ISession>({
  mentee_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  mentor_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  session_count: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ISession>("Session", sessionSchema);
