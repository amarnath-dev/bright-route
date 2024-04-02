"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const menteeRoutes_1 = __importDefault(require("./routes/menteeRoutes"));
const mentorRoutes_1 = __importDefault(require("./routes/mentorRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const notificationRoutes_1 = __importDefault(require("./routes/notificationRoutes"));
const globalRoutes_1 = __importDefault(require("./routes/globalRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const corsConfig = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
};
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsConfig));
//routes
app.use("/api", menteeRoutes_1.default);
app.use("/api/mentor", mentorRoutes_1.default);
app.use("/api/admin", adminRoutes_1.default);
app.use("/api/chat", chatRoutes_1.default);
app.use("/api/notification", notificationRoutes_1.default);
app.use("/api/password/", globalRoutes_1.default);
exports.default = app;
