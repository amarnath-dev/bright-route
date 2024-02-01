import { Router } from "express";
import { AdminAuthControls } from "../controllers/adminAuthControl";
import { AdminControls } from "../controllers/adminControl";

const router: Router = Router();

const adminAuthControl = new AdminAuthControls();
const adminControls = new AdminControls();

router.post("/login", adminAuthControl.adminLogin);
router.get("/mentor-applications", adminControls.mentorApplications);

export default router;
