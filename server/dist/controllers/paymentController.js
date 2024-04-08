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
exports.PaymentControls = void 0;
const paymentModel_1 = __importDefault(require("../models/paymentModel"));
const roomModel_1 = __importDefault(require("../models/roomModel"));
const mentorProfileModel_1 = __importDefault(require("../models/mentorProfileModel"));
const mongodb_1 = require("mongodb");
class PaymentControls {
    storePaymentData(req, res, next) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentDetails = new paymentModel_1.default({
                    mentor_plan_id: (_a = req.body) === null || _a === void 0 ? void 0 : _a.mentor_plan_id,
                    razorPay_id: (_b = req.body) === null || _b === void 0 ? void 0 : _b.razorPay_id,
                    mentor_id: (_c = req.body) === null || _c === void 0 ? void 0 : _c.mentor_id,
                    mentee_id: (_d = req.body) === null || _d === void 0 ? void 0 : _d.mentee_id,
                    plan_price: (_e = req.body) === null || _e === void 0 ? void 0 : _e.mentor_plan_amount,
                    goal_of_mentorship: (_f = req.body) === null || _f === void 0 ? void 0 : _f.goal_of_mentorship,
                    time_to_reach_goal: (_g = req.body) === null || _g === void 0 ? void 0 : _g.time_to_reach_goal,
                    message_to_mentor: (_h = req.body) === null || _h === void 0 ? void 0 : _h.message_to_mentor,
                });
                yield paymentDetails.save();
                const mentorProfile = yield mentorProfileModel_1.default.findOneAndUpdate({ mentor_id: new mongodb_1.ObjectId((_j = req.body) === null || _j === void 0 ? void 0 : _j.mentor_id) }, { $inc: { spots: -1 } }, { new: true });
                //Creating the video call room for both user
                const roomExists = yield roomModel_1.default.findOne({
                    members: { $all: [(_k = req.body) === null || _k === void 0 ? void 0 : _k.mentee_id, (_l = req.body) === null || _l === void 0 ? void 0 : _l.mentor_id] },
                });
                if (!roomExists) {
                    const roomId = ((_m = req.body) === null || _m === void 0 ? void 0 : _m.mentee_id) + ((_o = req.body) === null || _o === void 0 ? void 0 : _o.mentor_id);
                    const roomData = new roomModel_1.default({
                        members: [req.body.mentor_id, req.body.mentee_id],
                        roomId: roomId,
                    });
                    yield roomData.save();
                }
                res
                    .status(202)
                    .json({ status: "success", message: "Transaction Successfull" });
            }
            catch (error) {
                console.error(error);
                return next(Error("Data fetch failed"));
            }
        });
    }
}
exports.PaymentControls = PaymentControls;
