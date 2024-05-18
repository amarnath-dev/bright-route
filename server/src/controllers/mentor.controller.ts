import { Request, Response } from "express";
import MentorModel from "../models/Mentor";
import { ObjectId } from "mongodb";
import Plans from "../models/Plan";
import Payment from "../models/Payment";
import { Plan } from "../interfaces/controller.interface";
import { SinglePlan } from "../interfaces/controller.interface";

interface PlanDetails {
  planAmount: number;
  planType: string;
  planDescription: string;
  planServices: { serviceName: string; serviceCount: number | null }[];
  isDeleted: boolean;
  mentor_id: string;
  _id: string;
}

export class MentorController {
  async mentorprofileDetails(req: Request, res: Response): Promise<void> {
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
      console.log(error);
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }

  async updateProfileImg(req: Request, res: Response): Promise<void> {
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
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }

  async updateProfile(req: Request, res: Response): Promise<void> {
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
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }

  async createPlan(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;
      const existingDocument = await Plans.findOne({
        mentor_id: new ObjectId(user?.id),
      });
      console.log("Before filtering", existingDocument);
      if (existingDocument) {
        const activePlans = (
          existingDocument.planDetails as unknown as PlanDetails[]
        ).filter((plan) => !plan.isDeleted);
        console.log("Active plans len", activePlans.length);
        if (activePlans.length >= 2) {
          res.status(200).json({
            status: "exists",
            message: "User can only have up to two plans",
          });
          return;
        }
      }
      const newPlanDetails = {
        mentor_id: req.user?.id,
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
      if (existingDocument?._id) {
        existingDocument.planDetails.push(newPlanDetails);
        const updatedDocument = await existingDocument.save();
        res.status(200).json({
          status: "success",
          message: "Plan added successfully",
          plan: updatedDocument,
        });
        return;
      } else {
        const planDetails = new Plans({
          mentor_id: user?.id,
          planDetails: [newPlanDetails],
        });
        const savedPlan = await planDetails.save();
        if (savedPlan) {
          await MentorModel.findOneAndUpdate(
            { mentor_id: new ObjectId(user?.id) },
            { $set: { isPaymentDetails: true } }
          );
        }
        res.status(201).json({
          status: "success",
          message: "Plan created successfully",
          plan: savedPlan,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }

  async getPlans(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;
      const mentorId = req.params.mentorId;
      const plans: Plan | null = await Plans.findOne({
        mentor_id: new ObjectId(mentorId),
      });
      if (plans?.planDetails && plans.planDetails.length > 0) {
        const activePlans = plans.planDetails.filter(
          (plan) => plan.isDeleted === false
        );
        const isPurchased = await Payment.findOne({
          mentor_id: new ObjectId(mentorId),
          mentee_id: new ObjectId(user?.id),
        });
        if (!isPurchased) {
          res.status(200).json({ status: "success", plans: activePlans });
        } else {
          res.status(200).json({ status: "exists" });
        }
      } else {
        res.status(200).json({ status: "Not plans Exists" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }

  async deletePlan(req: Request, res: Response): Promise<void> {
    try {
      const planId = req.params.planId;
      if (planId) {
        const updateResult = await Plans.updateOne(
          { "planDetails._id": new ObjectId(planId) },
          { $set: { "planDetails.$.isDeleted": true } }
        );
        if (updateResult.modifiedCount > 0) {
          res
            .status(200)
            .json({ status: "success", message: "Plan Deleted Successfully" });
        } else {
          res.status(404).json({ status: "failed", message: "Plan not found" });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }

  async menteeApllication(req: Request, res: Response): Promise<void> {
    try {
      const user = req?.user;
      const mentorApplication = await Payment.aggregate([
        {
          $match: { mentor_id: new ObjectId(user?.id) },
        },
        {
          $lookup: {
            from: "menteeprofiles",
            localField: "mentee_id",
            foreignField: "mentee_id",
            as: "menteeDetails",
          },
        },
        {
          $unwind: "$menteeDetails",
        },
      ]);
      if (mentorApplication) {
        res.status(200).json({ status: "success", mentorApplication });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }

  async paymentDetails(req: Request, res: Response): Promise<void> {
    try {
      const paymentId = req.params.paymentId;
      const paymentDetails = await Payment.findById(paymentId);
      if (paymentDetails?._id) {
        res.status(200).json({ status: "success", paymentDetails });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }

  async planDetails(req: Request, res: Response): Promise<void> {
    try {
      const planId = req.params.planId;
      if (planId) {
        const plan = await Plans.find(
          { "planDetails._id": new ObjectId(planId) },
          { "planDetails.$": 1 }
        );
        if (plan) {
          res.status(200).json({ plan: plan[0]?.planDetails[0] });
        } else {
          console.log("Plan not found in database");
        }
      } else {
        console.log("Plan ID not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }

  async checkPlan(req: Request, res: Response): Promise<void> {
    try {
      const planId = req.params?.planId;
      if (planId) {
        const plan: SinglePlan | null = await Plans.findOne({
          "planDetails._id": planId,
        });

        if (plan?._id) {
          const applyPlan = plan.planDetails.find(
            (p) => p?._id.toString() === planId
          );

          if (applyPlan) {
            if (applyPlan.isDeleted) {
              res
                .status(200)
                .json({ status: "failed", mentorId: applyPlan?.mentor_id });
            } else {
              res
                .status(200)
                .json({ status: "success", message: "Plan is valid" });
            }
          } else {
            res
              .status(404)
              .json({ status: "failed", message: "Plan not found" });
          }
        } else {
          res.status(404).json({ status: "failed", message: "Plan not found" });
        }
      } else {
        res
          .status(400)
          .json({ status: "failed", message: "Plan ID not found" });
      }
    } catch (error) {
      console.log("Error checking plan:", error);
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }

  async getExpired(req: Request, res: Response): Promise<void> {
    try {
      const mentor = req?.user;
      if (mentor) {
        const expired = await Payment.aggregate([
          {
            $match: {
              mentor_id: new ObjectId(mentor.id),
              isExpired: true,
            },
          },
          {
            $lookup: {
              from: "menteeprofiles",
              localField: "mentee_id",
              foreignField: "mentee_id",
              as: "menteeDetails",
            },
          },
          {
            $unwind: "$menteeDetails",
          },
        ]);
        res.status(200).json({ status: "success", expired });
      } else {
        console.log("Mentor Object Not Found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }
}
