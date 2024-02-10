import { Response, Request, NextFunction } from "express";
import MentorModel from "../models/mentorProfileModel";
import MenteeModel from "../models/menteeProfileModel";
import mongoose from "mongoose";
import User from "../models/userModel";
import CryptoJS from "crypto-js";
import sendEmailOtp from "../utils/sendEmail";
import OTP from "../models/otpModel";

export interface mentorProfileObj {
  imageUrl: string;
  _id: string;
  mentor_id: string;
  mentorEmail: string;
  profile_img: string;
  first_name: string;
  last_name: string;
  job_title: string;
  company: string;
  state: string;
  category: string;
  bio: string;
  linkedIn: string;
  twitter: string;
  web_url: string;
  profile_state: string;
  skills: [];
  reports: Report[];
}

export class MenteeController {
  async mentorProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const allMentors = await MentorModel.aggregate([
        { $match: { profile_state: "approved" } },
        {
          $project: {
            why_mentor: 0,
            achievement: 0,
          },
        },
      ]);
      if (allMentors) {
        res.status(200).json({ status: "sucess", allMentors: allMentors });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return next(Error("Data fetch failed"));
      }
    }
  }

  // search mentors
  async mentorSearch(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { str, company, skill } = req.query as {
        str?: string;
        company?: string;
        skill?: string;
      };

      const query: any = {};

      if (str) {
        query.job_title = { $regex: new RegExp(str, "i") };
      }

      if (company) {
        query.company = { $regex: new RegExp(company, "i") };
      }

      if (skill) {
        query.skills = skill;
      }

      console.log("Executing query:", query);

      const mentorProfiles = await MentorModel.find(query);
      console.log("mentor profile", mentorProfiles);

      if (mentorProfiles) {
        res
          .status(200)
          .json({ message: "Mentor filtered", mentors: mentorProfiles });
      }
    } catch (error) {
      console.error(error);
      return next(Error("Data fetch failed"));
    }
  }

  async menteeProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const menteeId = new mongoose.Types.ObjectId(req.params.menteeId);
      const mentorDetails = await MenteeModel.aggregate([
        { $match: { mentee_id: menteeId } },
        {
          $lookup: {
            from: "users",
            foreignField: "_id",
            localField: "mentee_id",
            as: "mentorInfo",
          },
        },
        {
          $unwind: "$mentorInfo",
        },
      ]);

      if (mentorDetails) {
        res.status(200).json({ status: "success", mentorDetails });
      }
    } catch (error) {
      console.error(error);
      return next(Error("Data fetch failed"));
    }
  }

  async changePassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.body.user;
      const { oldPassword, newPassword, confirmPassword, otpNumber } = req.body;

      if (!newPassword || !confirmPassword) {
        res.status(400).json({ message: "Data fields missing" });
        return next(Error("Data fields missing"));
      }
      const userDB = await User.findById(user._id);

      if (userDB) {
        if (oldPassword === "") {
          console.log("<----------with otp---------->");
          const dbOtp = await OTP.findOne({ email: user.email });
          if (dbOtp?.email) {
            const dbOtpDecrypt = CryptoJS.AES.decrypt(
              dbOtp.otp,
              "ecryptionkey"
            ).toString(CryptoJS.enc.Utf8);
            if (dbOtpDecrypt === otpNumber) {
              const hashNewPass = CryptoJS.AES.encrypt(
                confirmPassword,
                "ecryptionkey"
              ).toString();
              await User.findByIdAndUpdate(user._id, {
                password: hashNewPass,
              });
              res
                .status(200)
                .json({ status: "success", message: "Password Updated" });
            } else {
              console.log("Invalid OTP");
              res.status(400).json({ message: "Invalid OTP Number" });
            }
          } else {
            console.log("email not exists in the db");
            res.status(404).json({ message: "Resend OTP and Try Again" });
          }
        } else {
          console.log("<------------------without otp-------------->");
          const passwordDecrypt = CryptoJS.AES.decrypt(
            userDB?.password,
            "ecryptionkey"
          ).toString(CryptoJS.enc.Utf8);
          console.log("decrypted pass", passwordDecrypt);
          if (passwordDecrypt !== oldPassword) {
            res.status(401).json({ message: "Incorrect Password" });
            return next(Error("Password Incorrect"));
          }
          const hashNewPass = CryptoJS.AES.encrypt(
            confirmPassword,
            "ecryptionkey"
          ).toString();
          await User.findByIdAndUpdate(user._id, {
            password: hashNewPass,
          });
          res
            .status(200)
            .json({ status: "success", message: "Password Updated" });
        }
      }
    } catch (error) {
      console.log(error);
      return next(Error("Password Change Failed"));
    }
  }

  async sendOtp(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.body.user;
      if (user) {
        const userExists = await User.findById(user._id);
        if (!userExists?._id) {
          res.status(404).json({ message: "Can't find email" });
        }
        await sendEmailOtp("", "", user.email);
        res
          .status(200)
          .json({ status: "success", message: "OTP send sucessfully" });
      }
    } catch (error) {
      console.log(error);
      return next(Error("Email send failed"));
    }
  }
}
