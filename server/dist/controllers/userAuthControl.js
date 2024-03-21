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
const userModel_1 = __importDefault(require("../models/userModel"));
const mentorProfileModel_1 = __importDefault(require("../models/mentorProfileModel"));
const menteeProfileModel_1 = __importDefault(require("../models/menteeProfileModel"));
const generateJWT_1 = __importDefault(require("../utils/generateJWT"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const otpModel_1 = __importDefault(require("../models/otpModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_decode_1 = require("jwt-decode");
const generateUsername_1 = __importDefault(require("../utils/generateUsername"));
class MenteeAuthController {
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { first_name, last_name, email, password } = req.body;
                if (!first_name || !last_name || !email || !password) {
                    res.status(400);
                    return next(Error("Data Fields Missing"));
                }
                const emailExists = yield userModel_1.default.findOne({ email });
                if (emailExists) {
                    res.status(409).json({ message: "Email alredy exists" });
                    return next(Error("Email Alredy Exists"));
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
                if (error instanceof Error) {
                    console.log(error.message);
                    return next(error);
                }
            }
        });
    }
    signin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    res.status(400).json({ message: "Data fields missing" });
                    return next(Error("Invalid Credentials"));
                }
                const userExists = yield userModel_1.default.findOne({ email });
                if (!userExists) {
                    res.status(401).json({ message: "Canno't Find Email" });
                    return next(Error("Invalid Email"));
                }
                else {
                    const dbPassword = crypto_js_1.default.AES.decrypt(userExists.password, process.env.HASH_KEY).toString(crypto_js_1.default.enc.Utf8);
                    if (password === dbPassword) {
                        console.log("Inside the check");
                        const accessToken = jsonwebtoken_1.default.sign({
                            UserInfo: {
                                id: userExists._id,
                                email: userExists.email,
                                roles: userExists.role,
                            },
                        }, process.env.ACCESS_TOKEN_SECRETE, { expiresIn: "3d" });
                        const refreshToken = jsonwebtoken_1.default.sign({ email: userExists.email }, process.env.REFRESH_TOKEN_SECRETE, { expiresIn: "7d" });
                        const userDataFromProfile = yield menteeProfileModel_1.default.findOne({
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
                        return next(Error("Invalid Password"));
                    }
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                    return next(error);
                }
            }
        });
    }
    refreshToken(req, res, next) {
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
                    const foundUser = yield userModel_1.default.findOne({
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
                if (error instanceof Error) {
                    console.log(error.message);
                    return next(error);
                }
            }
        });
    }
    logout(req, res, next) {
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
                if (error instanceof Error) {
                    console.log(error.message);
                    return next(error);
                }
            }
        });
    }
    verifyOTP(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { first_name, last_name, email, password, otp } = req.body.userData;
                if (!first_name || !last_name || !email || !password || !otp) {
                    res.status(400).json({ message: "Invalid Credentials" });
                    return next(Error("Invalid Credentials"));
                }
                const otpData = yield otpModel_1.default.findOne({ email });
                if (!otpData) {
                    res.status(404).json({ message: "Resend otp and try Again" });
                    return next(Error("Re-send otp and Try Again"));
                }
                const dbOTP = crypto_js_1.default.AES.decrypt(otpData.otp, process.env.HASH_KEY).toString(crypto_js_1.default.enc.Utf8);
                if (dbOTP === otp) {
                    const hashedPassword = crypto_js_1.default.AES.encrypt(password, process.env.HASH_KEY).toString();
                    const menteeDetails = new userModel_1.default({
                        email,
                        password: hashedPassword,
                        role: "mentee",
                    });
                    const user = yield menteeDetails.save();
                    if (user) {
                        const userProfileDetails = new menteeProfileModel_1.default({
                            mentee_id: user === null || user === void 0 ? void 0 : user._id,
                            first_name,
                            last_name,
                        });
                        const profileData = yield userProfileDetails.save();
                        if (profileData) {
                            const token = (0, generateJWT_1.default)(user === null || user === void 0 ? void 0 : user._id, email);
                            res.status(200).json({
                                status: "success",
                                message: "User Created Successfully",
                                user: {
                                    _id: user === null || user === void 0 ? void 0 : user._id,
                                    first_name: profileData === null || profileData === void 0 ? void 0 : profileData.first_name,
                                    email: user === null || user === void 0 ? void 0 : user.email,
                                    role: user === null || user === void 0 ? void 0 : user.role,
                                },
                                token,
                            });
                        }
                    }
                }
                else {
                    res.status(400).json({ message: "Invalid OTP" });
                    return next(Error("Invalid OTP"));
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                    return next(error);
                }
            }
        });
    }
    resendOTP(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { first_name, last_name, email, password } = req.body.serverResponse;
                if (!first_name || !last_name || !email || !password) {
                    res.status(400);
                    return next(Error("Invalid Credentials"));
                }
                //OTP Email Sending
                yield (0, sendEmail_1.default)(first_name, last_name, email);
                res
                    .status(200)
                    .json({ status: "success", message: "Email Re Send Successfully" });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                    return next(error);
                }
            }
        });
    }
    googleAuth(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Reached at the google auth");
                if (!req.body.userData) {
                    res.status(400);
                    return next(Error("Invalid credentials"));
                }
                const { email } = (0, jwt_decode_1.jwtDecode)(req.body.userData);
                const existingUser = yield userModel_1.default.findOne({ email: email });
                if (existingUser) {
                    if (existingUser.password) {
                        res.status(409).json({ message: "Invalid Email" });
                        return next(Error("Invalid Email"));
                    }
                    const token = (0, generateJWT_1.default)(existingUser._id, existingUser.email);
                    const userDataFromProfile = yield menteeProfileModel_1.default.findOne({
                        mentee_id: existingUser === null || existingUser === void 0 ? void 0 : existingUser._id,
                    });
                    res.status(200).json({
                        status: "success",
                        message: "User loged in successfully",
                        user: {
                            _id: existingUser._id,
                            first_name: userDataFromProfile === null || userDataFromProfile === void 0 ? void 0 : userDataFromProfile.first_name,
                            email: existingUser.email,
                            role: existingUser.role,
                        },
                        token,
                    });
                }
                else {
                    const userName = yield (0, generateUsername_1.default)();
                    const menteeDetails = new userModel_1.default({
                        email,
                        password: "",
                        role: "mentee",
                    });
                    const user = yield menteeDetails.save();
                    if (user) {
                        const userProfileDetails = new menteeProfileModel_1.default({
                            mentee_id: user === null || user === void 0 ? void 0 : user._id,
                            first_name: userName.toString(),
                            last_name: "",
                        });
                        const profileData = yield userProfileDetails.save();
                        if (profileData) {
                            const token = (0, generateJWT_1.default)(user === null || user === void 0 ? void 0 : user._id, email);
                            res.status(200).json({
                                status: "success",
                                message: "User Created Successfully",
                                user: {
                                    _id: user === null || user === void 0 ? void 0 : user._id,
                                    first_name: profileData === null || profileData === void 0 ? void 0 : profileData.first_name,
                                    email: user === null || user === void 0 ? void 0 : user.email,
                                    role: user === null || user === void 0 ? void 0 : user.role,
                                },
                                token,
                            });
                        }
                    }
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                    return next(error);
                }
            }
        });
    }
    checkToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Reached on Check Token");
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
                if (error instanceof Error) {
                    console.log(error.message);
                    return next(error);
                }
            }
        });
    }
}
exports.MenteeAuthController = MenteeAuthController;
class MentorAuthController {
    apply(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.mentorData || !req.body.firebase_img_id) {
                    res.status(400);
                    return next(Error("Invalid credentials"));
                }
                const data = req.body.mentorData;
                const img_str = req.body.firebase_img_id;
                const mentorEmail = data.email;
                const emailExists = yield userModel_1.default.findOne({ mentorEmail });
                if (emailExists) {
                    res.status(409);
                    return next(Error("Email Alredy Exists"));
                }
                const hashedPassword = crypto_js_1.default.AES.encrypt(data.password, process.env.HASH_KEY).toString();
                const mentor = new userModel_1.default({
                    email: mentorEmail,
                    password: hashedPassword,
                    role: "mentor",
                });
                const saveMentor = yield mentor.save();
                if (saveMentor.email) {
                    const mentorProfileData = new mentorProfileModel_1.default({
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
                if (error instanceof Error) {
                    console.log(error.message);
                    return next(error);
                }
            }
        });
    }
    mentorLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body.mentorData;
                if (!email || !password) {
                    res.status(400).json({ message: "Data fields missing" });
                    return next(Error("Invalid Credentials"));
                }
                const userExists = yield userModel_1.default.findOne({ email });
                if (!userExists) {
                    res.status(401).json({ message: "Canno't Find Email" });
                    return next(Error("Invalid Email"));
                }
                else {
                    if (userExists.role !== "mentor") {
                        res.status(400).json({ message: "Invalid Email" });
                        return next(Error("Incorect Email"));
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
                        const mentorDataFromProfile = yield mentorProfileModel_1.default.findOne({
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
                        return next(Error("Invalid Password"));
                    }
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                    return next(error);
                }
            }
        });
    }
}
exports.MentorAuthController = MentorAuthController;
