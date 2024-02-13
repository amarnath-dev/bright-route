import { Request, Response, NextFunction } from "express";
import MentorModel from "../models/mentorProfileModel";

export class MentorController {
  async mentorprofileDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.body.user;
      console.log(user._id);

      if (user) {
        const mentorProfile = await MentorModel.aggregate([
          { $match: { mentor_id: user._id } },
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
          mentor_id: mentor.mentor_id,
          profile_img: mentor.profile_img ? mentorProfile[0].profile_img : "",
          first_name: mentor.first_name,
          last_name: mentor.last_name,
          job_title: mentor.job_title ? mentor.job_title : "",
          mentorEmail: mentor.mentorEmail[0].email,
          linkedIn: mentor.linkedIn ? mentor.linkedIn : "",
          twitter: mentor.twitter ? mentor.twitter : "",
          web_url: mentor.web_url ? mentor.web_url : "",
          bio: mentor.bio ? mentor.bio : "",
          skills: mentor.skills,
          state: mentor.state,
          company: mentor.company ? mentor.company : "",
          category: mentor.category,
          role: mentor.mentorEmail[0].role,
        };

        if (mentorProfile) {
          res.status(200).json({ status: "sucess", mentorDetails });
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return next(error);
      }
    }
  }

  async updateProfileImg(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.body.user;
      if (user) {
        const update = await MentorModel.findOneAndUpdate(
          { mentor_id: user._id },
          { $set: { profile_img: req.body.img_firebase_id } },
          { new: true }
        );
        if (update?._id) {
          res
            .status(200)
            .json({ status: "success", message: "Profile Image Updated" });
        }
      }
    } catch (error) {
      console.log(error);
      return next(Error("Profile Image Update Failed"));
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
        const skills = req.body.defaultSkills;
        const arrayOfStrings = skills.map(
          (obj: { title: string }) => obj.title
        );
        const newDetails = req.body.mentorData;
        console.log("this is request body bio", newDetails.bio);
        const update = await MentorModel.findOneAndUpdate(
          {
            mentor_id: user._id,
          },
          {
            $set: {
              profile_img: newDetails.profile_img,
              first_name: newDetails.first_name,
              last_name: newDetails.last_name,
              job_title: newDetails.job_title,
              linkedIn: newDetails.linkedIn,
              twitter: newDetails.twitter,
              web_url: newDetails.web_url,
              bio: newDetails.bio,
              company: newDetails.company,
              state: newDetails.state,
              category: newDetails.category,
              skills: arrayOfStrings,
            },
          },
          { new: true }
        );
        if (update?._id) {
          res
            .status(200)
            .json({ status: "success", message: "Profile Updated" });
        }
      }
    } catch (error) {
      console.log(error);
      return next(Error("Profile Update Failed"));
    }
  }
}
