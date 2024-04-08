import app from "../app";
import mongoose from "mongoose";
import { job } from "../utils/expiryScript";
import { SpotJob } from "../utils/spotRenewScript";

const PORT = process.env.PORT;
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING as string);
    console.log("Database Connected");

    app.listen(PORT, () => {
      console.log(`Server Running on Port ${PORT}`);
      job;
      SpotJob;
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

startServer();
