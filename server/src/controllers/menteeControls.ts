import { Response, Request, NextFunction } from "express";
import MentorModel from "../models/mentorProfileModel";

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

  // search mentors
  async mentorSearch(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { str, company, skill } = req.query as {
        str: string;
        company: string;
        skill: string;
      };

      console.log("->", str);
      console.log("->", company);
      console.log("->", skill);

      const query: any = {};

      if (str !== "undefined" && str !== "") {
        query.job_title = { $regex: new RegExp(str, "i") };
      }

      if (company !== "undefined" && company !== "") {
        query.company = { $regex: new RegExp(company, "i") };
      }

      if (skill !== "undefined" && skill !== "") {
        query.skills = { $in: [skill] };
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
      if (error instanceof Error) {
        console.log(error);
        return next(Error("Mentor filtering Failed"));
      }
    }
  }
}
