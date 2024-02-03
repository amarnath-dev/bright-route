import { Request, Response, NextFunction } from "express";
import MentorModel from "../models/mentorProfileModel";

export class MentorController {
  async mentorprofileDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.user;
      if (user) {
        const mentorProfile = await MentorModel.aggregate([
          { $match: { mentor_id: user._id, approved: true } },
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
          {
            $project: {
              why_mentor: 0,
              achievement: 0,
            },
          },
        ]);

        if (mentorProfile) {
          res
            .status(200)
            .json({ status: "sucess", mentorDetails: mentorProfile });
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return next(error);
      }
    }
  }
}
