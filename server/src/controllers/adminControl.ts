import { Request, Response, NextFunction } from "express";
import MentorProfile from "../models/mentorProfileModel";
import MenteeProfile from "../models/menteeProfileModel";
import User from "../models/userModel";
import { ObjectId } from "mongodb";

export class AdminControls {
  async mentorApplications(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const applicationData = await MentorProfile.aggregate([
        { $match: { profile_state: "pending" } },
        {
          $lookup: {
            from: "users",
            localField: "mentor_id",
            foreignField: "_id",
            as: "mentorEmail",
          },
        },
        {
          $set: {
            mentorEmail: { $arrayElemAt: ["$mentorEmail.email", 0] },
          },
        },
      ]);
      if (applicationData) {
        res
          .status(200)
          .json({ status: "success", applications: applicationData });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return next(error);
      }
    }
  }

  async singleApplication(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const applicationId = new ObjectId(req.params.applicationId);
      console.log("this is aplication id", applicationId);
      const applicationData = await MentorProfile.aggregate([
        { $match: { _id: applicationId } },
        {
          $lookup: {
            from: "users",
            localField: "mentor_id",
            foreignField: "_id",
            as: "mentorEmail",
          },
        },
        {
          $set: {
            mentorEmail: { $arrayElemAt: ["$mentorEmail.email", 0] },
          },
        },
      ]);

      if (applicationData) {
        res
          .status(200)
          .json({ status: "success", applications: applicationData });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return next(error);
      }
    }
  }

  async approveApplication(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const applicationId = req.params.applicationId;
      const result = await MentorProfile.findByIdAndUpdate(applicationId, {
        profile_state: "approved",
      });
      if (result) {
        res
          .status(200)
          .json({ status: "success", message: "Application Approved" });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return next(error);
      }
    }
  }

  async rejectApplication(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const applicationId = req.params.applicationId;
      const result = await MentorProfile.findByIdAndUpdate(applicationId, {
        profile_state: "rejected",
      });
      if (result) {
        res
          .status(200)
          .json({ status: "success", message: "Application Rejected" });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return next(error);
      }
    }
  }

  async getMentors(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const mentees = await MenteeProfile.find();
      res.status(200).json({ status: "success", mentees });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return next(error);
      }
    }
  }
}
