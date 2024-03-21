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
exports.protectAdmin = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const adminModal_1 = __importDefault(require("../models/adminModal"));
const userModel_1 = __importDefault(require("../models/userModel"));
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies;
    if (token) {
        try {
            const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRETE);
            // const userId = new mongoose.Types.ObjectId(decode.id);
            const user = yield userModel_1.default.findOne({ email: decode.UserInfo.email });
            if (!user) {
                res.status(401);
                next(Error("Unauthorized user"));
            }
            else if (user === null || user === void 0 ? void 0 : user.is_blocked) {
                res.status(401);
                next(new Error("Account has been blocked"));
            }
            else {
                req.body.user = user;
            }
            next();
        }
        catch (error) {
            res.status(401);
            next(Error("Not Authorized, token failed"));
        }
    }
    else {
        res.status(401);
        next(new Error("Token auth failed"));
    }
});
exports.protect = protect;
const protectAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, "jwtsecrete");
            const adminId = new mongoose_1.default.Types.ObjectId(decoded.id);
            const admin = yield adminModal_1.default.findById(adminId);
            if (!admin || admin.role !== "admin") {
                res.status(401);
                throw new Error("Unauthorized Admin");
            }
            else {
                req.admin = admin;
            }
            next();
        }
        catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
    else {
        res.status(401);
        throw new Error("Not authorized,token does not exits");
    }
});
exports.protectAdmin = protectAdmin;
