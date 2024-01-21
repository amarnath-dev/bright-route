import app from "../app";
import mongoose from "mongoose";

const PORT = 5000;

mongoose.connect("mongodb+srv://amarnathas:ChpaJ5TS9NRtWYvM@cluster0.u1pctnk.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("Connected to Database Successfully");
    app.listen(PORT, () => {
        console.log(`Server Running on the Port ${PORT}`);
    })
})