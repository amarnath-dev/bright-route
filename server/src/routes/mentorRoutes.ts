import { Router } from "express";
import { MentorAuthController } from "../controllers/userAuthControl";
import { MentorController } from "../controllers/mentorControl";
import { protect } from "../middleware/authMiddleware";
const router: Router = Router();

const mentorAuthController = new MentorAuthController();
const mentorController = new MentorController();

router.post("/apply", mentorAuthController.apply);
router.post("/mentor-login", mentorAuthController.mentorLogin);
router.get("/profile", mentorController.mentorprofileDetails);

export default router;
