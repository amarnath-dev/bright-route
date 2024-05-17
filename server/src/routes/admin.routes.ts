import { Router } from "express";
import { AdminAuthControls } from "../controllers/admin.auth.controller";
import { AdminControls } from "../controllers/admin.controller";
import { AdminAuthentication } from "../middleware/verifyAdmin";

const router: Router = Router();

const adminAuthControl = new AdminAuthControls();
const adminControls = new AdminControls();

router.post("/login", adminAuthControl.adminLogin);

router.get(
  "/mentor-applications",
  AdminAuthentication.ensureAuth(["admin"]),
  adminControls.mentorApplications
);

router.get(
  "/single-application/:applicationId",
  AdminAuthentication.ensureAuth(["admin"]),
  adminControls.singleApplication
);

router.patch(
  "/single-application/approve/:applicationId",
  AdminAuthentication.ensureAuth(["admin"]),
  adminControls.approveApplication
);

router.patch(
  "/single-application/reject/:applicationId",
  AdminAuthentication.ensureAuth(["admin"]),
  adminControls.rejectApplication
);

router.get(
  "/mentee",
  AdminAuthentication.ensureAuth(["admin"]),
  adminControls.getMentees
);

router.patch(
  "/block/:userId",
  AdminAuthentication.ensureAuth(["admin"]),
  adminControls.blockUser
);

router.patch(
  "/unblock/:userId",
  AdminAuthentication.ensureAuth(["admin"]),
  adminControls.unBlock
);

router.post(
  "/mentee/search",
  AdminAuthentication.ensureAuth(["admin"]),
  adminControls.search
);

router.get(
  "/mentor",
  AdminAuthentication.ensureAuth(["admin"]),
  adminControls.getMentors
);

router.get(
  "/monthly-users/:year",
  AdminAuthentication.ensureAuth(["admin"]),
  adminControls.getMonthlyUsers
);

router.get(
  "/analytics",
  AdminAuthentication.ensureAuth(["admin"]),
  adminControls.getAnalytics
);

router.get(
  "/yearSort",
  AdminAuthentication.ensureAuth(["admin"]),
  adminControls.getYearData
);

export default router;
