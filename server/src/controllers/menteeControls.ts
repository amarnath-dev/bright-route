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
      const mentee = await MenteeModel.aggregate([
        { $match: { mentee_id: menteeId } },
        {
          $lookup: {
            from: "users",
            foreignField: "_id",
            localField: "mentee_id",
            as: "menteeInfo",
          },
        },
        {
          $unwind: "$menteeInfo",
        },
      ]);
      const menteeData = mentee[0];
      console.log("this is the goal===>", menteeData);
      const menteeEmail = menteeData.menteeInfo;
      const menteeDetails = {
        mentee_id: menteeData.mentee_id,
        profile_img: menteeData.profile_img ? menteeData.profile_img : "",
        first_name: menteeData.first_name,
        last_name: menteeData.last_name,
        email: menteeEmail.email,
        job_title: menteeData.job_title ? menteeData.job_title : "",
        linkedIn: menteeData.linkedIn ? menteeData.linkedIn : "",
        twitter: menteeData.twitter ? menteeData.twitter : "",
        goal: menteeData.goal ? menteeData.goal : "",
        available_time: menteeData.available_time
          ? menteeData.available_time
          : "",
        country: menteeData.country ? menteeData.country : "",
        region: menteeData.region ? menteeData.region : "",
        role: menteeEmail.role,
      };

      if (menteeDetails) {
        res.status(200).json({ status: "success", menteeDetails });
      }
    } catch (error) {
      console.error(error);
      return next(Error("Data fetch failed"));
    }
  }

  async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.body.user;
      if (user) {
        const newMenteeData = {
          profile_img: req.body.profile_img,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          job_title: req.body.job_title,
          linkedIn: req.body.linkedIn,
          twitter: req.body.twitter,
          goal: req.body.goal,
          available_time: req.body.radio,
          country: req.body.country,
          region: req.body.region,
        };

        const updateMentor = await MenteeModel.findOneAndUpdate(
          {
            mentee_id: user._id,
          },
          { $set: newMenteeData },
          { new: true }
        );
        if (updateMentor) {
          console.log("Mentee profile updated successfully:", updateMentor);
          res.status(200).json({
            status: "success",
            message: "Updated Successfully",
            updateMentor,
          });
        } else {
          res
            .status(404)
            .json({ status: "success", message: "Profile not found" });
        }
      }
    } catch (error) {
      console.log(error);
      return next(Error("Email send failed"));
    }
  }

  async updateProfileImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.body.user;
      const { img_firebase_id } = req.body;
      if (user) {
        if (!img_firebase_id) {
          res.status(400).json({ status: "error", message: "ID not found" });
        } else {
          const updateMentee = await MenteeModel.findOneAndUpdate(
            {
              mentee_id: user._id,
            },
            { $set: { profile_img: img_firebase_id } },
            { new: true }
          );
          if (updateMentee?._id) {
            res
              .status(200)
              .json({ status: "success", message: "Profile Image Updated" });
          }
        }
      }
    } catch (error) {
      console.log(error);
      return next(Error("Email send failed"));
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
              process.env.HASH_KEY as string
            ).toString(CryptoJS.enc.Utf8);
            if (dbOtpDecrypt === otpNumber) {
              const hashNewPass = CryptoJS.AES.encrypt(
                confirmPassword,
                process.env.HASH_KEY as string
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
            process.env.HASH_KEY as string
          ).toString(CryptoJS.enc.Utf8);
          console.log("decrypted pass", passwordDecrypt);
          if (passwordDecrypt !== oldPassword) {
            res.status(401).json({ message: "Incorrect Password" });
            return next(Error("Password Incorrect"));
          }
          const hashNewPass = CryptoJS.AES.encrypt(
            confirmPassword,
            process.env.HASH_KEY as string
          ).toString();
          const resetingUser = await User.findByIdAndUpdate(user._id, {
            password: hashNewPass,
          });
          console.log("this is the user", resetingUser?.role);
          res.status(200).json({
            status: "success",
            message: "Password Updated",
            role: resetingUser?.role,
          });
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
