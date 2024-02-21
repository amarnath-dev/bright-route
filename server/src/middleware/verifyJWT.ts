import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  roles?: string[];
}

export const verifyJWT = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader: any =
      req.headers.authorization || req.headers.Authorization;
    // if (!authHeader?.startsWith("Bearer ")) {
    //   return res
    //     .status(401)
    //     .json({ message: "Unauthorized not starting with Bearer" });
    // }
    // const accessToken = authHeader.split(" ")[1];
    const accessToken = authHeader;
    Jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRETE as string,
      (err: any, decoded: any) => {
        if (err) {
          console.log("Access Token Middleware Error");
          return res.status(403).json({
            message: "Forbidden Token Please sent the refresh token request",
          });
        }
        req.user = decoded.UserInfo;
        next();
      }
    );
  } catch (error) {
    console.log("VerifyJWT middleware errror");
    console.log(error);
  }
};
