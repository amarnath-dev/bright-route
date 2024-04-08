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
exports.SpotJob = void 0;
const node_schedule_1 = __importDefault(require("node-schedule"));
const mentorProfileModel_1 = __importDefault(require("../models/mentorProfileModel"));
const SpotJob = node_schedule_1.default.scheduleJob("0 0 1 * *", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Spot Job Executed");
        yield mentorProfileModel_1.default.updateMany({}, { spot: 5 });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.SpotJob = SpotJob;
// 0 0 1 * *
