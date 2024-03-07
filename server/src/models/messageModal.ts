import mongoose, { Schema } from "mongoose";
import { IMessage } from "../Interfaces";

const messageSchema: Schema<IMessage> = new mongoose.Schema<IMessage>(
  {
    conversationId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IMessage>("Message", messageSchema);
