import { Request, Response, NextFunction } from "express";
import MentorProfile from "../models/mentorProfileModel";
import User from "../models/userModel";
import { ObjectId } from "mongodb";
import { MonthlyUserEntry } from "../Interfaces";

export class AdminControls {
  async mentorApplications(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const applications = await MentorProfile.aggregate([
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
      if (applications) {
        res.status(200).json({ status: "success", applications });
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
      console.log("Application Data", applicationData);
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

  async getMentees(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const mentees = await User.aggregate([
        { $match: { role: "mentee" } },
        {
          $lookup: {
            from: "menteeprofiles",
            foreignField: "mentee_id",
            localField: "_id",
            as: "profileDetails",
          },
        },
        {
          $unwind: "$profileDetails",
        },
      ]);
      if (mentees) {
        res.status(200).json({ status: "success", mentees });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return next(error);
      }
    }
  }
  async blockUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.params?.userId;
      const update = await User.findByIdAndUpdate(userId, { is_blocked: true });
      if (update) {
        res.status(200).json({ status: "success", message: "User Blocked" });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return next(error);
      }
    }
  }
  async unBlock(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userId = req.params?.userId;
      const update = await User.findByIdAndUpdate(userId, {
        is_blocked: false,
      });
      if (update) {
        res.status(200).json({ status: "success", message: "User UnBlocked" });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return next(error);
      }
    }
  }
  async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log(req.body);
      const query = req.body.search;
      console.log("In Server", query);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
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
      const mentors = await User.aggregate([
        { $match: { role: "mentor" } },
        {
          $lookup: {
            from: "mentorprofiles",
            foreignField: "mentor_id",
            localField: "_id",
            as: "profileDetails",
          },
        },
        {
          $unwind: "$profileDetails",
        },
        {
          $lookup: {
            from: "mentorreports",
            foreignField: "mentor_id",
            localField: "_id",
            as: "mentorReports",
          },
        },
      ]);
      if (mentors) {
        res.status(200).json({ status: "success", mentors });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return next(error);
      }
    }
  }

  async getMonthlyUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const year = req.params.year;
      const monthMap: Record<number, string> = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December",
      };
      const monthlyUsers = await User.aggregate([
        {
          $group: {
            _id: { $month: "$createdAt" },
            count: { $sum: 1 },
          },
        },
      ]);
      const monthlyData: Record<string, number> = {};
      monthlyUsers.forEach((entry: MonthlyUserEntry) => {
        const monthName = monthMap[entry._id];
        monthlyData[monthName] = entry.count;
      });
      res.json({ monthlyData });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
  async getAnalytics(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log("Request User", req.user);
      const mentees = await User.find({ role: "mentee" }).countDocuments();
      const mentors = await User.find({ role: "mentor" }).countDocuments();
      if (mentees > 0 && mentors > 0) {
        res.json({ mentees, mentors });
      } else {
        res.status(404).json({ error: "No data found" });
      }
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
}
