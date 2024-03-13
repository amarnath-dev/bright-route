import mongoose, { Schema } from "mongoose";
import { INotification } from "../Interfaces";

const notificationSchema: Schema<INotification> =
  new mongoose.Schema<INotification>(
    {
      userId: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
      role: {
        type: String,
      },
    },
    { timestamps: true }
  );

export default mongoose.model<INotification>(
  "notification",
  notificationSchema
);
