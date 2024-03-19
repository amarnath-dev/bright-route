import { Router } from "express";
import { AdminAuthControls } from "../controllers/adminAuthControl";
import { AdminControls } from "../controllers/adminControl";
import { protectAdmin } from "../middleware/authMiddleware";
import { verifyJWT } from "../middleware/verifyJWT";

const router: Router = Router();

const adminAuthControl = new AdminAuthControls();
const adminControls = new AdminControls();

router.post("/admin-login", adminAuthControl.adminLogin);

router.get(
  "/mentor-applications",
  protectAdmin,
  adminControls.mentorApplications
);

router.get(
  "/single-application/:applicationId",
  protectAdmin,
  adminControls.singleApplication
);
router.patch(
  "/single-application/approve/:applicationId",
  protectAdmin,
  adminControls.approveApplication
);

router.patch(
  "/single-application/reject/:applicationId",
  protectAdmin,
  adminControls.rejectApplication
);

router.get("/mentee", verifyJWT, adminControls.getMentors);
router.patch("/mentee/:userId", verifyJWT, adminControls.blockUser);
router.patch("/mentee/unblock/:userId", verifyJWT, adminControls.unBlock);

export default router;
