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
exports.AdminAuthControls = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const Admin_1 = __importDefault(require("../models/Admin"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AdminAuthControls {
    adminLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    res.status(400).json({ message: "Invalid Credentials" });
                }
                const emailExists = yield Admin_1.default.findOne({ email });
                if (emailExists) {
                    const dbPassword = crypto_js_1.default.AES.decrypt(emailExists === null || emailExists === void 0 ? void 0 : emailExists.password, process.env.HASH_KEY).toString(crypto_js_1.default.enc.Utf8);
                    if (password === dbPassword) {
                        const accessToken = jsonwebtoken_1.default.sign({
                            UserInfo: {
                                id: emailExists === null || emailExists === void 0 ? void 0 : emailExists._id,
                                email: emailExists === null || emailExists === void 0 ? void 0 : emailExists.email,
                                roles: emailExists === null || emailExists === void 0 ? void 0 : emailExists.role,
                            },
                        }, process.env.ACCESS_TOKEN_SECRETE, { expiresIn: "3d" });
                        const refreshToken = jsonwebtoken_1.default.sign({ email: emailExists === null || emailExists === void 0 ? void 0 : emailExists.email }, process.env.REFRESH_TOKEN_SECRETE, { expiresIn: "7d" });
                        res.cookie("refreshToken", refreshToken, {
                            httpOnly: true,
                            secure: false,
                            maxAge: 7 * 24 * 60 * 60 * 1000,
                        });
                        res.status(200).json({
                            status: "success",
                            user: {
                                _id: emailExists === null || emailExists === void 0 ? void 0 : emailExists._id,
                                first_name: "admin",
                                email: emailExists === null || emailExists === void 0 ? void 0 : emailExists.email,
                                role: emailExists === null || emailExists === void 0 ? void 0 : emailExists.role,
                            },
                            accessToken,
                        });
                    }
                    else {
                        res.status(400).json({ message: "Incorrect Password" });
                    }
                }
                else {
                    res.status(400).json({ message: "Email Not Exists" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
}
exports.AdminAuthControls = AdminAuthControls;
