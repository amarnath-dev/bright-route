import { Router } from "express";
import { ForgotPassController } from "../controllers/forgotPassControl";

const router: Router = Router();
const forgotPassControl = new ForgotPassController();

router.post("/checkEmail", forgotPassControl.checkEmail);
router.post("/OTPVerify", forgotPassControl.verifyOTP)
router.post("/new-password",forgotPassControl.newPassword)

export default router;
