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

router.get("/managment/:menteeId", menteeController.menteeProfile);
router.post(
  "/managment/profie-update",
  verifyJWT,
  menteeController.updateProfile
);
router.post(
  "/managment/profieImage-update",
  menteeController.updateProfileImage
);
router.post("/change-password", menteeController.changePassword);
router.post("/managment/password/sentotp", menteeController.sendOtp);

export default router;
