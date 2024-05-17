import { Router } from "express";
import { ForgotPassController } from "../controllers/pass.reset.controller";

const router: Router = Router();
const forgotPassControl = new ForgotPassController();

router.post("/checkEmail", forgotPassControl.checkEmail);

router.post("/OTPVerify", forgotPassControl.verifyOTP);

router.post("/new-password",forgotPassControl.newPassword);

export default router;
