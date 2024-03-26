import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";

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
        const userRole = req.headers?.Role;
        Jwt.verify(
          accessToken,
          process.env.ACCESS_TOKEN_SECRETE as string,
          (err: any, decoded: any) => {
            if (err) {
              return res.status(403).json({
                message: "Access Token Not Found",
              });
            }
            console.log("User Info", decoded.UserInfo);
            if (
              !roles.includes(
                decoded.UserInfo?.roles || userRole !== decoded.UserInfo?.roles
              )
            ) {
              return next(new Error("Unauthorized: Role not allowed"));
            } else {
              req.user = decoded.UserInfo;
              next();
            }
          }
        );
      } catch (error) {
        console.log("Middleware Error");
        console.log(error);
      }
    };
  }
}
