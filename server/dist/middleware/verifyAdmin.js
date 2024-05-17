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
exports.AdminAuthentication = void 0;
const mongodb_1 = require("mongodb");
const Admin_1 = __importDefault(require("../models/Admin"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AdminAuthentication {
    static ensureAuth(roles) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authHeader = req.headers.authorization || req.headers.Authorization;
                const accessToken = authHeader;
                jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRETE, (err, decoded) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    if (err) {
                        return res.status(403).json({
                            message: "Access Token Not Found",
                        });
                    }
                    const userExists = yield Admin_1.default.findOne({ _id: new mongodb_1.ObjectId((_a = decoded.UserInfo) === null || _a === void 0 ? void 0 : _a.id) }, { is_blocked: false });
                    if (!userExists) {
                        return next(new Error("Unauthorized Access"));
                    }
                    if (!roles.includes(userExists === null || userExists === void 0 ? void 0 : userExists.role)) {
                        return next(new Error("Unauthorized: Role not Allowed"));
                    }
                    else {
                        req.user = decoded.UserInfo;
                        next();
                    }
                }));
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
}
exports.AdminAuthentication = AdminAuthentication;
