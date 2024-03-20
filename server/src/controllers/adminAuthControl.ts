import { Request, Response, NextFunction } from "express";
import CryptoJS from "crypto-js";
import Admin from "../models/adminModal";
import Jwt from "jsonwebtoken";

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
      if (emailExists) {
        const dbPassword = CryptoJS.AES.decrypt(
          emailExists?.password,
          process.env.HASH_KEY as string
        ).toString(CryptoJS.enc.Utf8);
        if (password === dbPassword) {
          const accessToken = Jwt.sign(
            {
              UserInfo: {
                id: emailExists?._id,
                email: emailExists?.email,
                roles: emailExists?.role,
              },
            },
            process.env.ACCESS_TOKEN_SECRETE as string,
            { expiresIn: "3d" }
          );

          const refreshToken = Jwt.sign(
            { email: emailExists?.email },
            process.env.REFRESH_TOKEN_SECRETE as string,
            { expiresIn: "7d" }
          );
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });
          res.status(200).json({
            status: "success",
            user: {
              _id: emailExists?._id,
              first_name: "admin",
              email: emailExists?.email,
              role: emailExists?.role,
            },
            accessToken,
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
