import app from "../app";
import mongoose from "mongoose";

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING as string)
  .then(() => {
    console.log("Connected to Database Successfully");
    app.listen(PORT, () => {
      console.log(`Server Running on the Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
