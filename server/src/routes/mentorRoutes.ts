import { Router } from "express";
import { MentorAuthController } from "../controllers/userAuthControl";
import { MentorController } from "../controllers/mentorControl";
import { Authentication } from "../middleware/verifyAuth";
// import { verifyJWT } from "../middleware/verifyJWT";
const router: Router = Router();

const mentorAuthController = new MentorAuthController();
const mentorController = new MentorController();

//Auth Routes
router.post("/apply", mentorAuthController.apply);
router.post("/mentor-login", mentorAuthController.mentorLogin);

router.get(
  "/profile",
  Authentication.ensureAuth(["mentor"]),
  mentorController.mentorprofileDetails
);

// router.post(
//   "/profile/profileImg-update",
//   Authentication.ensureAuth(["mentor"]),
//   mentorController.updateProfileImg
// );

router.post(
  "/profile/update",
  Authentication.ensureAuth(["mentor"]),
  mentorController.updateProfile
);

router.post(
  "/plans/create",
  Authentication.ensureAuth(["mentor"]),
  mentorController.createPlan
);

router.get(
  "/plans/:mentorId",
  Authentication.ensureAuth(["mentee", "mentor"]),
  mentorController.getPlans
);

router.delete(
  "/plans/delete/:planId",
  Authentication.ensureAuth(["mentor"]),
  mentorController.deletePlan
);

router.get(
  "/menteeApplications",
  Authentication.ensureAuth(["mentor"]),
  mentorController.menteeApllication
);

router.get(
  "/paymentDetails/:paymentId",
  Authentication.ensureAuth(["mentee", "mentor"]),
  mentorController.paymentDetails
);

router.get(
  "/plan/:planId",
  Authentication.ensureAuth(["mentee", "mentor"]),
  mentorController.planDetails
);

router.get(
  "/checkPlan/:planId",
  Authentication.ensureAuth(["mentee", "mentor"]),
  mentorController.checkPlan
);

router.get(
  "/expired",
  Authentication.ensureAuth(["mentor"]),
  mentorController.getExpired
);

export default router;
