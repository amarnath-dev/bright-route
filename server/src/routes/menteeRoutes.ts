import { Router } from "express";
import { MenteeAuthController } from "../controllers/userAuthControl";
import { MenteeController } from "../controllers/menteeControls";
import { PaymentControls } from "../controllers/paymentController";
import { verifyJWT } from "../middleware/verifyJWT";

const router: Router = Router();
const menteeAuthController = new MenteeAuthController();
const menteeController = new MenteeController();
const paymentController = new PaymentControls();

router.post("/signup", menteeAuthController.signup);
router.post("/login", menteeAuthController.signin);
router.get("/refresh", menteeAuthController.refreshToken);
router.delete("/logout", menteeAuthController.logout);
router.get("/checkToken", menteeAuthController.checkToken);
router.post("/verifyOTP", menteeAuthController.verifyOTP);
router.post("/resendOTP", menteeAuthController.resendOTP);
router.post("/google-auth", menteeAuthController.googleAuth);

router.get("/browse-mentors", verifyJWT, menteeController.mentorProfile);
router.get("/browse/filter", verifyJWT, menteeController.mentorSearch);
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

router.post(
  "/profile/changePassword/sendOTP",
  verifyJWT,
  menteeController.sendOtp
);

router.get(
  "/visit/mentor-profile/:mentorId",
  verifyJWT,
  menteeController.getMentorProfile
);

router.post(
  "/report/mentor/:mentorId",
  verifyJWT,
  menteeController.reportMentor
);
router.post("/mentorship/apply", verifyJWT, menteeController.mentorshipApply);
router.get(
  "/mentor/plans/:mentorId",
  verifyJWT,
  menteeController.getMentorPlans
);
//using new controller class
router.post("/create-payment-intent", verifyJWT, paymentController.payment);
router.post("/payment-suceess", verifyJWT, paymentController.storePaymentData);

router.get("/getimage/:userRole", verifyJWT, menteeController.getProfileImg);
router.get("/my-mentors", verifyJWT, menteeController.getMyMentors);

router.post("/sort", verifyJWT, menteeController.getSorted);
export default router;
