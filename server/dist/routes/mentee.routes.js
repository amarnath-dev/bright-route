"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_auth_controller_1 = require("../controllers/user.auth.controller");
const mentee_controller_1 = require("../controllers/mentee.controller");
const payment_controller_1 = require("../controllers/payment.controller");
const verifyUser_1 = require("../middleware/verifyUser");
const router = (0, express_1.Router)();
const menteeAuthController = new user_auth_controller_1.MenteeAuthController();
const menteeController = new mentee_controller_1.MenteeController();
const paymentController = new payment_controller_1.PaymentControls();
router.post("/signup", menteeAuthController.signup);
router.post("/login", menteeAuthController.signin);
router.get("/refresh", menteeAuthController.refreshToken);
router.delete("/logout", menteeAuthController.logout);
router.get("/checkToken", menteeAuthController.checkToken);
router.post("/verifyOTP", menteeAuthController.verifyOTP);
router.post("/resendOTP", menteeAuthController.resendOTP);
router.post("/google-auth", menteeAuthController.googleAuth);
router.get("/browse-mentors", verifyUser_1.Authentication.ensureAuth(["mentee"]), menteeController.mentorProfile);
router.get("/browse/filter", verifyUser_1.Authentication.ensureAuth(["mentee"]), menteeController.mentorSearch);
router.get("/managment/:menteeId", verifyUser_1.Authentication.ensureAuth(["mentee"]), menteeController.menteeProfile);
router.post("/managment/profie-update", verifyUser_1.Authentication.ensureAuth(["mentee"]), menteeController.updateProfile);
router.post("/managment/profieImage-update", verifyUser_1.Authentication.ensureAuth(["mentee", "mentor"]), menteeController.updateProfileImage);
router.post("/change-password", verifyUser_1.Authentication.ensureAuth(["mentee", "mentor"]), menteeController.changePassword);
router.post("/managment/password/sentotp", verifyUser_1.Authentication.ensureAuth(["mentee", "mentor"]), menteeController.sendOtp);
router.post("/profile/changePassword/sendOTP", verifyUser_1.Authentication.ensureAuth(["mentee", "mentor"]), menteeController.sendOtp);
router.get("/visit/mentor-profile/:mentorId", verifyUser_1.Authentication.ensureAuth(["mentee"]), menteeController.getMentorProfile);
router.post("/report/mentor/:mentorId", verifyUser_1.Authentication.ensureAuth(["mentee"]), menteeController.reportMentor);
router.post("/mentorship/apply", verifyUser_1.Authentication.ensureAuth(["mentee"]), menteeController.mentorshipApply);
router.post("/payment-suceess", verifyUser_1.Authentication.ensureAuth(["mentee"]), paymentController.storePaymentData);
router.get("/getimage/:userRole", verifyUser_1.Authentication.ensureAuth(["mentee", "mentor"]), menteeController.getProfileImg);
router.get("/my-mentors", verifyUser_1.Authentication.ensureAuth(["mentee"]), menteeController.getMyMentors);
router.post("/sort", verifyUser_1.Authentication.ensureAuth(["mentee"]), menteeController.getSorted);
router.get("/mentee/expired", verifyUser_1.Authentication.ensureAuth(["mentee"]), menteeController.getExpired);
router.get("/check/:mentorId", verifyUser_1.Authentication.ensureAuth(["mentee"]), menteeController.checkSpot);
router.post("/rate/:mentorId", verifyUser_1.Authentication.ensureAuth(["mentee"]), menteeController.rateMentor);
exports.default = router;
