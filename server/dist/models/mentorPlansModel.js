"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const planSchema = new mongoose_1.default.Schema({
    mentor_id: {
        type: String,
        required: true,
    },
    planDetails: [
        {
            planAmount: {
                type: Number,
            },
            planType: {
                type: String,
            },
            planDescription: {
                type: String,
            },
            planServices: [
                {
                    serviceName: {
                        type: String,
                    },
                    serviceCount: {
                        type: Number,
                    },
                },
            ],
            isDeleted: {
                type: Boolean,
                default: false,
            },
        },
    ],
    planLimit: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("MentorPlan", planSchema);
