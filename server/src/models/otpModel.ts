import mongoose, { Schema } from "mongoose";
import { IOtp } from "../Interfaces";

const otpSchema: Schema<IOtp> = new mongoose.Schema<IOtp>({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: (60 * 5),
    }
})

export default mongoose.model<IOtp>("Otp", otpSchema);