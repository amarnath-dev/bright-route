import { Router } from "express";
import { AdminAuthControls } from "../controllers/adminAuthControl";
import { AdminControls } from "../controllers/adminControl";

const router: Router = Router();

const adminAuthControl = new AdminAuthControls();
const adminControls = new AdminControls();

router.post("/login", adminAuthControl.adminLogin);
router.get("/mentor-applications", adminControls.mentorApplications);
router.get(
  "/single-application/:applicationId",
  adminControls.singleApplication
);
router.patch(
  "/single-application/approve/:applicationId",
  adminControls.approveApplication
);

router.patch(
  "/single-application/reject/:applicationId",
  adminControls.rejectApplication
);

export default router;
