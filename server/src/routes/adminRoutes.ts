import { Router } from "express";
import { AdminAuthControls } from "../controllers/adminAuthControl";
import { AdminControls } from "../controllers/adminControl";
import { protectAdmin } from "../middleware/authMiddleware";

const router: Router = Router();

const adminAuthControl = new AdminAuthControls();
const adminControls = new AdminControls();

router.post("/login", adminAuthControl.adminLogin);
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

export default router;
