import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT";
import { NotificationControl } from "../controllers/notificationControl";

const router: Router = Router();
const notificationController = new NotificationControl();

router.get(
  "/getNotifications/:userId",
  verifyJWT,
  notificationController.getNotifications
);

router.post(
  "/paymentMessage",
  verifyJWT,
  notificationController.paymentMessage
);

router.post(
  "/mentorNotification/:mentorId",
  notificationController.mentorNotification
);

router.delete(
  "/delete/:notificationId",
  verifyJWT,
  notificationController.deleteNotification
);

export default router;
