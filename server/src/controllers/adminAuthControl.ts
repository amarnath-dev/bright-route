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
        return next(Error("Invalid Credentials"));
      }
      const emailExists = await Admin.findOne({ email });
      if (emailExists?._id) {
        const dbPassword = CryptoJS.AES.decrypt(
          emailExists?.password,
          "ecryptionkey"
        ).toString(CryptoJS.enc.Utf8);
        console.log(dbPassword);
        if (password == dbPassword) {
          const token = generateJWT(emailExists?._id, emailExists?.email);
          console.log("tokene", token);
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
        } else {
          res.status(400).json({ message: "Incorrect Password" });
          return next(Error("Incorrect Password"));
        }
      } else {
        res.status(400).json({ message: "Email Not Exists" });
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
