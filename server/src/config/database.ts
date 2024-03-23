import app from "../app";
import mongoose from "mongoose";
// import { job } from "../utils/expiryScript";

const PORT = process.env.PORT;
console.log(process.env.MONGO_CONNECTION_STRING);
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING as string)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server Running on the Port ${PORT}`);
      // job
    });
  })
  .catch((error) => {
    console.log(error);
  });
