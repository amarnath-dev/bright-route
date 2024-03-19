import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import menteeRouter from "./routes/menteeRoutes";
import mentorRouter from "./routes/mentorRoutes";
import adminRouter from "./routes/adminRoutes";
import chatRouter from "./routes/chatRoutes";
import notificationRouter from "./routes/notificationRoutes";
import forgotPassControl from "./routes/globalRoutes";
import { limiter } from "./middleware/authLimit";

const app = express();
dotenv.config();
const corsConfig = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsConfig));
// app.use(limiter);

//routes
app.use("/api", menteeRouter);
app.use("/api/mentor", mentorRouter);
app.use("/api/admin", adminRouter);
app.use("/api/chat", chatRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/password/", forgotPassControl);

export default app;
