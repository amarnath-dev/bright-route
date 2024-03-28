import { Response, Request, NextFunction } from "express";
import MentorModel from "../models/mentorProfileModel";
import MenteeModel from "../models/menteeProfileModel";
import mongoose from "mongoose";
import User from "../models/userModel";
import CryptoJS from "crypto-js";
import sendEmailOtp from "../utils/sendEmail";
import OTP from "../models/otpModel";
import Plans from "../models/mentorPlansModel";
import Report from "../models/mentorReportModel";
import { ObjectId } from "mongodb";
// import PaymentModel from "../models/PaymentModel";
import PaymentModel from "../models/paymentModel";

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

  async reportMentor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const mentorId = req.params.mentorId;
      const reportDetails = req.body;
      if (mentorId && reportDetails) {
        const existingReport = await Report.findOne({ mentor_id: mentorId });
        if (existingReport) {
          existingReport.ReportDetails.push({
            issue_faced: reportDetails?.issueFaced,
            issue_desc: reportDetails?.issueDescription,
            report_date: reportDetails?.date,
          });
          await existingReport.save();
        } else {
          const report = new Report({
            mentor_id: mentorId,
            mentee_id: req.user?.id,
            ReportDetails: [
              {
                issue_faced: reportDetails.issueFaced,
                issue_desc: reportDetails.issueDescription,
                report_date: reportDetails.date,
              },
            ],
          });
          await report.save();
        }
        res
          .status(200)
          .json({ status: "success", message: "Report Submitted" });
      } else {
        res
          .status(400)
          .json({ status: "error", message: "Report submission failed" });
      }
    } catch (error) {
      console.log(error);
      return next(Error("Report submission failed"));
    }
  }


  async menteeProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const mentee_id = req.params.menteeId;
      const menteeDetails = await User.aggregate([
        { $match: { _id: new ObjectId(mentee_id) } },
        {
          $lookup: {
            from: "menteeprofiles",
            localField: "_id",
            foreignField: "mentee_id",
            as: "menteeProfile",
          },
        },
        {
          $unwind: "$menteeProfile",
        },
      ]);
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
      const { oldPassword, newPassword, confirmPassword, otpNumber } = req.body;
      if (!newPassword || !confirmPassword) {
        res.status(400).json({ message: "Data fields missing" });
      }
      const userDB = await User.findById(user?.id);
      if (userDB) {
        if (oldPassword === "") {
          const dbOtp = await OTP.findOne({ email: userDB?.email });
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

  async getProfileImg(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.user;
      const userRole = req.params?.userRole;
      if (user) {
        if (userRole === "mentee") {
          const menteeData = await MenteeModel.findOne({
            mentee_id: user?.id,
          });
          if (menteeData) {
            res.status(200).json({
              status: "success",
              profileImageId: menteeData?.profile_img,
            });
          } else {
            res
              .status(404)
              .json({ status: "error", message: "User not found" });
          }
        } else if (userRole === "mentor") {
          const mentorData = await MentorModel.findOne({
            mentor_id: new ObjectId(user?.id),
          });
          console.log("Metor Data", mentorData);
          if (mentorData) {
            res.status(200).json({
              status: "success",
              profileImageId: mentorData?.profile_img,
            });
          } else {
            res
              .status(404)
              .json({ status: "error", message: "User not found" });
          }
        }
      } else {
        res
          .status(401)
          .json({ status: "error", message: "Unauthorized access" });
      }
    } catch (error) {
      console.log(error);
      return next(Error("Error retrieving profile image ID"));
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
  async getMyMentors(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.user;
      const mentors = await PaymentModel.aggregate([
        {
          $match: { mentee_id: new ObjectId(user?.id) },
        },
        {
          $lookup: {
            from: "mentorprofiles",
            localField: "mentor_id",
            foreignField: "mentor_id",
            as: "mentorProfile",
          },
        },
      ]);
      if (mentors) {
        res.status(200).json({ status: true, mentors });
      }
    } catch (error) {
      console.log(error);
      return next(Error("Email send failed"));
    }
  }
  async getSorted(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { jobTitle, skill, company } = req.body;
      const query: { [key: string]: any } = {};
      if (jobTitle !== "") {
        query["jobTitle"] = jobTitle;
      }
      if (skill !== "") {
        query["skills"] = skill;
      }
      if (company !== "") {
        query["company"] = company;
      }
      const allMentors = await MentorModel.aggregate([
        { $match: { profile_state: "approved", ...query } },
        {
          $project: {
            why_mentor: 0,
            achievement: 0,
          },
        },
      ]);
      if (allMentors.length > 0) {
        res.status(200).json({ status: "success", allMentors });
      } else {
        res.status(200).json({ status: "empty" });
      }
    } catch (error) {
      console.log(error);
      return next(Error("Email send failed"));
    }
  }
}
