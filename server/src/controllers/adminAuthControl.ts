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
      const { email, password } = req.body.adminData;
      if (!email || !password) {
        res.status(400);
        console.log("email password null");
        return next(Error("Invalid Credentials"));
      }
      const emailExists = await Admin.findOne({ email });
      console.log("email exists", emailExists);
      if (emailExists?._id) {
        console.log("email exists woith id");
        const dbPassword = CryptoJS.AES.decrypt(
          emailExists?.password,
          "ecryptionkey"
        ).toString(CryptoJS.enc.Utf8);
        console.log(dbPassword);
        if (password == dbPassword) {
          console.log("password matched");
          const token = generateJWT(emailExists?._id, emailExists?.email);
          console.log("tokne", token);
          res.status(200).json({
            status: "success",
            message: "Admin Login Successfull",
            admin: {
              _id: emailExists?._id,
              email: emailExists?.email,
              role: emailExists.role,
              token: token,
            },
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
