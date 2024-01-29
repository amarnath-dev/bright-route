import mongoose, { Schema } from "mongoose";
import { IUser } from "../Interfaces";

const userSchema: Schema<IUser> = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        required: true,
    },
    is_blocked: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

export default mongoose.model<IUser>("User", userSchema);
