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
exports.MenteeController = void 0;
const Mentor_1 = __importDefault(require("../models/Mentor"));
const Mentee_1 = __importDefault(require("../models/Mentee"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const Otp_1 = __importDefault(require("../models/Otp"));
const Report_1 = __importDefault(require("../models/Report"));
const mongodb_1 = require("mongodb");
const Payment_1 = __importDefault(require("../models/Payment"));
const Rating_1 = __importDefault(require("../models/Rating"));
class MenteeController {
    mentorProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allMentors = yield Mentor_1.default.aggregate([
                    { $match: { profile_state: "approved" } },
                    {
                        $project: {
                            why_mentor: 0,
                            achievement: 0,
                        },
                    },
                ]);
                if (allMentors) {
                    res.status(200).json({ status: "sucess", allMentors: allMentors });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    mentorSearch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { str, company, skill } = req.query;
                const query = {};
                if (str) {
                    query.job_title = { $regex: new RegExp(str, "i") };
                }
                if (company) {
                    query.company = { $regex: new RegExp(company, "i") };
                }
                if (skill) {
                    query.skills = skill;
                }
                const mentorProfiles = yield Mentor_1.default.find(query);
                if (mentorProfiles) {
                    res
                        .status(200)
                        .json({ message: "Mentor filtered", mentors: mentorProfiles });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    getMentorProfile(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mentorId = new mongoose_1.default.Types.ObjectId(req.params.mentorId);
                if (mentorId) {
                    const mentorProfile = yield Mentor_1.default.aggregate([
                        { $match: { mentor_id: mentorId } },
                        {
                            $lookup: {
                                from: "users",
                                localField: "mentor_id",
                                foreignField: "_id",
                                as: "mentorEmail",
                            },
                        },
                        {
                            $lookup: {
                                from: "rates",
                                localField: "mentor_id",
                                foreignField: "mentor_id",
                                as: "mentorRating",
                            },
                        },
                        {
                            $unwind: "$mentorEmail",
                        },
                    ]);
                    const mentor = mentorProfile[0];
                    const mentorDetails = {
                        mentor_id: mentor === null || mentor === void 0 ? void 0 : mentor.mentor_id,
                        profile_img: (mentor === null || mentor === void 0 ? void 0 : mentor.profile_img) ? mentorProfile[0].profile_img : "",
                        first_name: mentor === null || mentor === void 0 ? void 0 : mentor.first_name,
                        last_name: mentor === null || mentor === void 0 ? void 0 : mentor.last_name,
                        job_title: (mentor === null || mentor === void 0 ? void 0 : mentor.job_title) ? mentor.job_title : "",
                        mentorEmail: (_a = mentor === null || mentor === void 0 ? void 0 : mentor.mentorEmail) === null || _a === void 0 ? void 0 : _a.email,
                        linkedIn: (mentor === null || mentor === void 0 ? void 0 : mentor.linkedIn) ? mentor.linkedIn : "",
                        twitter: (mentor === null || mentor === void 0 ? void 0 : mentor.twitter) ? mentor.twitter : "",
                        web_url: (mentor === null || mentor === void 0 ? void 0 : mentor.web_url) ? mentor.web_url : "",
                        bio: (mentor === null || mentor === void 0 ? void 0 : mentor.bio) ? mentor.bio : "",
                        skills: mentor === null || mentor === void 0 ? void 0 : mentor.skills,
                        state: mentor === null || mentor === void 0 ? void 0 : mentor.state,
                        company: (mentor === null || mentor === void 0 ? void 0 : mentor.company) ? mentor.company : "",
                        category: mentor === null || mentor === void 0 ? void 0 : mentor.category,
                        role: (_b = mentor === null || mentor === void 0 ? void 0 : mentor.mentorEmail) === null || _b === void 0 ? void 0 : _b.role,
                        reviews: mentor === null || mentor === void 0 ? void 0 : mentor.mentorRating,
                    };
                    if (mentorProfile) {
                        res.status(200).json({ status: "sucess", mentorDetails });
                    }
                }
                else {
                    console.log("User object is not available");
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    reportMentor(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mentorId = req.params.mentorId;
                const reportDetails = req.body;
                if (mentorId && reportDetails) {
                    const existingReport = yield Report_1.default.findOne({ mentor_id: mentorId });
                    if (existingReport) {
                        existingReport.ReportDetails.push({
                            issue_faced: reportDetails === null || reportDetails === void 0 ? void 0 : reportDetails.issueFaced,
                            issue_desc: reportDetails === null || reportDetails === void 0 ? void 0 : reportDetails.issueDescription,
                            report_date: reportDetails === null || reportDetails === void 0 ? void 0 : reportDetails.date,
                        });
                        yield existingReport.save();
                    }
                    else {
                        const report = new Report_1.default({
                            mentor_id: mentorId,
                            mentee_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
                            ReportDetails: [
                                {
                                    issue_faced: reportDetails.issueFaced,
                                    issue_desc: reportDetails.issueDescription,
                                    report_date: reportDetails.date,
                                },
                            ],
                        });
                        yield report.save();
                    }
                    res
                        .status(200)
                        .json({ status: "success", message: "Report Submitted" });
                }
                else {
                    res
                        .status(400)
                        .json({ status: "error", message: "Report submission failed" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    menteeProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mentee_id = req.params.menteeId;
                const menteeDetails = yield User_1.default.aggregate([
                    { $match: { _id: new mongodb_1.ObjectId(mentee_id) } },
                    {
                        $lookup: {
                            from: "menteeprofiles",
                            localField: "_id",
                            foreignField: "mentee_id",
                            as: "menteeProfile",
                        },
                    },
                    {
                        $unwind: "$menteeProfile",
                    },
                ]);
                if (menteeDetails) {
                    res.status(200).json({ status: "success", menteeDetails });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (user) {
                    const newMenteeData = {
                        profile_img: req.body.profile_img,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        email: req.body.email,
                        job_title: req.body.job_title,
                        linkedIn: req.body.linkedIn,
                        twitter: req.body.twitter,
                        goal: req.body.goal,
                        available_time: req.body.radio,
                        country: req.body.country,
                        region: req.body.region,
                    };
                    const updateMentor = yield Mentee_1.default.findOneAndUpdate({
                        mentee_id: user.id,
                    }, { $set: newMenteeData }, { new: true });
                    if (updateMentor) {
                        res.status(200).json({
                            status: "success",
                            message: "Updated Successfully",
                            updateMentor,
                        });
                    }
                    else {
                        res
                            .status(404)
                            .json({ status: "success", message: "Profile not found" });
                    }
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    updateProfileImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { img_firebase_id, role } = req.body;
                if (user) {
                    if (!img_firebase_id) {
                        res
                            .status(400)
                            .json({ status: "error", message: "Image ID not found" });
                    }
                    else {
                        if (role === "mentee") {
                            yield Mentee_1.default.findOneAndUpdate({
                                mentee_id: new mongodb_1.ObjectId(user === null || user === void 0 ? void 0 : user.id),
                            }, { $set: { profile_img: img_firebase_id } });
                        }
                        else {
                            yield Mentor_1.default.findOneAndUpdate({ mentor_id: new mongodb_1.ObjectId(user === null || user === void 0 ? void 0 : user.id) }, { $set: { profile_img: img_firebase_id } });
                        }
                        res
                            .status(200)
                            .json({ status: "success", message: "Profile Image Updated" });
                    }
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { oldPassword, newPassword, confirmPassword, otpNumber } = req.body;
                if (!newPassword || !confirmPassword) {
                    res.status(400).json({ message: "Data fields missing" });
                }
                const userDB = yield User_1.default.findById(user === null || user === void 0 ? void 0 : user.id);
                if (userDB) {
                    if (oldPassword === "") {
                        const dbOtp = yield Otp_1.default.findOne({ email: userDB === null || userDB === void 0 ? void 0 : userDB.email });
                        if (dbOtp === null || dbOtp === void 0 ? void 0 : dbOtp.email) {
                            const dbOtpDecrypt = crypto_js_1.default.AES.decrypt(dbOtp.otp, process.env.HASH_KEY).toString(crypto_js_1.default.enc.Utf8);
                            if (dbOtpDecrypt === otpNumber) {
                                const hashNewPass = crypto_js_1.default.AES.encrypt(confirmPassword, process.env.HASH_KEY).toString();
                                const resetingUser = yield User_1.default.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user.id, {
                                    password: hashNewPass,
                                });
                                res.status(200).json({
                                    status: "success",
                                    message: "Password Updated",
                                    role: resetingUser === null || resetingUser === void 0 ? void 0 : resetingUser.role,
                                });
                            }
                            else {
                                console.log("Invalid OTP");
                                res.status(400).json({ message: "Invalid OTP Number" });
                            }
                        }
                        else {
                            console.log("email not exists in the db");
                            res.status(404).json({ message: "Resend OTP and Try Again" });
                        }
                    }
                    else {
                        const passwordDecrypt = crypto_js_1.default.AES.decrypt(userDB === null || userDB === void 0 ? void 0 : userDB.password, process.env.HASH_KEY).toString(crypto_js_1.default.enc.Utf8);
                        console.log("decrypted pass", passwordDecrypt);
                        if (passwordDecrypt !== oldPassword) {
                            res.status(401).json({ message: "Incorrect Password" });
                        }
                        const hashNewPass = crypto_js_1.default.AES.encrypt(confirmPassword, process.env.HASH_KEY).toString();
                        const resetingUser = yield User_1.default.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user.id, {
                            password: hashNewPass,
                        });
                        res.status(200).json({
                            status: "success",
                            message: "Password Updated",
                            role: resetingUser === null || resetingUser === void 0 ? void 0 : resetingUser.role,
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
    sendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (user) {
                    const userExists = yield User_1.default.findById(user.id);
                    if (!(userExists === null || userExists === void 0 ? void 0 : userExists._id)) {
                        res.status(404).json({ message: "Can't find email" });
                    }
                    yield (0, sendEmail_1.default)("", "", userExists === null || userExists === void 0 ? void 0 : userExists.email);
                    res
                        .status(200)
                        .json({ status: "success", message: "OTP send sucessfully" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    getProfileImg(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const userRole = req.params.userRole;
                if (user) {
                    if (userRole === "mentee") {
                        const menteeData = yield Mentee_1.default.findOne({
                            mentee_id: user === null || user === void 0 ? void 0 : user.id,
                        });
                        if (menteeData) {
                            res.status(200).json({
                                status: "success",
                                profileImageId: menteeData === null || menteeData === void 0 ? void 0 : menteeData.profile_img,
                            });
                        }
                        else {
                            res
                                .status(404)
                                .json({ status: "error", message: "User not found" });
                        }
                    }
                    else if (userRole === "mentor") {
                        const mentorData = yield Mentor_1.default.findOne({
                            mentor_id: new mongodb_1.ObjectId(user === null || user === void 0 ? void 0 : user.id),
                        });
                        if (mentorData) {
                            res.status(200).json({
                                status: "success",
                                profileImageId: mentorData === null || mentorData === void 0 ? void 0 : mentorData.profile_img,
                            });
                        }
                        else {
                            res
                                .status(404)
                                .json({ status: "error", message: "User not found" });
                        }
                    }
                }
                else {
                    res
                        .status(401)
                        .json({ status: "error", message: "Unauthorized access" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    mentorshipApply(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (user) {
                    console.log("This is the user --> ", user);
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    getMyMentors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const mentors = yield Payment_1.default.aggregate([
                    {
                        $match: { mentee_id: new mongodb_1.ObjectId(user === null || user === void 0 ? void 0 : user.id) },
                    },
                    {
                        $lookup: {
                            from: "mentorprofiles",
                            localField: "mentor_id",
                            foreignField: "mentor_id",
                            as: "mentorProfile",
                        },
                    },
                ]);
                if (mentors) {
                    res.status(200).json({ status: true, mentors });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    getSorted(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { jobTitle, skill, company } = req.body;
                const query = {};
                if (jobTitle !== "") {
                    query["jobTitle"] = jobTitle;
                }
                if (skill !== "") {
                    query["skills"] = skill;
                }
                if (company !== "") {
                    query["company"] = company;
                }
                const allMentors = yield Mentor_1.default.aggregate([
                    { $match: Object.assign({ profile_state: "approved" }, query) },
                    {
                        $project: {
                            why_mentor: 0,
                            achievement: 0,
                        },
                    },
                ]);
                if (allMentors.length > 0) {
                    res.status(200).json({ status: "success", allMentors });
                }
                else {
                    res.status(200).json({ status: "empty" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    getExpired(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mentee = req === null || req === void 0 ? void 0 : req.user;
                if (mentee) {
                    const expired = yield Payment_1.default.aggregate([
                        {
                            $match: {
                                mentee_id: new mongodb_1.ObjectId(mentee === null || mentee === void 0 ? void 0 : mentee.id),
                                isExpired: true,
                            },
                        },
                        {
                            $lookup: {
                                from: "mentorprofiles",
                                localField: "mentor_id",
                                foreignField: "mentor_id",
                                as: "mentorDetails",
                            },
                        },
                        {
                            $unwind: "$mentorDetails",
                        },
                    ]);
                    res.status(200).json({ status: "success", expired });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    checkSpot(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req === null || req === void 0 ? void 0 : req.user;
                const mentorId = req.params.mentorId;
                if (!user) {
                    res.status(400).json({ message: "User Object not found" });
                }
                const checkSpot = yield Mentor_1.default.findOne({ mentor_id: mentorId });
                if (checkSpot && (checkSpot === null || checkSpot === void 0 ? void 0 : checkSpot.spots) > 0) {
                    const isExists = yield Payment_1.default.findOne({
                        mentee_id: user === null || user === void 0 ? void 0 : user.id,
                        isExpired: false,
                    });
                    if (isExists) {
                        res.status(200).json({ status: "exists", message: "Alredy Applied" });
                    }
                    else {
                        res.status(200).json({ status: "success" });
                    }
                }
                else {
                    res.status(200).json({ status: "spots", message: "No Spots Left" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    rateMentor(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const mentorId = req.params.mentorId;
                const isExists = yield Rating_1.default.findOne({
                    mentee_id: new mongodb_1.ObjectId(user === null || user === void 0 ? void 0 : user.id),
                    mentor_id: new mongodb_1.ObjectId(mentorId),
                });
                if (user && !isExists) {
                    const Rating = new Rating_1.default({
                        mentor_id: mentorId,
                        mentee_id: user === null || user === void 0 ? void 0 : user.id,
                        rating: (_a = req.body) === null || _a === void 0 ? void 0 : _a.value,
                        description: (_b = req.body) === null || _b === void 0 ? void 0 : _b.experiance,
                    });
                    yield Rating.save();
                    res
                        .status(200)
                        .json({ status: "success", message: "Rated Successfully" });
                }
                else {
                    res.status(200).json({ status: "failed", message: "Alredy Exists" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
}
exports.MenteeController = MenteeController;
