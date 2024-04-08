"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userAuthControl_1 = require("../controllers/userAuthControl");
const mentorControl_1 = require("../controllers/mentorControl");
const verifyAuth_1 = require("../middleware/verifyAuth");
// import { verifyJWT } from "../middleware/verifyJWT";
const router = (0, express_1.Router)();
const mentorAuthController = new userAuthControl_1.MentorAuthController();
const mentorController = new mentorControl_1.MentorController();
//Auth Routes
router.post("/apply", mentorAuthController.apply);
router.post("/mentor-login", mentorAuthController.mentorLogin);
router.get("/profile", verifyAuth_1.Authentication.ensureAuth(["mentor"]), mentorController.mentorprofileDetails);
// router.post(
//   "/profile/profileImg-update",
//   Authentication.ensureAuth(["mentor"]),
//   mentorController.updateProfileImg
// );
router.post("/profile/update", verifyAuth_1.Authentication.ensureAuth(["mentor"]), mentorController.updateProfile);
router.post("/plans/create", verifyAuth_1.Authentication.ensureAuth(["mentor"]), mentorController.createPlan);
router.get("/plans/:mentorId", verifyAuth_1.Authentication.ensureAuth(["mentee", "mentor"]), mentorController.getPlans);
router.delete("/plans/delete/:planId", verifyAuth_1.Authentication.ensureAuth(["mentor"]), mentorController.deletePlan);
router.get("/menteeApplications", verifyAuth_1.Authentication.ensureAuth(["mentor"]), mentorController.menteeApllication);
router.get("/paymentDetails/:paymentId", verifyAuth_1.Authentication.ensureAuth(["mentee", "mentor"]), mentorController.paymentDetails);
router.get("/plan/:planId", verifyAuth_1.Authentication.ensureAuth(["mentee", "mentor"]), mentorController.planDetails);
router.get("/checkPlan/:planId", verifyAuth_1.Authentication.ensureAuth(["mentee", "mentor"]), mentorController.checkPlan);
router.get("/expired", verifyAuth_1.Authentication.ensureAuth(["mentor"]), mentorController.getExpired);
exports.default = router;
