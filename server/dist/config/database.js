"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const expiryScript_1 = require("../utils/expiryScript");
const PORT = process.env.PORT;
mongoose_1.default
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
    console.log("Database Connected");
    app_1.default.listen(PORT, () => {
        console.log(`Server Running on Port ${PORT}`);
        expiryScript_1.job;
    });
})
    .catch((error) => {
    console.log(error);
});
