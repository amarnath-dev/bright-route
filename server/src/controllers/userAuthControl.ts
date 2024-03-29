import { Request, Response, NextFunction } from "express";
import CryptoJS from "crypto-js";
import User from "../models/userModel";
import Mentorprofile from "../models/mentorProfileModel";
import Menteeprofile from "../models/menteeProfileModel";
import generateJwt from "../utils/generateJWT";
import { IMentorProfile, IUser } from "../Interfaces";
import { IMenteeProfile } from "../Interfaces/index";
import sendEmailOtp from "../utils/sendEmail";
import Otp from "../models/otpModel";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import generateUsername from "../utils/generateUsername";

interface jwtPayload {
  email: string;
  given_name: string;
}

interface GoogleStringAuth {
  email: string;
  name: string;
  picture: string;
}

export class MenteeAuthController {
  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { first_name, last_name, email, password } = req.body;
      if (!first_name || !last_name || !email || !password) {
        res.status(400);
        return next(Error("Data Fields Missing"));
      }
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        res.status(409).json({ message: "Email alredy exists" });
        return next(Error("Email Alredy Exists"));
      }
      //OTP Email Sending
      await sendEmailOtp(first_name, last_name, email);
      res.status(200).json({
        status: "success",
        message: "Successfull",
        user: req.body,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return next(error);
      }
    }
  }

  async signin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: "Data fields missing" });
        return next(Error("Invalid Credentials"));
      }
      const userExists = await User.findOne({ email });
      if (!userExists) {
        res.status(401).json({ message: "Canno't Find Email" });
      } else {
        if (userExists.is_blocked) {
          res.status(401).json({ message: "Your Account has been Blocked" });
          return;
        }
        const dbPassword = CryptoJS.AES.decrypt(
          userExists.password,
          process.env.HASH_KEY as string
        ).toString(CryptoJS.enc.Utf8);
        if (password === dbPassword) {
          const accessToken = Jwt.sign(
            {
              UserInfo: {
                id: userExists._id,
                email: userExists.email,
                roles: userExists.role,
              },
            },
            process.env.ACCESS_TOKEN_SECRETE as string,
            { expiresIn: "3d" }
          );
          const refreshToken = Jwt.sign(
            { email: userExists.email },
            process.env.REFRESH_TOKEN_SECRETE as string,
            { expiresIn: "7d" }
          );
          const userDataFromProfile = await Menteeprofile.findOne({
            mentee_id: userExists?._id,
          });
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });
          res.status(200).json({
            status: "success",
            user: {
              _id: userExists?._id,
              first_name: userDataFromProfile?.first_name,
              email: userExists?.email,
              role: userExists?.role,
            },
            accessToken,
          });
        } else {
          res.status(401).json({ message: "Invalid Password" });
          return next(Error("Invalid Password"));
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return next(error);
      }
    }
  }

  async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const cookies = req.cookies;
      if (!cookies?.refreshToken) {
        res.status(401).json({ message: "Refresh token not exists" });
        return;
      }
      const refreshToken = cookies.refreshToken;
      try {
        const decoded = Jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRETE as string
        );
        const foundUser = await User.findOne({
          email: (decoded as JwtPayload).email,
        });
        if (!foundUser) {
          res.status(401).json({
            message: "Unauthorized user not exists in the database",
          });
          return;
        }
        const accessToken = Jwt.sign(
          {
            UserInfo: {
              id: foundUser._id,
              email: foundUser.email,
              roles: foundUser.role,
            },
          },
          process.env.ACCESS_TOKEN_SECRETE as string,
          { expiresIn: "3d" }
        );
        res.json({ accessToken });
      } catch (err) {
        res.status(403).json({ message: "Forbidden" });
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return next(error);
      }
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cookies = req.cookies;
      if (!cookies?.refreshToken) {
        res.sendStatus(204);
      }
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
      });
      res
        .status(200)
        .json({ status: "success", message: "Log out successfull" });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return next(error);
      }
    }
  }

  async verifyOTP(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { first_name, last_name, email, password, otp } = req.body.userData;
      if (!first_name || !last_name || !email || !password || !otp) {
        res.status(400).json({ message: "Invalid Credentials" });
        return next(Error("Invalid Credentials"));
      }
      const otpData = await Otp.findOne({ email });
      if (!otpData) {
        res.status(404).json({ message: "Resend otp and try Again" });
        return;
      }
      const dbOTP: string = CryptoJS.AES.decrypt(
        otpData.otp,
        process.env.HASH_KEY as string
      ).toString(CryptoJS.enc.Utf8);
      if (dbOTP === otp) {
        const hashedPassword = CryptoJS.AES.encrypt(
          password,
          process.env.HASH_KEY as string
        ).toString();
        const menteeDetails: IUser = new User({
          email,
          password: hashedPassword,
          role: "mentee",
        });
        const user: IUser = await menteeDetails.save();
        if (user) {
          const userProfileDetails: IMenteeProfile = new Menteeprofile({
            mentee_id: user?._id,
            first_name,
            last_name,
          });
          const profileData: IMenteeProfile = await userProfileDetails.save();
          if (profileData) {
            const accessToken = Jwt.sign(
              {
                UserInfo: {
                  id: menteeDetails?._id,
                  email: menteeDetails?.email,
                  roles: menteeDetails?.role,
                },
              },
              process.env.ACCESS_TOKEN_SECRETE as string,
              { expiresIn: "3d" }
            );
            const refreshToken = Jwt.sign(
              { email: menteeDetails?.email },
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
              message: "User Created Successfully",
              user: {
                _id: user?._id,
                first_name: profileData?.first_name,
                email: user?.email,
                role: user?.role,
              },
              accessToken,
            });
          }
        }
      } else {
        res.status(400).json({ message: "Invalid OTP" });
        return next(Error("Invalid OTP"));
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return next(error);
      }
    }
  }

  async resendOTP(req: Request, res: Response, next: NextFunction) {
    try {
      const { first_name, last_name, email, password } =
        req.body.serverResponse;
      if (!first_name || !last_name || !email || !password) {
        res.status(400);
        return next(Error("Invalid Credentials"));
      }
      //OTP Email Sending
      await sendEmailOtp(first_name, last_name, email);
      res
        .status(200)
        .json({ status: "success", message: "Email Re Send Successfully" });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return next(error);
      }
    }
  }

  async googleAuth(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.authString) {
        res
          .status(400)
          .json({ status: "failed", message: "Invalid credentials" });
        return;
      }
      const decodeData: GoogleStringAuth = jwtDecode(req.body.authString);
      const existingUser = await User.findOne({ email: decodeData.email });
      if (existingUser) {
        if (existingUser?.password) {
          res.status(409).json({ message: "User Alredy Exists" });
          return;
        }
        const accessToken = Jwt.sign(
          {
            UserInfo: {
              id: existingUser?._id,
              email: existingUser?.email,
              roles: existingUser?.role,
            },
          },
          process.env.ACCESS_TOKEN_SECRETE as string,
          { expiresIn: "3d" }
        );
        const refreshToken = Jwt.sign(
          { email: existingUser?.email },
          process.env.REFRESH_TOKEN_SECRETE as string,
          { expiresIn: "7d" }
        );
        const userDataFromProfile = await Menteeprofile.findOne({
          mentee_id: existingUser?._id,
        });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
          status: "success",
          user: {
            _id: existingUser?._id,
            first_name: userDataFromProfile?.first_name,
            email: existingUser?.email,
            role: existingUser?.role,
          },
          accessToken,
        });
      } else {
        const menteeDetails: IUser = new User({
          email: decodeData.email,
          password: "",
          role: "mentee",
        });
        const user: IUser = await menteeDetails.save();
        if (user) {
          const userProfileDetails: IMenteeProfile = new Menteeprofile({
            mentee_id: user?._id,
            first_name: decodeData.name,
            last_name: "",
          });
          const profileData: IMenteeProfile = await userProfileDetails.save();
          if (profileData) {
            const accessToken = Jwt.sign(
              {
                UserInfo: {
                  id: user?._id,
                  email: user?.email,
                  roles: user?.role,
                },
              },
              process.env.ACCESS_TOKEN_SECRETE as string,
              { expiresIn: "3d" }
            );
            const refreshToken = Jwt.sign(
              { email: user?.email },
              process.env.REFRESH_TOKEN_SECRETE as string,
              { expiresIn: "7d" }
            );
            res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              secure: false,
              maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            const userDataFromProfile = await Menteeprofile.findOne({
              mentee_id: user?._id,
            });
            res.status(200).json({
              status: "success",
              user: {
                _id: user?._id,
                first_name: userDataFromProfile?.first_name,
                email: user?.email,
                role: user?.role,
              },
              accessToken,
            });
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return next(error);
      }
    }
  }

  async checkToken(req: Request, res: Response, next: NextFunction) {
    try {
      const cookies = req.cookies;
      console.log(cookies)
      if (cookies.refreshToken) {
        res.json({ status: "exists" });
      } else {
        res.json({ status: "not exists" });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        console.log(error.message);
        return next(error);
      }
    }
  }
}

export class MentorAuthController {
  async apply(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.body.mentorData || !req.body.firebase_img_id) {
        res.status(400);
        return next(Error("Invalid credentials"));
      }

      const data = req.body.mentorData;
      const img_str = req.body.firebase_img_id;
      const mentorEmail = data.email;
      const emailExists = await User.findOne({ mentorEmail });
      if (emailExists) {
        res.status(409);
        return next(Error("Email Alredy Exists"));
      }
      const hashedPassword: any = CryptoJS.AES.encrypt(
        data.password,
        process.env.HASH_KEY as string
      ).toString();
      const mentor: IUser = new User({
        email: mentorEmail,
        password: hashedPassword,
        role: "mentor",
      });
      const saveMentor = await mentor.save();
      if (saveMentor.email) {
        const mentorProfileData: IMentorProfile = new Mentorprofile({
          mentor_id: saveMentor?._id,
          first_name: data?.first_name,
          last_name: data?.last_name,
          job_title: data?.job_title,
          company: data?.company,
          state: data?.state,
          category: data?.job_category,
          job_category: data?.state,
          skills: data?.skills,
          bio: data?.bio_dec,
          linkedIn: data?.linkedIn_url,
          twitter: data?.twitter_url,
          web_url: data?.website_url,
          why_mentor: data?.why_mentor,
          achievement: data?.achievement,
          profile_img: img_str,
        });
        const mentorProfileSave = await mentorProfileData.save();
        if (mentorProfileSave) {
          res.status(200).json({
            status: "success",
            message: "Mentor Applied Successfully",
          });
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return next(error);
      }
    }
  }

  async mentorLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body.mentorData;
      if (!email || !password) {
        res.status(400).json({ message: "Data fields missing" });
        return next(Error("Invalid Credentials"));
      }
      const userExists = await User.findOne({ email });
      if (!userExists) {
        res.status(401).json({ message: "Canno't Find Email" });
        return next(Error("Invalid Email"));
      } else {
        if (userExists.is_blocked) {
          res.status(401).json({ message: "Your Account has been Blocked" });
          return;
        }
        if (userExists.role !== "mentor") {
          res.status(400).json({ message: "Invalid Email" });
          return next(Error("Incorect Email"));
        }
        const dbPassword = CryptoJS.AES.decrypt(
          userExists.password,
          process.env.HASH_KEY as string
        ).toString(CryptoJS.enc.Utf8);
        if (password === dbPassword) {
          const accessToken = Jwt.sign(
            {
              UserInfo: {
                id: userExists._id,
                email: userExists.email,
                roles: userExists.role,
              },
            },
            process.env.ACCESS_TOKEN_SECRETE as string,
            { expiresIn: "30m" }
          );
          const refreshToken = Jwt.sign(
            { email: userExists.email },
            process.env.REFRESH_TOKEN_SECRETE as string,
            { expiresIn: "7d" }
          );
          //Getting mentor name because both stored in different
          //collections user and mentorprofile
          const mentorDataFromProfile = await Mentorprofile.findOne({
            mentor_id: userExists?._id,
          });
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });
          res.status(200).json({
            status: "success",
            user: {
              _id: userExists?._id,
              first_name: mentorDataFromProfile?.first_name,
              email: userExists?.email,
              role: userExists?.role,
            },
            accessToken,
          });
        } else {
          res.status(401).json({ message: "Incorrect Password" });
          return next(Error("Invalid Password"));
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return next(error);
      }
    }
  }
}
