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
const nodemailer_1 = __importDefault(require("nodemailer"));
const Otp_1 = __importDefault(require("../models/Otp"));
const crypto_js_1 = __importDefault(require("crypto-js"));
function generateOTP() {
    const randomNum = Math.random() * 9000;
    return Math.floor(1000 + randomNum);
}
const sendEmailOtp = (first_name, last_name, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: "amarmanikavu@gmail.com",
                pass: process.env.NODEMAILER_PASS,
            },
        });
        const otpnum = generateOTP();
        const hashedOTP = crypto_js_1.default.AES.encrypt(otpnum.toString(), process.env.HASH_KEY).toString();
        yield Otp_1.default.updateOne({ email: email }, { $set: { email: email, otp: hashedOTP } }, { upsert: true });
        const mailOptions = {
            from: "amarmanikavu@gmail.com",
            to: email,
            subject: "BrightRoute OTP",
            html: `<p> Hy  ${first_name || ""} ${last_name || ""}, ${otpnum} is your OTP Number</p>`,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                return false;
            }
            else {
                console.log("Email has been sent to ", info.response);
                return true;
            }
        });
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
exports.default = sendEmailOtp;
