import { Router } from "express";
import { MenteeAuthController } from "../controllers/user.auth.controller";
import { MenteeController } from "../controllers/mentee.controller";
import { PaymentControls } from "../controllers/payment.controller";
import { Authentication } from "../middleware/verifyUser";

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
  Authentication.ensureAuth(["mentee", "mentor"]),
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

router.get(
  "/mentee/expired",
  Authentication.ensureAuth(["mentee"]),
  menteeController.getExpired
);

router.get(
  "/check/:mentorId",
  Authentication.ensureAuth(["mentee"]),
  menteeController.checkSpot
);

router.post(
  "/rate/:mentorId",
  Authentication.ensureAuth(["mentee"]),
  menteeController.rateMentor
);

export default router;
