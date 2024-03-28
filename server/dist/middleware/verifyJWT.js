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
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        const accessToken = authHeader;
        jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_SECRETE, (err, decoded) => {
            if (err) {
                console.log("Access Token Not Found in Request");
                return res.status(403).json({
                    message: "Access Token Not Found",
                });
            }
            req.user = decoded.UserInfo;
            next();
        });
    }
    catch (error) {
        console.log("Middleware Error");
        console.log(error);
    }
});
exports.verifyJWT = verifyJWT;
