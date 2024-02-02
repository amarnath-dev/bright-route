import { Request, Response, NextFunction } from "express";
import MentorProfile from "../models/mentorProfileModel";
import { ObjectId } from "mongodb";

export class AdminControls {
  async mentorApplications(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      //aggregation lookup to get single value from another collection
      const applicationData = await MentorProfile.aggregate([
        { $match: { approved: false } },
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
        approved: true,
      });
      if (result) {
        res.status(200).json({ status: "success" });
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
        approved: false,
      });
      if (result) {
        res.status(200).json({ status: "success" });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return next(error);
      }
    }
  }
}
