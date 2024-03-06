import { Router } from "express";
import { MentorAuthController } from "../controllers/userAuthControl";
import { MentorController } from "../controllers/mentorControl";
import { verifyJWT } from "../middleware/verifyJWT";
const router: Router = Router();

const mentorAuthController = new MentorAuthController();
const mentorController = new MentorController();

router.post("/apply", mentorAuthController.apply);
router.post("/mentor-login", mentorAuthController.mentorLogin);

router.get("/profile", verifyJWT, mentorController.mentorprofileDetails);
router.post(
  "/profile/profileImg-update",
  verifyJWT,
  mentorController.updateProfileImg
);

router.post("/profile/update", verifyJWT, mentorController.updateProfile);
router.post("/plans/create", verifyJWT, mentorController.createPlan);
router.get("/plans", verifyJWT, mentorController.getPlans);
router.delete(
  "/plans/delete/:planId/:planType",
  verifyJWT,
  mentorController.deletePlan
);
router.get(
  "/menteeApplications",
  verifyJWT,
  mentorController.menteeApllication
);
router.get(
  "/paymentDetails/:paymentId",
  verifyJWT,
  mentorController.paymentDetails
);
router.get("/plan/:planId", verifyJWT, mentorController.planDetails);

export default router;
