"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const mentorProfileSchema = new mongoose_1.default.Schema({
    mentor_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    profile_img: {
        type: String,
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    job_title: {
        type: String,
    },
    company: {
        type: String,
    },
    state: {
        type: String,
    },
    category: {
        type: String,
    },
    bio: {
        type: String,
    },
    linkedIn: {
        type: String,
    },
    twitter: {
        type: String,
    },
    why_mentor: {
        type: String,
    },
    achievement: {
        type: String,
    },
    profile_state: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    skills: {
        type: [],
    },
    spots: {
        type: Number,
        default: 5,
    },
    isPaymentDetails: {
        type: Boolean,
        default: false,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Mentorprofile", mentorProfileSchema);
