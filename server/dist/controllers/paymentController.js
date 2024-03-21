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
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_KEY);
const paymentModel_1 = __importDefault(require("../models/paymentModel"));
class PaymentControls {
    payment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentIntent = yield stripe.paymentIntents.create({
                    amount: 5,
                    currency: "usd",
                    automatic_payment_methods: {
                        enabled: true,
                    },
                });
                console.log(paymentIntent);
                res.send({
                    clientSecret: paymentIntent.client_secret,
                });
            }
            catch (error) {
                console.error(error);
                return next(Error("Data fetch failed"));
            }
        });
    }
    storePaymentData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("reached at payment data store", req.body);
                const paymentDetails = new paymentModel_1.default({
                    mentor_plan_id: req.body.mentor_plan_id,
                    razorPay_id: req.body.razorPay_id,
                    mentor_id: req.body.mentor_id,
                    mentee_id: req.body.mentee_id,
                    plan_price: req.body.mentor_plan_amount,
                    goal_of_mentorship: req.body.goal_of_mentorship,
                    time_to_reach_goal: req.body.time_to_reach_goal,
                    message_to_mentor: req.body.message_to_mentor,
                });
                yield paymentDetails.save();
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
