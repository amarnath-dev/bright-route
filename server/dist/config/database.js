"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const expiryScript_1 = require("../utils/expiryScript");
const spotRenewScript_1 = require("../utils/spotRenewScript");
const PORT = process.env.PORT;
console.log(PORT);
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(process.env.MONGO_CONNECTION_STRING);
        try {
            yield mongoose_1.default.connect(process.env.MONGO_CONNECTION_STRING);
            console.log("Database Connected");
            app_1.default.listen(PORT, () => {
                console.log(`Server Running on Port ${PORT}`);
                expiryScript_1.job;
                spotRenewScript_1.SpotJob;
            });
        }
        catch (error) {
            console.error("Error connecting to database:", error);
        }
    });
}
startServer();
