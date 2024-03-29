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
exports.AdminControls = void 0;
const mentorProfileModel_1 = __importDefault(require("../models/mentorProfileModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const mongodb_1 = require("mongodb");
const menteeProfileModel_1 = __importDefault(require("../models/menteeProfileModel"));
class AdminControls {
    mentorApplications(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const applications = yield mentorProfileModel_1.default.aggregate([
                    { $match: { profile_state: "pending" } },
                    {
                        $lookup: {
                            from: "users",
                            localField: "mentor_id",
                            foreignField: "_id",
                            as: "mentorEmail",
                        },
                    },
                    {
                        $set: {
                            mentorEmail: { $arrayElemAt: ["$mentorEmail.email", 0] },
                        },
                    },
                ]);
                if (applications) {
                    res.status(200).json({ status: "success", applications });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error);
                    return next(error);
                }
            }
        });
    }
    singleApplication(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const applicationId = new mongodb_1.ObjectId(req.params.applicationId);
                console.log("this is aplication id", applicationId);
                const applicationData = yield mentorProfileModel_1.default.aggregate([
                    { $match: { _id: applicationId } },
                    {
                        $lookup: {
                            from: "users",
                            localField: "mentor_id",
                            foreignField: "_id",
                            as: "mentorEmail",
                        },
                    },
                    {
                        $set: {
                            mentorEmail: { $arrayElemAt: ["$mentorEmail.email", 0] },
                        },
                    },
                ]);
                console.log("Application Data", applicationData);
                if (applicationData) {
                    res
                        .status(200)
                        .json({ status: "success", applications: applicationData });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error);
                    return next(error);
                }
            }
        });
    }
    approveApplication(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const applicationId = req.params.applicationId;
                const result = yield mentorProfileModel_1.default.findByIdAndUpdate(applicationId, {
                    profile_state: "approved",
                });
                if (result) {
                    res
                        .status(200)
                        .json({ status: "success", message: "Application Approved" });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error);
                    return next(error);
                }
            }
        });
    }
    rejectApplication(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const applicationId = req.params.applicationId;
                const result = yield mentorProfileModel_1.default.findByIdAndUpdate(applicationId, {
                    profile_state: "rejected",
                });
                if (result) {
                    res
                        .status(200)
                        .json({ status: "success", message: "Application Rejected" });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error);
                    return next(error);
                }
            }
        });
    }
    getMentees(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mentees = yield userModel_1.default.aggregate([
                    { $match: { role: "mentee" } },
                    {
                        $lookup: {
                            from: "menteeprofiles",
                            foreignField: "mentee_id",
                            localField: "_id",
                            as: "profileDetails",
                        },
                    },
                    {
                        $unwind: "$profileDetails",
                    },
                ]).limit(6);
                if (mentees) {
                    res.status(200).json({ status: "success", mentees });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error);
                    return next(error);
                }
            }
        });
    }
    blockUser(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.userId;
                const update = yield userModel_1.default.findByIdAndUpdate(userId, { is_blocked: true });
                if (update) {
                    res.status(200).json({ status: "success", message: "User Blocked" });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error);
                    return next(error);
                }
            }
        });
    }
    unBlock(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.userId;
                const update = yield userModel_1.default.findByIdAndUpdate(userId, {
                    is_blocked: false,
                });
                if (update) {
                    res.status(200).json({ status: "success", message: "User UnBlocked" });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error);
                    return next(error);
                }
            }
        });
    }
    search(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { q: query } = req.query;
                let mentees;
                if (query) {
                    mentees = yield menteeProfileModel_1.default.aggregate([
                        { $match: { first_name: { $regex: query, $options: "i" } } },
                        {
                            $lookup: {
                                from: "users",
                                foreignField: "_id",
                                localField: "mentee_id",
                                as: "userDetails",
                            },
                        },
                        {
                            $unwind: "$userDetails",
                        },
                    ]);
                }
                else {
                    mentees = yield menteeProfileModel_1.default.aggregate([
                        {
                            $lookup: {
                                from: "users",
                                foreignField: "_id",
                                localField: "mentee_id",
                                as: "userDetails",
                            },
                        },
                        {
                            $unwind: "$userDetails",
                        },
                    ]);
                }
                res.status(200).json({ mentees });
            }
            catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    return next(error);
                }
            }
        });
    }
    getMentors(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mentors = yield userModel_1.default.aggregate([
                    { $match: { role: "mentor" } },
                    {
                        $lookup: {
                            from: "mentorprofiles",
                            foreignField: "mentor_id",
                            localField: "_id",
                            as: "profileDetails",
                        },
                    },
                    {
                        $unwind: "$profileDetails",
                    },
                    {
                        $lookup: {
                            from: "mentorreports",
                            foreignField: "mentor_id",
                            localField: "_id",
                            as: "mentorReports",
                        },
                    },
                ]);
                if (mentors) {
                    res.status(200).json({ status: "success", mentors });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.log(error);
                    return next(error);
                }
            }
        });
    }
    getMonthlyUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const year = req.params.year;
                const monthMap = {
                    1: "January",
                    2: "February",
                    3: "March",
                    4: "April",
                    5: "May",
                    6: "June",
                    7: "July",
                    8: "August",
                    9: "September",
                    10: "October",
                    11: "November",
                    12: "December",
                };
                const monthlyUsers = yield userModel_1.default.aggregate([
                    {
                        $group: {
                            _id: { $month: "$createdAt" },
                            count: { $sum: 1 },
                        },
                    },
                ]);
                const monthlyData = {};
                monthlyUsers.forEach((entry) => {
                    const monthName = monthMap[entry._id];
                    monthlyData[monthName] = entry.count;
                });
                console.log("First Monthly Data", monthlyData);
                res.json({ monthlyData });
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
    getAnalytics(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mentees = yield userModel_1.default.find({ role: "mentee" }).countDocuments();
                const mentors = yield userModel_1.default.find({ role: "mentor" }).countDocuments();
                if (mentees > 0 && mentors > 0) {
                    res.json({ mentees, mentors });
                }
                else {
                    res.status(404).json({ error: "No data found" });
                }
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
    getYearData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const year = req.query.year;
                console.log("->", year);
                const monthMap = {
                    1: "January",
                    2: "February",
                    3: "March",
                    4: "April",
                    5: "May",
                    6: "June",
                    7: "July",
                    8: "August",
                    9: "September",
                    10: "October",
                    11: "November",
                    12: "December",
                };
                const yearString = year;
                let matchCondition = {};
                if (year) {
                    matchCondition = {
                        $match: {
                            $expr: { $eq: [{ $year: "$createdAt" }, parseInt(yearString)] },
                        },
                    };
                }
                const monthlyUsers = yield userModel_1.default.aggregate([
                    matchCondition,
                    {
                        $group: {
                            _id: {
                                year: { $year: "$createdAt" },
                                month: { $month: "$createdAt" },
                            },
                            count: { $sum: 1 },
                        },
                    },
                ]);
                const monthlyData = {};
                monthlyUsers.forEach((entry) => {
                    const monthName = monthMap[entry._id.month];
                    const year = entry._id.year;
                    const yearMonth = monthName;
                    monthlyData[yearMonth] = entry.count;
                });
                console.log("Monthly Data", monthlyData);
                res.json({ monthlyData });
            }
            catch (error) {
                console.log(error);
                return next(error);
            }
        });
    }
}
exports.AdminControls = AdminControls;
