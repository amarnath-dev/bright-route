import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";

interface CustomRequest extends Request {
  roles?: string;
}

export const verifyJWT = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader: any =
      req.headers.authorization || req.headers.Authorization;
    const accessToken = authHeader;
    Jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRETE as string,
      (err: any, decoded: any) => {
        if (err) {
          console.log("Access Token Not Found in Request");
          return res.status(403).json({
            message: "Access Token Not Found",
          });
        }
        req.user = decoded.UserInfo;
        next();
      }
    );
  } catch (error) {
    console.log("Middleware Error");
    console.log(error);
  }
};
