"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userAuthControl_1 = require("../controllers/userAuthControl");
const menteeControls_1 = require("../controllers/menteeControls");
const paymentController_1 = require("../controllers/paymentController");
const verifyAuth_1 = require("../middleware/verifyAuth");
// import { verifyJWT } from "../middleware/verifyJWT";
const router = (0, express_1.Router)();
const menteeAuthController = new userAuthControl_1.MenteeAuthController();
const menteeController = new menteeControls_1.MenteeController();
const paymentController = new paymentController_1.PaymentControls();
//Authentication Routes
router.post("/signup", menteeAuthController.signup);
router.post("/login", menteeAuthController.signin);
router.get("/refresh", menteeAuthController.refreshToken);
router.delete("/logout", menteeAuthController.logout);
router.get("/checkToken", menteeAuthController.checkToken);
router.post("/verifyOTP", menteeAuthController.verifyOTP);
router.post("/resendOTP", menteeAuthController.resendOTP);
router.post("/google-auth", menteeAuthController.googleAuth);
router.get("/browse-mentors", verifyAuth_1.Authentication.ensureAuth(["mentee"]), menteeController.mentorProfile);
router.get("/browse/filter", verifyAuth_1.Authentication.ensureAuth(["mentee"]), menteeController.mentorSearch);
router.get("/managment/:menteeId", verifyAuth_1.Authentication.ensureAuth(["mentee"]), menteeController.menteeProfile);
router.post("/managment/profie-update", verifyAuth_1.Authentication.ensureAuth(["mentee"]), menteeController.updateProfile);
router.post("/managment/profieImage-update", verifyAuth_1.Authentication.ensureAuth(["mentee", "mentor"]), menteeController.updateProfileImage);
router.post("/change-password", verifyAuth_1.Authentication.ensureAuth(["mentee", "mentor"]), menteeController.changePassword);
router.post("/managment/password/sentotp", verifyAuth_1.Authentication.ensureAuth(["mentee", "mentor"]), menteeController.sendOtp);
router.post("/profile/changePassword/sendOTP", verifyAuth_1.Authentication.ensureAuth(["mentee", "mentor"]), menteeController.sendOtp);
router.get("/visit/mentor-profile/:mentorId", verifyAuth_1.Authentication.ensureAuth(["mentee"]), menteeController.getMentorProfile);
router.post("/report/mentor/:mentorId", verifyAuth_1.Authentication.ensureAuth(["mentee"]), menteeController.reportMentor);
router.post("/mentorship/apply", verifyAuth_1.Authentication.ensureAuth(["mentee"]), menteeController.mentorshipApply);
//Using new controller class
router.post("/payment-suceess", verifyAuth_1.Authentication.ensureAuth(["mentee"]), paymentController.storePaymentData);
router.get("/getimage/:userRole", verifyAuth_1.Authentication.ensureAuth(["mentee", "mentor"]), menteeController.getProfileImg);
router.get("/my-mentors", verifyAuth_1.Authentication.ensureAuth(["mentee"]), menteeController.getMyMentors);
router.post("/sort", verifyAuth_1.Authentication.ensureAuth(["mentee"]), menteeController.getSorted);
router.get("/mentee/expired", verifyAuth_1.Authentication.ensureAuth(["mentee"]), menteeController.getExpired);
router.get("/check/:mentorId", verifyAuth_1.Authentication.ensureAuth(["mentee"]), menteeController.checkSpot);
router.post("/rate/:mentorId", verifyAuth_1.Authentication.ensureAuth(["mentee"]), menteeController.rateMentor);
exports.default = router;
