import { Request, Response, NextFunction } from "express";
import Notification from "../models/notificationModal";

export class NotificationControl {
  async paymentMessage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.user;
      const newNotification = new Notification({
        userId: user?.id,
        content: req.body?.text,
        role: "mentee",
      });
      await newNotification.save();
      res.status(200).json({ status: "success" });
    } catch (error) {
      console.log(error);
      return next(Error());
    }
  }
  async getNotifications(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId = req.params.userId;
    try {
      const notifications = await Notification.find({
        userId: userId,
        isDeleted: false,
      });
      if (notifications) {
        res.status(200).json({ status: "success", notifications });
      } else {
        res.status(404).json({ message: "Data not found" });
      }
    } catch (error) {
      console.log(error);
      return next(Error());
    }
  }
  async deleteNotification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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
      return next(Error());
    }
  }
  async mentorNotification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const mentorId = req.params.mentorId;
      const notification = new Notification({
        userId: mentorId,
        content: req.body.mentorText,
        role: "mentor",
      });
      notification.save();
      // sendNotification(mentorId);
      res.status(200).json({ status: "success" });
    } catch (error) {
      console.log(error);
      return next(Error());
    }
  }
}
