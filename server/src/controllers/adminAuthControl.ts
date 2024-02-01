import { Request, Response, NextFunction } from "express";
import CryptoJS from "crypto-js";
import Admin from "../models/adminModal";
import generateJWT from "../utils/generateJWT";

export class AdminAuthControls {
  async adminLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400);
        return next(Error("Invalid Credentials"));
      }
      const emailExists = await Admin.findOne({ email });
      if (emailExists?._id) {
        const dbPassword = CryptoJS.AES.decrypt(
          emailExists?.password,
          "ecryptionkey"
        ).toString(CryptoJS.enc.Utf8);

        if (password === dbPassword) {
          const token = generateJWT(emailExists?._id, emailExists?.email);
          res.status(200).json({
            status: "success",
            message: "Admin Login Successfull",
            admin: {
              _id: emailExists?._id,
              email: emailExists?.email,
            },
            token,
          });
        }
      } else {
        res.status(404);
        return next(Error("Email Not Exists"));
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return next(error);
      }
    }
  }
}
