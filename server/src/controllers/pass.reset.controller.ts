import { Request, Response } from "express";
import User from "../models/User";
import sendEmailOtp from "../utils/sendEmail";
import OTP from "../models/Otp";
import CryptoJS from "crypto-js";

export class ForgotPassController {
  async checkEmail(req: Request, res: Response): Promise<void> {
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
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }

  async verifyOTP(req: Request, res: Response): Promise<void> {
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
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }

  async newPassword(req: Request, res: Response): Promise<void> {
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
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }
}
