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
exports.NotificationControl = void 0;
const notificationModal_1 = __importDefault(require("../models/notificationModal"));
const mongodb_1 = require("mongodb");
class NotificationControl {
    paymentMessage(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const newNotification = new notificationModal_1.default({
                    userId: user === null || user === void 0 ? void 0 : user.id,
                    content: (_a = req.body) === null || _a === void 0 ? void 0 : _a.text,
                    role: "mentee",
                    messageType: "payment successful",
                });
                yield newNotification.save();
                res.status(200).json({ status: "success" });
            }
            catch (error) {
                console.log(error);
                return next(Error());
            }
        });
    }
    getNotifications(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            try {
                const notifications = yield notificationModal_1.default.find({
                    userId: new mongodb_1.ObjectId(userId),
                    isDeleted: false,
                });
                if (notifications) {
                    res.status(200).json({ status: "success", notifications });
                }
                else {
                    res.status(404).json({ message: "Data not found" });
                }
            }
            catch (error) {
                return next(Error());
            }
        });
    }
    deleteNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notificationId = req.params.notificationId;
                if (notificationId) {
                    yield notificationModal_1.default.findByIdAndUpdate(notificationId, {
                        isDeleted: true,
                    });
                    res.status(200).json({ status: "success" });
                }
                else {
                    res.status(404).json({ message: "Notification not found" });
                }
            }
            catch (error) {
                console.log(error);
                return next(Error());
            }
        });
    }
    mentorNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mentorId = req.params.mentorId;
                const notification = new notificationModal_1.default({
                    userId: mentorId,
                    content: req.body.mentorText,
                    role: "mentor",
                    messageType: "plan purchased",
                });
                notification.save();
                res.status(200).json({ status: "success" });
            }
            catch (error) {
                console.log(error);
                return next(Error());
            }
        });
    }
    mentorChatNotification(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newChatMessage = new notificationModal_1.default((_a = req.body) === null || _a === void 0 ? void 0 : _a.ChatMessage);
                if (newChatMessage) {
                    yield newChatMessage.save();
                    res.status(200).json({ status: "success" });
                }
                else {
                    res
                        .status(400)
                        .json({ status: "failed", message: "Data fields are missing" });
                }
            }
            catch (error) {
                console.log(error);
                return next(Error());
            }
        });
    }
}
exports.NotificationControl = NotificationControl;
