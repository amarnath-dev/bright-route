import { Router } from "express";
import { MenteeAuthController } from "../controllers/userAuthControl";
import { MenteeController } from "../controllers/menteeControls";
import { verifyJWT } from "../middleware/verifyJWT";

const router: Router = Router();
const menteeAuthController = new MenteeAuthController();
const menteeController = new MenteeController();

router.post("/signup", menteeAuthController.signup);
router.post("/login", menteeAuthController.signin);
router.get("/refresh", menteeAuthController.refreshToken);
router.get("/logout", menteeAuthController.logout);

router.post("/verifyOTP", menteeAuthController.verifyOTP);
router.post("/resendOTP", menteeAuthController.resendOTP);
router.post("/google-auth", menteeAuthController.googleAuth);

router.get("/browse-mentors", verifyJWT, menteeController.mentorProfile);
router.get("/browse/filter", menteeController.mentorSearch);

router.get("/managment/:menteeId", verifyJWT, menteeController.menteeProfile);
router.post(
  "/managment/profie-update",
  verifyJWT,
  menteeController.updateProfile
);
router.post(
  "/managment/profieImage-update",
  verifyJWT,
  menteeController.updateProfileImage
);
router.post("/change-password", verifyJWT, menteeController.changePassword);
router.post("/managment/password/sentotp", verifyJWT, menteeController.sendOtp);

router.post("/profile/changePassword/sendOTP", verifyJWT, menteeController.sendOtp);

router.get(
  "/visit/mentor-profile/:mentorId",
  verifyJWT,
  menteeController.getMentorProfile
);
router.post("/mentorship/apply", verifyJWT, menteeController.mentorshipApply);
router.get(
  "/mentor/plans/:mentorId",
  verifyJWT,
  menteeController.getMentorPlans
);

export default router;
