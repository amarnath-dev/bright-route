import { Request, Response, NextFunction } from "express";
import MentorModel from "../models/mentorProfileModel";
import { ObjectId } from "mongodb";
import Plans from "../models/mentorPlansModel";

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
          { $match: { mentor_id: new ObjectId(user.id) } },
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
      const user = req.user;
      if (user) {
        const skills = req.body.defaultSkills;
        const arrayOfStrings = skills.map(
          (obj: { title: string }) => obj.title
        );
        const newDetails = req.body.mentorData;
        const update = await MentorModel.findOneAndUpdate(
          {
            mentor_id: new ObjectId(user.id),
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

  async createPlan(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.user;

      const existingDocument = await Plans.findOne({ mentor_id: user?.id });

      if (existingDocument && existingDocument.planDetails.length >= 2) {
        res.status(400).json({
          status: "failed",
          message: "User can only have up to two plans",
        });
        return;
      }

      const newPlanDetails = {
        planAmount: req.body.planAmount,
        planType: req.body.planType,
        planDescription: req.body.planDescription,
        planServices: [
          {
            serviceName: req.body.videoCallSession,
            serviceCount: parseInt(req.body.videoCallCount),
          },
          {
            serviceName: req.body.chatSessions,
            serviceCount: null,
          },
          {
            serviceName: req.body.handsOnSupport,
            serviceCount: null,
          },
        ],
      };

      if (existingDocument) {
        existingDocument.planDetails.push(newPlanDetails);
        const updatedDocument = await existingDocument.save();

        res.status(200).json({
          status: "success",
          message: "Plan added successfully",
          plan: updatedDocument,
        });
      } else {
        const planDetails = new Plans({
          mentor_id: user?.id,
          planDetails: [newPlanDetails],
        });

        const savedPlan = await planDetails.save();

        res.status(201).json({
          status: "success",
          message: "Plan created successfully",
          plan: savedPlan,
        });
      }
    } catch (error) {
      console.error(error);
      return next(Error("Plan Creation failed"));
    }
  }


  async getPlans(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.user;
      const plans = await Plans.findOne({ mentor_id: user?.id });
      if (plans?._id) {
        res.status(200).json({ status: "success", plans });
      }
    } catch (error) {
      console.error(error);
      return next(Error("Plan Creation failed"));
    }
  }
}
