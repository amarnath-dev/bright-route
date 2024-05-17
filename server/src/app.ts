import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import menteeRouter from "./routes/mentee.routes";
import mentorRouter from "./routes/mentor.routes";
import adminRouter from "./routes/admin.routes";
import chatRouter from "./routes/chat.routes";
import notificationRouter from "./routes/notification.routes";
import forgotPassControl from "./routes/common.routes";

const app = express();
dotenv.config();
const corsConfig = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsConfig));

app.use("/api", menteeRouter);
app.use("/api/mentor", mentorRouter);
app.use("/api/admin", adminRouter);
app.use("/api/chat", chatRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/password/", forgotPassControl);

export default app;
