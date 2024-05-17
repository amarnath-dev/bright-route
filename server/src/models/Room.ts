import mongoose, { Schema } from "mongoose";
import { IRoom } from "../interfaces/schema.interface";

const roomSchema: Schema<IRoom> = new mongoose.Schema<IRoom>({
  members: {
    type: [],
  },
  roomId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IRoom>("Room", roomSchema);
