import { Router } from "express";
import { AdminAuthControls } from "../controllers/adminAuthControl";
import { AdminControls } from "../controllers/adminControl";
import { verifyJWT } from "../middleware/verifyJWT";
import { protectAdmin } from "../middleware/authMiddleware";

const router: Router = Router();

const adminAuthControl = new AdminAuthControls();
const adminControls = new AdminControls();

router.post("/admin-login", adminAuthControl.adminLogin);

router.get("/mentor-applications", verifyJWT, adminControls.mentorApplications);

router.get(
  "/single-application/:applicationId",
  verifyJWT,
  adminControls.singleApplication
);

router.patch(
  "/single-application/approve/:applicationId",
  verifyJWT,
  adminControls.approveApplication
);

router.patch(
  "/single-application/reject/:applicationId",
  verifyJWT,
  adminControls.rejectApplication
);

router.get("/mentee", verifyJWT, adminControls.getMentees);

router.patch("/block/:userId", verifyJWT, adminControls.blockUser);

router.patch("/unblock/:userId", verifyJWT, adminControls.unBlock);

router.post("/mentee/search", verifyJWT, adminControls.search);

router.get("/mentor", verifyJWT, adminControls.getMentors);

router.get("/monthly-users/:year", verifyJWT, adminControls.getMonthlyUsers);

router.get("/analytics", verifyJWT, adminControls.getAnalytics);

export default router;
