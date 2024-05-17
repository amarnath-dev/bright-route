"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.job = void 0;
const node_schedule_1 = __importDefault(require("node-schedule"));
const Payment_1 = __importDefault(require("../models/Payment"));
const job = node_schedule_1.default.scheduleJob("0 0 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Cron Job Exicuted");
        const thresholdDuration = 30 * 24 * 60 * 60 * 1000;
        yield Payment_1.default.updateMany({
            isExpired: false,
            createdAt: { $lt: new Date(Date.now() - thresholdDuration) },
        }, { $set: { isExpired: true } });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.job = job;
// 0 0 1 * *
