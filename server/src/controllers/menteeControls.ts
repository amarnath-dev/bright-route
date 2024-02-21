import { Response, Request, NextFunction } from "express";
import MentorModel from "../models/mentorProfileModel";
import MenteeModel from "../models/menteeProfileModel";
import mongoose from "mongoose";
import User from "../models/userModel";
import CryptoJS from "crypto-js";
import sendEmailOtp from "../utils/sendEmail";
import OTP from "../models/otpModel";
import Plans from "../models/mentorPlansModel";

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

      const mentorProfiles = await MentorModel.find(query);

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

  async getMentorProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const mentorId = new mongoose.Types.ObjectId(req.params.mentorId);
      console.log("This is mentor id", mentorId);

      if (mentorId) {
        const mentorProfile = await MentorModel.aggregate([
          { $match: { mentor_id: mentorId } },
          {
            $lookup: {
              from: "users",
              localField: "mentor_id",
              foreignField: "_id",
              as: "mentorEmail",
            },
          },
        ]);

        const mentor = mentorProfile[0];
        const mentorDetails = {
          mentor_id: mentor?.mentor_id,
          profile_img: mentor?.profile_img ? mentorProfile[0].profile_img : "",
          first_name: mentor?.first_name,
          last_name: mentor?.last_name,
          job_title: mentor?.job_title ? mentor.job_title : "",
          mentorEmail: mentor?.mentorEmail[0].email,
          linkedIn: mentor?.linkedIn ? mentor.linkedIn : "",
          twitter: mentor?.twitter ? mentor.twitter : "",
          web_url: mentor?.web_url ? mentor.web_url : "",
          bio: mentor?.bio ? mentor.bio : "",
          skills: mentor?.skills,
          state: mentor?.state,
          company: mentor?.company ? mentor.company : "",
          category: mentor?.category,
          role: mentor?.mentorEmail[0].role,
        };

        if (mentorProfile) {
          res.status(200).json({ status: "sucess", mentorDetails });
        }
      } else {
        console.log("User object is not available");
      }
    } catch (error) {
      console.error(error);
      return next(Error("Data fetch failed"));
    }
  }

  async getMentorPlans(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const mentorId = req.params.mentorId;
      const plans = await Plans.findOne({ mentor_id: mentorId });
      if (plans?._id) {
        res.status(200).json({ status: "success", plans });
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

      console.log("this is mentee details", menteeDetails);

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
      const user = req.user;
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
            mentee_id: user.id,
          },
          { $set: newMenteeData },
          { new: true }
        );
        if (updateMentor) {
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
      const user = req.user;
      const { img_firebase_id } = req.body;
      if (user) {
        if (!img_firebase_id) {
          res.status(400).json({ status: "error", message: "ID not found" });
        } else {
          const updateMentee = await MenteeModel.findOneAndUpdate(
            {
              mentee_id: user.id,
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
      const user = req.user;
      console.log("this is the user", req.user);
      console.log("this is req body from client", req.body);
      const { oldPassword, newPassword, confirmPassword, otpNumber } = req.body;
      if (!newPassword || !confirmPassword) {
        res.status(400).json({ message: "Data fields missing" });
        return next(Error("Data fields missing"));
      }
      const userDB = await User.findById(user?.id);
      if (userDB) {
        if (oldPassword === "") {
          const dbOtp = await OTP.findOne({ email: "" });
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
              const resetingUser = await User.findByIdAndUpdate(user?.id, {
                password: hashNewPass,
              });
              res.status(200).json({
                status: "success",
                message: "Password Updated",
                role: resetingUser?.role,
              });
            } else {
              console.log("Invalid OTP");
              res.status(400).json({ message: "Invalid OTP Number" });
            }
          } else {
            console.log("email not exists in the db");
            res.status(404).json({ message: "Resend OTP and Try Again" });
          }
        } else {
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
          const resetingUser = await User.findByIdAndUpdate(user?.id, {
            password: hashNewPass,
          });
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
      const user = req.user;
      if (user) {
        const userExists = await User.findById(user.id);
        console.log("Reached at the otp send")
        if (!userExists?._id) {
          res.status(404).json({ message: "Can't find email" });
        }
        await sendEmailOtp("", "", userExists?.email as string);
        res
          .status(200)
          .json({ status: "success", message: "OTP send sucessfully" });
      }
    } catch (error) {
      console.log(error);
      return next(Error("Email send failed"));
    }
  }

  async mentorshipApply(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.user;
      if (user) {
        console.log("This is the user --> ", user);
      }
    } catch (error) {
      console.log(error);
      return next(Error("Email send failed"));
    }
  }
}
