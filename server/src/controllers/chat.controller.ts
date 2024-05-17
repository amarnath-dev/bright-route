import { Response, Request } from "express";
import Conversation from "../models/Conversation";
import Message from "../models/Message";
import Mentor from "../models/Mentor";
import Mentee from "../models/Mentee";
import Room from "../models/Room";
import Payment from "../models/Payment";
import { ObjectId } from "mongodb";

export class ChatControls {
  async makeConversation(req: Request, res: Response): Promise<void> {
    try {
      const senderId = req.body.senderId;
      const receiverId = req.body.receiverId;
      const existingConversation = await Conversation.findOne({
        members: { $all: [senderId, receiverId] },
      });
      if (existingConversation) {
        res.status(200).json({
          status: "success",
          message: "Conversation Already exists",
          conversation: existingConversation,
        });
      } else {
        const newConversation = new Conversation({
          members: [senderId, receiverId],
        });
        await newConversation.save();
        res.status(200).json({
          status: "success",
          message: "Conversation created",
          conversation: newConversation,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }

  async getConversation(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;
      const conversation = await Conversation.find({
        members: { $in: [user?.id] },
      });
      res.status(200).json({
        status: "success",
        message: "Conversation fetched",
        conversation,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }

  async newMessage(req: Request, res: Response): Promise<void> {
    try {
      const newMessage = new Message(req.body);
      const savedMessage = await newMessage.save();
      res.status(200).json({
        status: "success",
        message: "New Message Saved",
        savedMessage,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }

  async getAllConversation(req: Request, res: Response): Promise<void> {
    try {
      const conversationID = req.params.conversationId;
      const messages = await Message.find({
        conversationId: conversationID,
      });
      console.log("All messages", messages);
      res.status(200).json({
        status: "success",
        message: "Conversation Deails fetched",
        messages,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }
  async getFriendDetails(req: Request, res: Response): Promise<void> {
    try {
      const friendId = new ObjectId(req.params.friendId);
      const user = req?.user;
      if (friendId) {
        const friendDetails = await Mentor.findOne({ mentor_id: friendId });
        if (friendDetails?._id) {
          const isPlanExists = await Payment.findOne({
            mentor_id: friendId,
            mentee_id: new ObjectId(user?.id),
            isExpired: false,
          });
          res.status(200).json({ status: "success", friendDetails });
        } else {
          const friendDetails = await Mentee.findOne({ mentee_id: friendId });
          res.status(200).json({ status: "success", friendDetails });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }
  async getSingleConversation(req: Request, res: Response): Promise<void> {
    try {
      const menteeId = req.params.menteeId;
      const mentorId = req.params.mentorId;
      const conversation = await Conversation.find({
        members: { $all: [menteeId, mentorId] },
      });
      if (conversation.length > 0) {
        res.json({ conversation });
      } else {
        res.status(400).json({ message: "No conversation exists" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }

  async getSingleConversationMentor(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const menteeId = req.params.menteeId;
      const mentorId = req.params.mentorId;
      const conversation = await Conversation.find({
        members: { $all: [menteeId, mentorId] },
      });
      if (conversation.length > 0) {
        res.json({ conversation });
      } else {
        res.status(400).json({ message: "No conversation exists" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }

  async deleteMessage(req: Request, res: Response): Promise<void> {
    try {
      const messageId = req.params.messageId;
      if (messageId) {
        const action = await Message.findByIdAndUpdate(messageId, {
          $set: { IsDeleted: true },
        });
        if (action?._id) {
          res.status(200).json({ status: "success" });
        }
      } else {
        res.status(404).json({ message: "messageId is missing" });
      }
    } catch (error) {
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }

  async roomId(req: Request, res: Response): Promise<void> {
    try {
      const result = await Room.findOne({
        members: { $all: [req.body.userId, req.body.pairId] },
      });
      if (result) {
        res.status(200).json({ status: "success", roomId: result?.roomId });
      } else {
        res.status(200).json({ status: "failed" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }
}
