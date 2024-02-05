import { Response, Request, NextFunction } from "express";
import MentorModel from "../models/mentorProfileModel";
import mentorProfileModel from "../models/mentorProfileModel";

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
  skills: [];
  reports: Report[];
  approved: boolean;
}

export class MenteeController {
  async mentorProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const allMentors = await MentorModel.aggregate([
        { $match: { approved: true } },
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
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        const search = req.query.q as string;
        const pattern = /^[a-zA-Z0-9_@]+$/;
        if (!pattern.test(search)) {
          res.status(200).json({
            status: "ok",
            message: "report added",
            userData: [],
          });
        }
        const userData = await mentorProfileModel.aggregate([
          {
            $match: {
              $or: [{ job_title: { $regex: new RegExp(search, "i") } }],
            },
          },
          {
            $project: {
              why_mentor: 0,
              achievement: 0,
            },
          },
        ]);

        console.log("this is user data", userData);
        if (userData) {
          res.status(200).json({
            status: "ok",
            message: "report added",
            userData,
          });
        } else {
          next(new Error("Details Sorting Failed"));
        }
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return next(Error("Data fetch failed"));
      }
    }
  }
}
