import { Request, Response, NextFunction } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import mongoose, { Document } from "mongoose";
import Admin from "../models/adminModal";
import userModel from "../models/userModel";

declare module "express" {
  interface Request {
    user?: Document;
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decode = Jwt.verify(token, "jwtsecrete") as JwtPayload;
      const userId = new mongoose.Types.ObjectId(decode.id);
      const user = await userModel.findById(userId);
      if (!user) {
        res.status(401);
        next(Error("Unauthorized user"));
      } else if (user.is_blocked) {
        res.status(401);
        next(new Error("Account has been blocked"));
      } else {
        req.body.user = user;
      }
      next();
    } catch (error) {
      res.status(401);
      next(Error("Not Authorized, token failed"));
    }
  } else {
    res.status(401);
    next(new Error("Token auth failed"));
  }
};

//Admin Route Protection
declare module "express" {
  interface Request {
    admin?: Document;
  }
}

export const protectAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = Jwt.verify(token, "jwtsecrete") as JwtPayload;
      const adminId = new mongoose.Types.ObjectId(decoded.id);
      const admin = await Admin.findById(adminId);
      if (!admin || admin.role !== "admin") {
        res.status(401);
        throw new Error("Unauthorized Admin");
      } else {
        req.admin = admin;
      }
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized,token does not exits");
  }
};
