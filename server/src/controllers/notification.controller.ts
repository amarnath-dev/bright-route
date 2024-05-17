import { Request, Response } from "express";
import Notification from "../models/Notification";
import { ObjectId } from "mongodb";

export class NotificationControl {
  async paymentMessage(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;
      const newNotification = new Notification({
        userId: user?.id,
        content: req.body?.text,
        role: "mentee",
        messageType: "payment successful",
      });
      await newNotification.save();
      res.status(200).json({ status: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }
  async getNotifications(req: Request, res: Response): Promise<void> {
    const userId = req.params.userId;
    try {
      const notifications = await Notification.find({
        userId: new ObjectId(userId),
        isDeleted: false,
      });
      if (notifications) {
        res.status(200).json({ status: "success", notifications });
      } else {
        res.status(404).json({ message: "Data not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }
  async deleteNotification(req: Request, res: Response): Promise<void> {
    try {
      const notificationId = req.params.notificationId;
      if (notificationId) {
        await Notification.findByIdAndUpdate(notificationId, {
          isDeleted: true,
        });
        res.status(200).json({ status: "success" });
      } else {
        res.status(404).json({ message: "Notification not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }

  async mentorNotification(req: Request, res: Response): Promise<void> {
    try {
      const mentorId = req.params.mentorId;
      const notification = new Notification({
        userId: mentorId,
        content: req.body.mentorText,
        role: "mentor",
        messageType: "plan purchased",
      });
      notification.save();
      res.status(200).json({ status: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }

  async mentorChatNotification(req: Request, res: Response): Promise<void> {
    try {
      const newChatMessage = new Notification(req.body?.ChatMessage);
      if (newChatMessage) {
        await newChatMessage.save();
        res.status(200).json({ status: "success" });
      } else {
        res
          .status(400)
          .json({ status: "failed", message: "Data fields are missing" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }
}
