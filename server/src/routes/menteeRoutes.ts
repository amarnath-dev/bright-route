import { Router } from "express";
import { MenteeAuthController } from "../controllers/userAuthControl";
import { MenteeController } from "../controllers/menteeControls";
import { PaymentControls } from "../controllers/paymentController";
import { Authentication } from "../middleware/verifyAuth";
// import { verifyJWT } from "../middleware/verifyJWT";

const router: Router = Router();
const menteeAuthController = new MenteeAuthController();
const menteeController = new MenteeController();
const paymentController = new PaymentControls();

//Authentication Routes
router.post("/signup", menteeAuthController.signup);
router.post("/login", menteeAuthController.signin);
router.get("/refresh", menteeAuthController.refreshToken);
router.delete("/logout", menteeAuthController.logout);
router.get("/checkToken", menteeAuthController.checkToken);
router.post("/verifyOTP", menteeAuthController.verifyOTP);
router.post("/resendOTP", menteeAuthController.resendOTP);
router.post("/google-auth", menteeAuthController.googleAuth);

router.get(
  "/browse-mentors",
  Authentication.ensureAuth(["mentee"]),
  menteeController.mentorProfile
);

router.get(
  "/browse/filter",
  Authentication.ensureAuth(["mentee"]),
  menteeController.mentorSearch
);

router.get(
  "/managment/:menteeId",
  Authentication.ensureAuth(["mentee"]),
  menteeController.menteeProfile
);

router.post(
  "/managment/profie-update",
  Authentication.ensureAuth(["mentee"]),
  menteeController.updateProfile
);

router.post(
  "/managment/profieImage-update",
  Authentication.ensureAuth(["mentee"]),
  menteeController.updateProfileImage
);

router.post(
  "/change-password",
  Authentication.ensureAuth(["mentee", "mentor"]),
  menteeController.changePassword
);

router.post(
  "/managment/password/sentotp",
  Authentication.ensureAuth(["mentee", "mentor"]),
  menteeController.sendOtp
);

router.post(
  "/profile/changePassword/sendOTP",
  Authentication.ensureAuth(["mentee", "mentor"]),
  menteeController.sendOtp
);

router.get(
  "/visit/mentor-profile/:mentorId",
  Authentication.ensureAuth(["mentee"]),
  menteeController.getMentorProfile
);

router.post(
  "/report/mentor/:mentorId",
  Authentication.ensureAuth(["mentee"]),
  menteeController.reportMentor
);

router.post(
  "/mentorship/apply",
  Authentication.ensureAuth(["mentee"]),
  menteeController.mentorshipApply
);

//Using new controller class
router.post(
  "/payment-suceess",
  Authentication.ensureAuth(["mentee"]),
  paymentController.storePaymentData
);

router.get(
  "/getimage/:userRole",
  Authentication.ensureAuth(["mentee", "mentor"]),
  menteeController.getProfileImg
);

router.get(
  "/my-mentors",
  Authentication.ensureAuth(["mentee"]),
  menteeController.getMyMentors
);

router.post(
  "/sort",
  Authentication.ensureAuth(["mentee"]),
  menteeController.getSorted
);

export default router;
