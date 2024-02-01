import { Router } from "express";
import { MentorAuthController } from "../controllers/userAuthControl";

const router: Router = Router();

const mentorAuthController = new MentorAuthController();

router.post("/apply", mentorAuthController.apply);

export default router;
