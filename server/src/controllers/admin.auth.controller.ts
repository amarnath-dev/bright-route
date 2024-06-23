import { Request, Response } from "express";
import CryptoJS from "crypto-js";
import Admin from "../models/Admin";
import Jwt from "jsonwebtoken";

export class AdminAuthControls {
  async adminLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: "Invalid Credentials" });
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
        }
      } else {
        res.status(400).json({ message: "Email Not Exists" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An internal server error occurred" });
    }
  }
}
