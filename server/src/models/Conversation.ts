import mongoose, { Schema } from "mongoose";
import { IConversation } from "../interfaces/schema.interface";

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
