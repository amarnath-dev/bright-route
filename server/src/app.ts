import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import menteeRouter from "./routes/menteeRoutes";
import mentorRouter from "./routes/mentorRoutes";


const app = express();
dotenv.config();
const corsConfig = {
  origin: "http://localhost:5174",
  credentials: true,
};

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsConfig));

//routes
app.use("/api", menteeRouter);
app.use("/api/mentor", mentorRouter);

export default app;
