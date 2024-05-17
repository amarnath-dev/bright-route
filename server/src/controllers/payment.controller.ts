import { Request, Response } from "express";
import Payment from "../models/Payment";
import Room from "../models/Room";
import MentorProfile from "../models/Mentor";
import { ObjectId } from "mongodb";

export class PaymentControls {
  async storePaymentData(req: Request, res: Response): Promise<void> {
    try {
      const paymentDetails = new Payment({
        mentor_plan_id: req.body?.mentor_plan_id,
        razorPay_id: req.body?.razorPay_id,
        mentor_id: req.body?.mentor_id,
        mentee_id: req.body?.mentee_id,
        plan_price: req.body?.mentor_plan_amount,
        goal_of_mentorship: req.body?.goal_of_mentorship,
        time_to_reach_goal: req.body?.time_to_reach_goal,
        message_to_mentor: req.body?.message_to_mentor,
      });
      await paymentDetails.save();
      const mentorProfile = await MentorProfile.findOneAndUpdate(
        { mentor_id: new ObjectId(req.body?.mentor_id) },
        { $inc: { spots: -1 } },
        { new: true }
      );
      //Creating the video call room for both user
      const roomExists = await Room.findOne({
        members: { $all: [req.body?.mentee_id, req.body?.mentor_id] },
      });
      if (!roomExists) {
        const roomId = req.body?.mentee_id + req.body?.mentor_id;
        const roomData = new Room({
          members: [req.body.mentor_id, req.body.mentee_id],
          roomId: roomId,
        });
        await roomData.save();
      }
      res
        .status(202)
        .json({ status: "success", message: "Transaction Successfull" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }
}
