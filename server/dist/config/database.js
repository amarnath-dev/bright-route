"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
// import { job } from "../utils/expiryScript";
const PORT = process.env.PORT;
console.log(process.env.MONGO_CONNECTION_STRING);
mongoose_1.default
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
    console.log("MongoDB Connected");
    app_1.default.listen(PORT, () => {
        console.log(`Server Running on the Port ${PORT}`);
        // job
    });
})
    .catch((error) => {
    console.log(error);
});
