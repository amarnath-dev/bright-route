import { Router } from "express";
import { MenteeAuthController } from "../controllers/userAuthControl";

const router: Router = Router();
//Mentee Auth Controller
const menteeAuthController = new MenteeAuthController();

router.post('/signup', menteeAuthController.signup);
router.post('/login', menteeAuthController.signin);
router.post('/verifyOTP', menteeAuthController.verifyOTP);
router.post('/resendOTP', menteeAuthController.resendOTP);
router.post('/google-auth', menteeAuthController.googleAuth);

export default router;