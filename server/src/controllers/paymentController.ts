import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_KEY as string);

export class PaymentControls {
  async payment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log("Reached at the server");
      const { tokenId, amount } = req.body;
      console.log("--->", tokenId);
      console.log("--->", amount);
      stripe.charges.create({
        source: tokenId,
        amount: amount,
        currency: "usd",
      });
      (stripeErr: any, stripeRes: any) => {
        if (stripeErr) {
          console.log("This is the strip error message", stripeErr);
          res.status(400).json({ message: "stripe error" });
        } else {
          res.status(200).json({
            status: "success",
            message: "stripe payment successfull 🤝",
            stripeRes,
          });
        }
      };
    } catch (error) {
      console.error(error);
      return next(Error("Data fetch failed"));
    }
  }
}
