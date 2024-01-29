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
import { jwtDecode } from "jwt-decode";
import generateUsername from "../utils/generateUsername";

interface jwtPayload {
  email: string;
  given_name: string;
}

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
    console.log("reached at google auth one");
    try {
      if (!req.body.userData) {
        res.status(400);
        return next(Error("Invalid credentials"));
      }

      const { email }: jwtPayload = jwtDecode(req.body.userData);
      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
        if (existingUser.password) {
          return next(Error("Invalid Email"));
        }
        const token = generateJwt(existingUser._id, existingUser.email);

        const userDataFromProfile = await menteeProfileModel.findOne({
          mentee_id: existingUser?._id,
        });
        res.status(200).json({
          status: "success",
          message: "User loged in successfully",
          user: {
            _id: existingUser._id,
            first_name: userDataFromProfile?.first_name,
            email: existingUser.email,
            role: existingUser.role,
          },
          token,
        });
      } else {
        console.log("reached at google auth two");
        const userName = await generateUsername();
        const menteeDetails: IUser = new User({
          email,
          password: "",
          role: "mentee",
        });
        const user: IUser = await menteeDetails.save();
        if (user) {
          console.log("reached at google auth three");
          const userProfileDetails: IMenteeProfile = new MenteeProfile({
            mentee_id: user?._id,
            first_name: userName.toString(),
            last_name: "",
          });
          const profileData: IMenteeProfile = await userProfileDetails.save();
          console.log(profileData);
          console.log("reached at google auth four");
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
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return next(error);
      }
    }
  }
}
