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
exports.MentorAuthController = exports.MenteeAuthController = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const User_1 = __importDefault(require("../models/User"));
const Mentor_1 = __importDefault(require("../models/Mentor"));
const Mentee_1 = __importDefault(require("../models/Mentee"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const Otp_1 = __importDefault(require("../models/Otp"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_decode_1 = require("jwt-decode");
class MenteeAuthController {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { first_name, last_name, email, password } = req.body;
                if (!first_name || !last_name || !email || !password) {
                    res.status(400).json({ message: "Invalid Credentials" });
                }
                const emailExists = yield User_1.default.findOne({ email });
                if (emailExists) {
                    res.status(409).json({ message: "Email alredy exists" });
                }
                //OTP Email Sending
                yield (0, sendEmail_1.default)(first_name, last_name, email);
                res.status(200).json({
                    status: "success",
                    message: "Successfull",
                    user: req.body,
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    res.status(400).json({ message: "Invalid Credentials" });
                }
                const userExists = yield User_1.default.findOne({ email });
                if (!userExists) {
                    res.status(401).json({ message: "Canno't Find Email" });
                }
                else {
                    if (userExists.is_blocked) {
                        res.status(401).json({ message: "Your Account has been Blocked" });
                    }
                    const dbPassword = crypto_js_1.default.AES.decrypt(userExists.password, process.env.HASH_KEY).toString(crypto_js_1.default.enc.Utf8);
                    if (password === dbPassword) {
                        const accessToken = jsonwebtoken_1.default.sign({
                            UserInfo: {
                                id: userExists._id,
                                email: userExists.email,
                                roles: userExists.role,
                            },
                        }, process.env.ACCESS_TOKEN_SECRETE, { expiresIn: "3d" });
                        const refreshToken = jsonwebtoken_1.default.sign({ email: userExists.email }, process.env.REFRESH_TOKEN_SECRETE, { expiresIn: "7d" });
                        const userDataFromProfile = yield Mentee_1.default.findOne({
                            mentee_id: userExists === null || userExists === void 0 ? void 0 : userExists._id,
                        });
                        res.cookie("refreshToken", refreshToken, {
                            httpOnly: true,
                            secure: false,
                            maxAge: 7 * 24 * 60 * 60 * 1000,
                        });
                        res.status(200).json({
                            status: "success",
                            user: {
                                _id: userExists === null || userExists === void 0 ? void 0 : userExists._id,
                                first_name: userDataFromProfile === null || userDataFromProfile === void 0 ? void 0 : userDataFromProfile.first_name,
                                email: userExists === null || userExists === void 0 ? void 0 : userExists.email,
                                role: userExists === null || userExists === void 0 ? void 0 : userExists.role,
                            },
                            accessToken,
                        });
                    }
                    else {
                        res.status(401).json({ message: "Invalid Password" });
                    }
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cookies = req.cookies;
                if (!(cookies === null || cookies === void 0 ? void 0 : cookies.refreshToken)) {
                    res.status(401).json({ message: "Refresh token not exists" });
                    return;
                }
                const refreshToken = cookies.refreshToken;
                try {
                    const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRETE);
                    const foundUser = yield User_1.default.findOne({
                        email: decoded.email,
                    });
                    if (!foundUser) {
                        res.status(401).json({
                            message: "Unauthorized user not exists in the database",
                        });
                        return;
                    }
                    const accessToken = jsonwebtoken_1.default.sign({
                        UserInfo: {
                            id: foundUser._id,
                            email: foundUser.email,
                            roles: foundUser.role,
                        },
                    }, process.env.ACCESS_TOKEN_SECRETE, { expiresIn: "3d" });
                    res.json({ accessToken });
                }
                catch (err) {
                    res.status(403).json({ message: "Forbidden" });
                    return;
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cookies = req.cookies;
                if (!(cookies === null || cookies === void 0 ? void 0 : cookies.refreshToken)) {
                    res.sendStatus(204);
                }
                res.clearCookie("refreshToken", {
                    httpOnly: true,
                    secure: false,
                });
                res
                    .status(200)
                    .json({ status: "success", message: "Log out successfull" });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    verifyOTP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { first_name, last_name, email, password, otp } = req.body.userData;
                if (!first_name || !last_name || !email || !password || !otp) {
                    res.status(400).json({ message: "Invalid Credentials" });
                }
                const otpData = yield Otp_1.default.findOne({ email });
                if (!otpData) {
                    res.status(404).json({ message: "Resend otp and try Again" });
                    return;
                }
                const dbOTP = crypto_js_1.default.AES.decrypt(otpData.otp, process.env.HASH_KEY).toString(crypto_js_1.default.enc.Utf8);
                if (dbOTP === otp) {
                    const hashedPassword = crypto_js_1.default.AES.encrypt(password, process.env.HASH_KEY).toString();
                    const menteeDetails = new User_1.default({
                        email,
                        password: hashedPassword,
                        role: "mentee",
                    });
                    const user = yield menteeDetails.save();
                    if (user) {
                        const userProfileDetails = new Mentee_1.default({
                            mentee_id: user === null || user === void 0 ? void 0 : user._id,
                            first_name,
                            last_name,
                        });
                        const profileData = yield userProfileDetails.save();
                        if (profileData) {
                            const accessToken = jsonwebtoken_1.default.sign({
                                UserInfo: {
                                    id: menteeDetails === null || menteeDetails === void 0 ? void 0 : menteeDetails._id,
                                    email: menteeDetails === null || menteeDetails === void 0 ? void 0 : menteeDetails.email,
                                    roles: menteeDetails === null || menteeDetails === void 0 ? void 0 : menteeDetails.role,
                                },
                            }, process.env.ACCESS_TOKEN_SECRETE, { expiresIn: "3d" });
                            const refreshToken = jsonwebtoken_1.default.sign({ email: menteeDetails === null || menteeDetails === void 0 ? void 0 : menteeDetails.email }, process.env.REFRESH_TOKEN_SECRETE, { expiresIn: "7d" });
                            res.cookie("refreshToken", refreshToken, {
                                httpOnly: true,
                                secure: false,
                                maxAge: 7 * 24 * 60 * 60 * 1000,
                            });
                            res.status(200).json({
                                status: "success",
                                message: "User Created Successfully",
                                user: {
                                    _id: user === null || user === void 0 ? void 0 : user._id,
                                    first_name: profileData === null || profileData === void 0 ? void 0 : profileData.first_name,
                                    email: user === null || user === void 0 ? void 0 : user.email,
                                    role: user === null || user === void 0 ? void 0 : user.role,
                                },
                                accessToken,
                            });
                        }
                    }
                }
                else {
                    res.status(400).json({ message: "Invalid OTP" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    resendOTP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { first_name, last_name, email, password } = req.body.serverResponse;
                if (!first_name || !last_name || !email || !password) {
                    res.status(400).json({ message: "Invalid Credentials" });
                }
                //OTP Email Sending
                yield (0, sendEmail_1.default)(first_name, last_name, email);
                res
                    .status(200)
                    .json({ status: "success", message: "Email Re Send Successfully" });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    googleAuth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.authString) {
                    res
                        .status(400)
                        .json({ status: "failed", message: "Invalid credentials" });
                    return;
                }
                const decodeData = (0, jwt_decode_1.jwtDecode)(req.body.authString);
                const existingUser = yield User_1.default.findOne({ email: decodeData.email });
                if (existingUser) {
                    if (existingUser === null || existingUser === void 0 ? void 0 : existingUser.password) {
                        res.status(409).json({ message: "User Alredy Exists" });
                        return;
                    }
                    const accessToken = jsonwebtoken_1.default.sign({
                        UserInfo: {
                            id: existingUser === null || existingUser === void 0 ? void 0 : existingUser._id,
                            email: existingUser === null || existingUser === void 0 ? void 0 : existingUser.email,
                            roles: existingUser === null || existingUser === void 0 ? void 0 : existingUser.role,
                        },
                    }, process.env.ACCESS_TOKEN_SECRETE, { expiresIn: "3d" });
                    const refreshToken = jsonwebtoken_1.default.sign({ email: existingUser === null || existingUser === void 0 ? void 0 : existingUser.email }, process.env.REFRESH_TOKEN_SECRETE, { expiresIn: "7d" });
                    const userDataFromProfile = yield Mentee_1.default.findOne({
                        mentee_id: existingUser === null || existingUser === void 0 ? void 0 : existingUser._id,
                    });
                    res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: false,
                        maxAge: 7 * 24 * 60 * 60 * 1000,
                    });
                    res.status(200).json({
                        status: "success",
                        user: {
                            _id: existingUser === null || existingUser === void 0 ? void 0 : existingUser._id,
                            first_name: userDataFromProfile === null || userDataFromProfile === void 0 ? void 0 : userDataFromProfile.first_name,
                            email: existingUser === null || existingUser === void 0 ? void 0 : existingUser.email,
                            role: existingUser === null || existingUser === void 0 ? void 0 : existingUser.role,
                        },
                        accessToken,
                    });
                }
                else {
                    const menteeDetails = new User_1.default({
                        email: decodeData.email,
                        password: "",
                        role: "mentee",
                    });
                    const user = yield menteeDetails.save();
                    if (user) {
                        const userProfileDetails = new Mentee_1.default({
                            mentee_id: user === null || user === void 0 ? void 0 : user._id,
                            first_name: decodeData.name,
                            last_name: "",
                        });
                        const profileData = yield userProfileDetails.save();
                        if (profileData) {
                            const accessToken = jsonwebtoken_1.default.sign({
                                UserInfo: {
                                    id: user === null || user === void 0 ? void 0 : user._id,
                                    email: user === null || user === void 0 ? void 0 : user.email,
                                    roles: user === null || user === void 0 ? void 0 : user.role,
                                },
                            }, process.env.ACCESS_TOKEN_SECRETE, { expiresIn: "3d" });
                            const refreshToken = jsonwebtoken_1.default.sign({ email: user === null || user === void 0 ? void 0 : user.email }, process.env.REFRESH_TOKEN_SECRETE, { expiresIn: "7d" });
                            res.cookie("refreshToken", refreshToken, {
                                httpOnly: true,
                                secure: false,
                                maxAge: 7 * 24 * 60 * 60 * 1000,
                            });
                            const userDataFromProfile = yield Mentee_1.default.findOne({
                                mentee_id: user === null || user === void 0 ? void 0 : user._id,
                            });
                            res.status(200).json({
                                status: "success",
                                user: {
                                    _id: user === null || user === void 0 ? void 0 : user._id,
                                    first_name: userDataFromProfile === null || userDataFromProfile === void 0 ? void 0 : userDataFromProfile.first_name,
                                    email: user === null || user === void 0 ? void 0 : user.email,
                                    role: user === null || user === void 0 ? void 0 : user.role,
                                },
                                accessToken,
                            });
                        }
                    }
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    checkToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cookies = req.cookies;
                if (cookies.refreshToken) {
                    res.json({ status: "exists" });
                }
                else {
                    res.json({ status: "not exists" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
}
exports.MenteeAuthController = MenteeAuthController;
class MentorAuthController {
    apply(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("reache here -> ", req.body);
                console.log(req.body.mentorData);
                console.log(req.body.firebase_img_id);
                if (!req.body.mentorData || !req.body.firebase_img_id) {
                    res.status(400).json({ message: "Invalid Credentials" });
                }
                const data = req.body.mentorData;
                const img_str = req.body.firebase_img_id;
                const mentorEmail = data.email;
                const emailExists = yield User_1.default.findOne({ mentorEmail });
                if (emailExists) {
                    res.status(409);
                    return;
                }
                const hashedPassword = crypto_js_1.default.AES.encrypt(data.password, process.env.HASH_KEY).toString();
                const mentor = new User_1.default({
                    email: mentorEmail,
                    password: hashedPassword,
                    role: "mentor",
                });
                const saveMentor = yield mentor.save();
                if (saveMentor.email) {
                    const mentorProfileData = new Mentor_1.default({
                        mentor_id: saveMentor === null || saveMentor === void 0 ? void 0 : saveMentor._id,
                        first_name: data === null || data === void 0 ? void 0 : data.first_name,
                        last_name: data === null || data === void 0 ? void 0 : data.last_name,
                        job_title: data === null || data === void 0 ? void 0 : data.job_title,
                        company: data === null || data === void 0 ? void 0 : data.company,
                        state: data === null || data === void 0 ? void 0 : data.state,
                        category: data === null || data === void 0 ? void 0 : data.job_category,
                        job_category: data === null || data === void 0 ? void 0 : data.state,
                        skills: data === null || data === void 0 ? void 0 : data.skills,
                        bio: data === null || data === void 0 ? void 0 : data.bio_dec,
                        linkedIn: data === null || data === void 0 ? void 0 : data.linkedIn_url,
                        twitter: data === null || data === void 0 ? void 0 : data.twitter_url,
                        web_url: data === null || data === void 0 ? void 0 : data.website_url,
                        why_mentor: data === null || data === void 0 ? void 0 : data.why_mentor,
                        achievement: data === null || data === void 0 ? void 0 : data.achievement,
                        profile_img: img_str,
                    });
                    const mentorProfileSave = yield mentorProfileData.save();
                    if (mentorProfileSave) {
                        res.status(200).json({
                            status: "success",
                            message: "Mentor Applied Successfully",
                        });
                    }
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    mentorLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body.mentorData;
                if (!email || !password) {
                    res.status(400).json({ message: "Data fields missing" });
                }
                const userExists = yield User_1.default.findOne({ email });
                if (!userExists) {
                    res.status(401).json({ message: "Canno't Find Email" });
                }
                else {
                    if (userExists.is_blocked) {
                        res.status(401).json({ message: "Your Account has been Blocked" });
                        return;
                    }
                    if (userExists.role !== "mentor") {
                        res.status(400).json({ message: "Invalid Email" });
                    }
                    const dbPassword = crypto_js_1.default.AES.decrypt(userExists.password, process.env.HASH_KEY).toString(crypto_js_1.default.enc.Utf8);
                    if (password === dbPassword) {
                        const accessToken = jsonwebtoken_1.default.sign({
                            UserInfo: {
                                id: userExists._id,
                                email: userExists.email,
                                roles: userExists.role,
                            },
                        }, process.env.ACCESS_TOKEN_SECRETE, { expiresIn: "30m" });
                        const refreshToken = jsonwebtoken_1.default.sign({ email: userExists.email }, process.env.REFRESH_TOKEN_SECRETE, { expiresIn: "7d" });
                        //Getting mentor name because both stored in different
                        //collections user and mentorprofile
                        const mentorDataFromProfile = yield Mentor_1.default.findOne({
                            mentor_id: userExists === null || userExists === void 0 ? void 0 : userExists._id,
                        });
                        res.cookie("refreshToken", refreshToken, {
                            httpOnly: true,
                            secure: false,
                            maxAge: 7 * 24 * 60 * 60 * 1000,
                        });
                        res.status(200).json({
                            status: "success",
                            user: {
                                _id: userExists === null || userExists === void 0 ? void 0 : userExists._id,
                                first_name: mentorDataFromProfile === null || mentorDataFromProfile === void 0 ? void 0 : mentorDataFromProfile.first_name,
                                email: userExists === null || userExists === void 0 ? void 0 : userExists.email,
                                role: userExists === null || userExists === void 0 ? void 0 : userExists.role,
                            },
                            accessToken,
                        });
                    }
                    else {
                        res.status(401).json({ message: "Incorrect Password" });
                    }
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
}
exports.MentorAuthController = MentorAuthController;
