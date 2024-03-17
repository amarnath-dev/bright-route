import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import sendEmailOtp from "../utils/sendEmail";
import OTP from "../models/otpModel";
import CryptoJS from "crypto-js";

export class ForgotPassController {
  async checkEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const emailExists = await User.findOne({ email: req.body?.emailId });
      if (emailExists?._id) {
        await sendEmailOtp("", "", req.body?.emailId);
        res
          .status(200)
          .json({ status: "success", message: "Email Send Succeesfull" });
      } else {
        res.status(200).json({ status: "failed", message: "Email not found" });
      }
    } catch (error) {
      console.log(error);
      return next(Error());
    }
  }
  async verifyOTP(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const otpExists = await OTP.findOne({ email: req.body?.userEmail });
      if (otpExists) {
        const dbOtpDecrypt = CryptoJS.AES.decrypt(
          otpExists?.otp,
          process.env.HASH_KEY as string
        ).toString(CryptoJS.enc.Utf8);
        if (dbOtpDecrypt === req.body?.OTPNum) {
          res.status(200).json({ status: "success", message: "OTP Verified" });
        } else {
          res.status(200).json({ status: "failed", message: "Invalid OTP" });
        }
      } else {
        res.status(404).json({ message: "Resend OTP" });
      }
    } catch (error) {
      console.log(error);
      return next(Error());
    }
  }
  async newPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userEmail, formData } = req.body;
      const hashedPassword: any = CryptoJS.AES.encrypt(
        formData?.password,
        process.env.HASH_KEY as string
      ).toString();
      const result = await User.findOneAndUpdate(
        { email: userEmail },
        { $set: { password: hashedPassword } }
      );
      if (result) {
        res
          .status(200)
          .json({ status: "success", message: "Password Changed" });
      } else {
        res.status(404).json({ status: "failed", message: "User not Found" });
      }
    } catch (error) {
      console.log(error);
      return next(Error());
    }
  }
}
