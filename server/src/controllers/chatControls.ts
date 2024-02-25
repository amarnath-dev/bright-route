import { Response, Request, NextFunction } from "express";
import Conversation from "../models/conversationModel";
import Message from "../models/messageModal";
import Mentor from "../models/mentorProfileModel";
import { error } from "console";

export class ChatControls {
  async makeConversation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const conversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
      });
      await conversation.save();
      res.status(200).json({
        status: "success",
        message: "Conversation created",
        conversation,
      });
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
      console.log("Reached at friend details fetch", friendId);
      if (friendId) {
        const friendDetails = await Mentor.findOne({ mentor_id: friendId });
        if (friendDetails?._id) {
          console.log("===>", friendDetails);
          res.status(200).json({ status: "success", friendDetails });
        } else {
          console.log(error);
          res.status(400).json({ message: "Friend details fetch failed" });
        }
      }
    } catch (error) {
      console.log(error);
      return next(Error("Conversation creation failed"));
    }
  }
}