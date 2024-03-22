"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const menteeProfileSchema = new mongoose_1.default.Schema({
    mentee_id: {
        type: String,
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
    linkedIn: {
        type: String,
    },
    twitter: {
        type: String,
    },
    goal: {
        type: String,
    },
    available_time: {
        type: String,
    },
    country: {
        type: String,
    },
    region: {
        type: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Menteeprofile", menteeProfileSchema);
