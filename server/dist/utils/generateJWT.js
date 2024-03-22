"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, email) => {
    return jsonwebtoken_1.default.sign({ id, email }, process.env.JWT_SECRETE, {
        expiresIn: maxAge,
    });
};
exports.default = createToken;
