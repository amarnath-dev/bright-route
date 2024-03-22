import app from "../app";
import mongoose from "mongoose";
// import { job } from "../utils/expiryScript";

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING as string)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on the Port ${PORT}`);
      // job
    });
  })
  .catch((error) => {
    console.log(error);
  });
