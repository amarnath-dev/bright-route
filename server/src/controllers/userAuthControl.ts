import { Request, Response, NextFunction } from "express";
import cryptojs from "crypto-js";
import User from "../models/userModel";
import MenteeProfile from "../models/menteeProfileModel";
import generateJwt from "../utils/generateJWT";
import { IUser } from "../Interfaces";
import { IMenteeProfile } from "../Interfaces/index";
import sendEmailOtp from "../utils/sendEmail";
import Otp from "../models/otpModel";
import menteeProfileModel from "../models/menteeProfileModel";

/***
 * @dec Mentee Registration and Authentication
 * @route POST /api/signup
 * @access Public
 * @type Class
 */

export class MenteeAuthController {
  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { first_name, last_name, email, password } = req.body.data;
      if (!first_name || !last_name || !email || !password) {
        res.status(400);
        return next(Error("Invalid Credentials"));
      }
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        res.status(409);
        return next(Error("Email Alredy Exists"));
      }
      //OTP Email Sending
      await sendEmailOtp(first_name, last_name, email);
      res.status(200).json({ status: "success", user: req.body.data });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return next(error);
      }
    }
  }

  async signin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body.userData;
      if (!email || !password) {
        res.status(400);
        return next(Error("Invalid Credentials"));
      }
      const userExists = await User.findOne({ email });
      if (!userExists) {
        res.status(401);
        return next(Error("Invalid Email"));
      } else {
        const dbPassword = cryptojs.AES.decrypt(
          userExists.password,
          "ecryptionkey"
        ).toString(cryptojs.enc.Utf8);
        if (password === dbPassword) {
          //Getting users name because both stored in different
          //collections user and menteeprofile
          const userDataFromProfile = await menteeProfileModel.findOne({
            mentee_id: userExists?._id,
          });
          const token = generateJwt(userExists._id, email);
          res.status(200).json({
            status: "success",
            user: {
              _id: userExists?._id,
              first_name: userDataFromProfile?.first_name,
              email: userExists?.email,
              role: userExists?.role,
            },
            token,
          });
        } else {
          res.status(401);
          return next(Error("Invalid Password"));
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return next(error);
      }
    }
  }

  async verifyOTP(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { first_name, last_name, email, password, otp } = req.body.userData;
      if (!first_name || !last_name || !email || !password || !otp) {
        res.status(400);
        return next(Error("Invalid Credentials"));
      }
      const otpData = await Otp.findOne({ email });
      if (!otpData) {
        res.status(404);
        return next(Error("Re-Send otp and Try Again"));
      }
      const dbOTP: string = cryptojs.AES.decrypt(
        otpData.otp,
        "ecryptionkey"
      ).toString(cryptojs.enc.Utf8);
      if (dbOTP === otp) {
        const hashedPassword: any = cryptojs.AES.encrypt(
          password,
          "ecryptionkey"
        ).toString();
        const menteeDetails: IUser = new User({
          email,
          password: hashedPassword,
          role: "mentee",
        });
        const user: IUser = await menteeDetails.save();
        if (user) {
          const userProfileDetails: IMenteeProfile = new MenteeProfile({
            mentee_id: user?._id,
            first_name,
            last_name,
          });
          const profileData: IMenteeProfile = await userProfileDetails.save();
          if (profileData) {
            const token = generateJwt(user?._id, email);
            res.status(200).json({
              status: "success",
              message: "User Created Successfully",
              user: {
                _id: user?._id,
                first_name: profileData?.first_name,
                email: user?.email,
                role: user?.role,
              },
              token,
            });
          }
        }
      } else {
        res.status(400);
        return next(Error("Invalid OTP"));
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return next(error);
      }
    }
  }

  async resendOTP(req: Request, res: Response, next: NextFunction) {
    try {
      const { first_name, last_name, email, password } =
        req.body.serverResponse;
      if (!first_name || !last_name || !email || !password) {
        res.status(400);
        return next(Error("Invalid Credentials"));
      }
      //OTP Email Sending
      await sendEmailOtp(first_name, last_name, email);
      res
        .status(200)
        .json({ status: "success", message: "Email Re Send Successfully" });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return next(error);
      }
    }
  }

  async googleAuth(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return next(error);
      }
    }
  }
}
