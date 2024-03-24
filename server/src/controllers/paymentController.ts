import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY as string);
import Payment from "../models/paymentModel";
import Room from "../models/roomModel";

export class PaymentControls {
  async payment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 5,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      console.log(paymentIntent);
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error(error);
      return next(Error("Data fetch failed"));
    }
  }
  async storePaymentData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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
      return next(Error("Data fetch failed"));
    }
  }
}
