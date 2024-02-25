import mongoose, { Schema } from "mongoose";
import { IConversation } from "../Interfaces";

const coversationSchema: Schema<IConversation> =
  new mongoose.Schema<IConversation>(
    {
      members: {
        type: [],
      },
    },
    { timestamps: true }
  );

export default mongoose.model<IConversation>("Conversation", coversationSchema);
