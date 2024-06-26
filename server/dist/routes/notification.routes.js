"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyUser_1 = require("../middleware/verifyUser");
const notification_controller_1 = require("../controllers/notification.controller");
const router = (0, express_1.Router)();
const notificationController = new notification_controller_1.NotificationControl();
router.get("/getNotifications/:userId", verifyUser_1.Authentication.ensureAuth(["mentee", "mentor"]), notificationController.getNotifications);
router.post("/paymentMessage", verifyUser_1.Authentication.ensureAuth(["mentee", "mentor"]), notificationController.paymentMessage);
router.post("/mentorNotification/:mentorId", verifyUser_1.Authentication.ensureAuth(["mentor", "mentee"]), notificationController.mentorNotification);
router.delete("/delete/:notificationId", verifyUser_1.Authentication.ensureAuth(["mentee", "mentor"]), notificationController.deleteNotification);
router.post("/chatNotification/:mentorId", verifyUser_1.Authentication.ensureAuth(["mentee", "mentor"]), notificationController.mentorChatNotification);
exports.default = router;
