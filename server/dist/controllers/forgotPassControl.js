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
exports.ForgotPassController = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const otpModel_1 = __importDefault(require("../models/otpModel"));
const crypto_js_1 = __importDefault(require("crypto-js"));
class ForgotPassController {
    checkEmail(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emailExists = yield userModel_1.default.findOne({ email: (_a = req.body) === null || _a === void 0 ? void 0 : _a.emailId });
                if (emailExists === null || emailExists === void 0 ? void 0 : emailExists._id) {
                    yield (0, sendEmail_1.default)("", "", (_b = req.body) === null || _b === void 0 ? void 0 : _b.emailId);
                    res
                        .status(200)
                        .json({ status: "success", message: "Email Send Succeesfull" });
                }
                else {
                    res.status(200).json({ status: "failed", message: "Email not found" });
                }
            }
            catch (error) {
                console.log(error);
                return next(Error());
            }
        });
    }
    verifyOTP(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const otpExists = yield otpModel_1.default.findOne({ email: (_a = req.body) === null || _a === void 0 ? void 0 : _a.userEmail });
                if (otpExists) {
                    const dbOtpDecrypt = crypto_js_1.default.AES.decrypt(otpExists === null || otpExists === void 0 ? void 0 : otpExists.otp, process.env.HASH_KEY).toString(crypto_js_1.default.enc.Utf8);
                    if (dbOtpDecrypt === ((_b = req.body) === null || _b === void 0 ? void 0 : _b.OTPNum)) {
                        res.status(200).json({ status: "success", message: "OTP Verified" });
                    }
                    else {
                        res.status(200).json({ status: "failed", message: "Invalid OTP" });
                    }
                }
                else {
                    res.status(404).json({ message: "Resend OTP" });
                }
            }
            catch (error) {
                console.log(error);
                return next(Error());
            }
        });
    }
    newPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userEmail, formData } = req.body;
                const hashedPassword = crypto_js_1.default.AES.encrypt(formData === null || formData === void 0 ? void 0 : formData.password, process.env.HASH_KEY).toString();
                const result = yield userModel_1.default.findOneAndUpdate({ email: userEmail }, { $set: { password: hashedPassword } });
                if (result) {
                    res
                        .status(200)
                        .json({ status: "success", message: "Password Changed" });
                }
                else {
                    res.status(404).json({ status: "failed", message: "User not Found" });
                }
            }
            catch (error) {
                console.log(error);
                return next(Error());
            }
        });
    }
}
exports.ForgotPassController = ForgotPassController;
