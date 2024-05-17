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
exports.ChatControls = void 0;
const Conversation_1 = __importDefault(require("../models/Conversation"));
const Message_1 = __importDefault(require("../models/Message"));
const Mentor_1 = __importDefault(require("../models/Mentor"));
const Mentee_1 = __importDefault(require("../models/Mentee"));
const Room_1 = __importDefault(require("../models/Room"));
const Payment_1 = __importDefault(require("../models/Payment"));
const mongodb_1 = require("mongodb");
class ChatControls {
    makeConversation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const senderId = req.body.senderId;
                const receiverId = req.body.receiverId;
                const existingConversation = yield Conversation_1.default.findOne({
                    members: { $all: [senderId, receiverId] },
                });
                if (existingConversation) {
                    res.status(200).json({
                        status: "success",
                        message: "Conversation Already exists",
                        conversation: existingConversation,
                    });
                }
                else {
                    const newConversation = new Conversation_1.default({
                        members: [senderId, receiverId],
                    });
                    yield newConversation.save();
                    res.status(200).json({
                        status: "success",
                        message: "Conversation created",
                        conversation: newConversation,
                    });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    getConversation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const conversation = yield Conversation_1.default.find({
                    members: { $in: [user === null || user === void 0 ? void 0 : user.id] },
                });
                res.status(200).json({
                    status: "success",
                    message: "Conversation fetched",
                    conversation,
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    newMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newMessage = new Message_1.default(req.body);
                const savedMessage = yield newMessage.save();
                res.status(200).json({
                    status: "success",
                    message: "New Message Saved",
                    savedMessage,
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    getAllConversation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conversationID = req.params.conversationId;
                const messages = yield Message_1.default.find({
                    conversationId: conversationID,
                });
                console.log("All messages", messages);
                res.status(200).json({
                    status: "success",
                    message: "Conversation Deails fetched",
                    messages,
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    getFriendDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const friendId = new mongodb_1.ObjectId(req.params.friendId);
                const user = req === null || req === void 0 ? void 0 : req.user;
                if (friendId) {
                    const friendDetails = yield Mentor_1.default.findOne({ mentor_id: friendId });
                    if (friendDetails === null || friendDetails === void 0 ? void 0 : friendDetails._id) {
                        const isPlanExists = yield Payment_1.default.findOne({
                            mentor_id: friendId,
                            mentee_id: new mongodb_1.ObjectId(user === null || user === void 0 ? void 0 : user.id),
                            isExpired: false,
                        });
                        res.status(200).json({ status: "success", friendDetails });
                    }
                    else {
                        const friendDetails = yield Mentee_1.default.findOne({ mentee_id: friendId });
                        res.status(200).json({ status: "success", friendDetails });
                    }
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    getSingleConversation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menteeId = req.params.menteeId;
                const mentorId = req.params.mentorId;
                const conversation = yield Conversation_1.default.find({
                    members: { $all: [menteeId, mentorId] },
                });
                if (conversation.length > 0) {
                    res.json({ conversation });
                }
                else {
                    res.status(400).json({ message: "No conversation exists" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    getSingleConversationMentor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menteeId = req.params.menteeId;
                const mentorId = req.params.mentorId;
                const conversation = yield Conversation_1.default.find({
                    members: { $all: [menteeId, mentorId] },
                });
                if (conversation.length > 0) {
                    res.json({ conversation });
                }
                else {
                    res.status(400).json({ message: "No conversation exists" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    deleteMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messageId = req.params.messageId;
                if (messageId) {
                    const action = yield Message_1.default.findByIdAndUpdate(messageId, {
                        $set: { IsDeleted: true },
                    });
                    if (action === null || action === void 0 ? void 0 : action._id) {
                        res.status(200).json({ status: "success" });
                    }
                }
                else {
                    res.status(404).json({ message: "messageId is missing" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    roomId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Room_1.default.findOne({
                    members: { $all: [req.body.userId, req.body.pairId] },
                });
                if (result) {
                    res.status(200).json({ status: "success", roomId: result === null || result === void 0 ? void 0 : result.roomId });
                }
                else {
                    res.status(200).json({ status: "failed" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
}
exports.ChatControls = ChatControls;
