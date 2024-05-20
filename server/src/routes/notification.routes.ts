import { Router } from "express";
import { Authentication } from "../middleware/verifyUser";
import { NotificationControl } from "../controllers/notification.controller";

const router: Router = Router();
const notificationController = new NotificationControl();

router.get(
  "/getNotifications/:userId",
  Authentication.ensureAuth(["mentee", "mentor"]),
  notificationController.getNotifications
);

router.post(
  "/paymentMessage",
  Authentication.ensureAuth(["mentee", "mentor"]),
  notificationController.paymentMessage
);

router.post(
  "/mentorNotification/:mentorId",
  Authentication.ensureAuth(["mentor", "mentee"]),
  notificationController.mentorNotification
);

router.delete(
  "/delete/:notificationId",
  Authentication.ensureAuth(["mentee", "mentor"]),
  notificationController.deleteNotification
);

router.post(
  "/chatNotification/:mentorId",
  Authentication.ensureAuth(["mentee", "mentor"]),
  notificationController.mentorChatNotification
);

export default router;
