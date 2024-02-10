import { Router } from "express";
import { MenteeAuthController } from "../controllers/userAuthControl";
import { MenteeController } from "../controllers/menteeControls";
import { protect } from "../middleware/authMiddleware";

const router: Router = Router();
const menteeAuthController = new MenteeAuthController();
const menteeController = new MenteeController();

router.post("/signup", menteeAuthController.signup);
router.post("/login", menteeAuthController.signin);
router.post("/verifyOTP", menteeAuthController.verifyOTP);
router.post("/resendOTP", menteeAuthController.resendOTP);
router.post("/google-auth", menteeAuthController.googleAuth);
router.get("/browse-mentors", menteeController.mentorProfile);
router.get("/browse/filter", menteeController.mentorSearch);
// router.get("/browse/filter", menteeController.mentorSearch);
router.get("/managment/:menteeId", protect, menteeController.menteeProfile);
router.post("/change-password", protect, menteeController.changePassword);
router.post("/managment/password/sentotp", protect, menteeController.sendOtp);

export default router;
