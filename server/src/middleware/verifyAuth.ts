import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import Jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export interface CustomRequest extends Request {
  roles?: string;
}

export class Authentication {
  public static ensureAuth(roles: string[]) {
    return async (req: CustomRequest, res: Response, next: NextFunction) => {
      try {
        const authHeader: any =
          req.headers.authorization || req.headers.Authorization;
        const accessToken = authHeader;
        Jwt.verify(
          accessToken,
          process.env.ACCESS_TOKEN_SECRETE as string,
          async (err: any, decoded: any) => {
            if (err) {
              return res.status(403).json({
                message: "Access Token Not Found",
              });
            }
            const userExists = await User.findOne(
              { _id: new ObjectId(decoded.UserInfo?.id) },
              { is_blocked: false }
            );
            if (!userExists) {
              return next(new Error("Unauthorized Access"));
            }
            console.log(roles)
            if (!roles.includes(userExists?.role)) {
              return next(new Error("Unauthorized: Role not Allowed"));
            } else {
              req.user = decoded.UserInfo;
              next();
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
  }
}
