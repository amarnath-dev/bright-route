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
const mentee_routes_1 = __importDefault(require("./routes/mentee.routes"));
const mentor_routes_1 = __importDefault(require("./routes/mentor.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const chat_routes_1 = __importDefault(require("./routes/chat.routes"));
const notification_routes_1 = __importDefault(require("./routes/notification.routes"));
const common_routes_1 = __importDefault(require("./routes/common.routes"));
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
app.use("/api", mentee_routes_1.default);
app.use("/api/mentor", mentor_routes_1.default);
app.use("/api/admin", admin_routes_1.default);
app.use("/api/chat", chat_routes_1.default);
app.use("/api/notification", notification_routes_1.default);
app.use("/api/password/", common_routes_1.default);
exports.default = app;
