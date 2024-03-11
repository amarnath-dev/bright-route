import { Response, Request, NextFunction } from "express";
import Conversation from "../models/conversationModel";
import Message from "../models/messageModal";
import Mentor from "../models/mentorProfileModel";
import Mentee from "../models/menteeProfileModel";

export class ChatControls {
  async makeConversation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const senderId = req.body.senderId;
      const receiverId = req.body.receiverId;
      const existingConversation = await Conversation.findOne({
        members: { $all: [senderId, receiverId] },
      });
      if (existingConversation) {
        res.status(200).json({
          status: "success",
          message: "Conversation already exists",
          conversation: existingConversation,
        });
        return;
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
      return next(Error("Conversation creation failed"));
    }
  }

  async getConversation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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
      return next(Error("Conversation creation failed"));
    }
  }

  async newMessage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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
      return next(Error("Conversation creation failed"));
    }
  }

  async getAllConversation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const conversationID = req.params.conversationId;
      const allMessages = await Message.find({
        conversationId: conversationID,
      });
      res.status(200).json({
        status: "success",
        message: "Conversation Deails fetched",
        allMessages,
      });
    } catch (error) {
      console.log(error);
      return next(Error("Conversation creation failed"));
    }
  }
  async getFriendDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const friendId = req.params.friendId;
      if (friendId) {
        const friendDetails = await Mentor.findOne({ mentor_id: friendId });
        if (friendDetails?._id) {
          res.status(200).json({ status: "success", friendDetails });
        } else {
          const friendDetails = await Mentee.findOne({ mentee_id: friendId });
          res.status(200).json({ status: "success", friendDetails });
        }
      }
    } catch (error) {
      console.log(error);
      return next(Error("Conversation creation failed"));
    }
  }
  async getSingleConversation(
    req: Request,
    res: Response,
    next: NextFunction
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
      return next(Error("Conversation creation failed"));
    }
  }

  async getSingleConversationMentor(
    req: Request,
    res: Response,
    next: NextFunction
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
      return next(Error("Conversation creation failed"));
    }
  }
  async deleteMessage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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
      console.log(error);
      return next(Error("Conversation creation failed"));
    }
  }
}
