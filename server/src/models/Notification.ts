import mongoose, { Schema } from "mongoose";
import { INotification } from "../interfaces/schema.interface";

const notificationSchema: Schema<INotification> =
  new mongoose.Schema<INotification>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      content: {
        type: String,
        required: true,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
      isVisited: {
        type: Boolean,
        default: false,
      },
      role: {
        type: String,
      },
      messageType: {
        type: String,
      },
      senderId: {
        type: String,
      },
    },
    { timestamps: true }
  );

export default mongoose.model<INotification>(
  "notification",
  notificationSchema
);
