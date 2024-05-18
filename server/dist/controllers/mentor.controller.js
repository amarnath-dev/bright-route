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
exports.MentorController = void 0;
const Mentor_1 = __importDefault(require("../models/Mentor"));
const mongodb_1 = require("mongodb");
const Plan_1 = __importDefault(require("../models/Plan"));
const Payment_1 = __importDefault(require("../models/Payment"));
class MentorController {
    mentorprofileDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (user) {
                    const mentorProfile = yield Mentor_1.default.aggregate([
                        { $match: { mentor_id: new mongodb_1.ObjectId(user.id) } },
                        {
                            $lookup: {
                                from: "users",
                                localField: "mentor_id",
                                foreignField: "_id",
                                as: "mentorEmail",
                            },
                        },
                    ]);
                    const mentor = mentorProfile[0];
                    const mentorDetails = {
                        mentor_id: mentor === null || mentor === void 0 ? void 0 : mentor.mentor_id,
                        profile_img: (mentor === null || mentor === void 0 ? void 0 : mentor.profile_img) ? mentorProfile[0].profile_img : "",
                        first_name: mentor === null || mentor === void 0 ? void 0 : mentor.first_name,
                        last_name: mentor === null || mentor === void 0 ? void 0 : mentor.last_name,
                        job_title: (mentor === null || mentor === void 0 ? void 0 : mentor.job_title) ? mentor.job_title : "",
                        mentorEmail: mentor === null || mentor === void 0 ? void 0 : mentor.mentorEmail[0].email,
                        linkedIn: (mentor === null || mentor === void 0 ? void 0 : mentor.linkedIn) ? mentor.linkedIn : "",
                        twitter: (mentor === null || mentor === void 0 ? void 0 : mentor.twitter) ? mentor.twitter : "",
                        web_url: (mentor === null || mentor === void 0 ? void 0 : mentor.web_url) ? mentor.web_url : "",
                        bio: (mentor === null || mentor === void 0 ? void 0 : mentor.bio) ? mentor.bio : "",
                        skills: mentor === null || mentor === void 0 ? void 0 : mentor.skills,
                        state: mentor === null || mentor === void 0 ? void 0 : mentor.state,
                        company: (mentor === null || mentor === void 0 ? void 0 : mentor.company) ? mentor.company : "",
                        category: mentor === null || mentor === void 0 ? void 0 : mentor.category,
                        role: mentor === null || mentor === void 0 ? void 0 : mentor.mentorEmail[0].role,
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
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    updateProfileImg(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body.user;
                if (user) {
                    const update = yield Mentor_1.default.findOneAndUpdate({ mentor_id: user._id }, { $set: { profile_img: req.body.img_firebase_id } }, { new: true });
                    if (update === null || update === void 0 ? void 0 : update._id) {
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
    updateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (user) {
                    const skills = req.body.defaultSkills;
                    const arrayOfStrings = skills.map((obj) => obj.title);
                    const newDetails = req.body.mentorData;
                    const update = yield Mentor_1.default.findOneAndUpdate({
                        mentor_id: new mongodb_1.ObjectId(user.id),
                    }, {
                        $set: {
                            profile_img: newDetails.profile_img,
                            first_name: newDetails.first_name,
                            last_name: newDetails.last_name,
                            job_title: newDetails.job_title,
                            linkedIn: newDetails.linkedIn,
                            twitter: newDetails.twitter,
                            web_url: newDetails.web_url,
                            bio: newDetails.bio,
                            company: newDetails.company,
                            state: newDetails.state,
                            category: newDetails.category,
                            skills: arrayOfStrings,
                        },
                    }, { new: true });
                    if (update === null || update === void 0 ? void 0 : update._id) {
                        res
                            .status(200)
                            .json({ status: "success", message: "Profile Updated" });
                    }
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    createPlan(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const existingDocument = yield Plan_1.default.findOne({
                    mentor_id: new mongodb_1.ObjectId(user === null || user === void 0 ? void 0 : user.id),
                });
                console.log("Before filtering", existingDocument);
                if (existingDocument) {
                    const activePlans = existingDocument.planDetails.filter((plan) => !plan.isDeleted);
                    console.log("Active plans len", activePlans.length);
                    if (activePlans.length >= 2) {
                        res.status(200).json({
                            status: "exists",
                            message: "User can only have up to two plans",
                        });
                        return;
                    }
                }
                const newPlanDetails = {
                    mentor_id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
                    planAmount: req.body.planAmount,
                    planType: req.body.planType,
                    planDescription: req.body.planDescription,
                    planServices: [
                        {
                            serviceName: req.body.videoCallSession,
                            serviceCount: parseInt(req.body.videoCallCount),
                        },
                        {
                            serviceName: req.body.chatSessions,
                            serviceCount: null,
                        },
                        {
                            serviceName: req.body.handsOnSupport,
                            serviceCount: null,
                        },
                    ],
                };
                if (existingDocument === null || existingDocument === void 0 ? void 0 : existingDocument._id) {
                    existingDocument.planDetails.push(newPlanDetails);
                    const updatedDocument = yield existingDocument.save();
                    res.status(200).json({
                        status: "success",
                        message: "Plan added successfully",
                        plan: updatedDocument,
                    });
                    return;
                }
                else {
                    const planDetails = new Plan_1.default({
                        mentor_id: user === null || user === void 0 ? void 0 : user.id,
                        planDetails: [newPlanDetails],
                    });
                    const savedPlan = yield planDetails.save();
                    if (savedPlan) {
                        yield Mentor_1.default.findOneAndUpdate({ mentor_id: new mongodb_1.ObjectId(user === null || user === void 0 ? void 0 : user.id) }, { $set: { isPaymentDetails: true } });
                    }
                    res.status(201).json({
                        status: "success",
                        message: "Plan created successfully",
                        plan: savedPlan,
                    });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    getPlans(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const mentorId = req.params.mentorId;
                const plans = yield Plan_1.default.findOne({
                    mentor_id: new mongodb_1.ObjectId(mentorId),
                });
                if ((plans === null || plans === void 0 ? void 0 : plans.planDetails) && plans.planDetails.length > 0) {
                    const activePlans = plans.planDetails.filter((plan) => plan.isDeleted === false);
                    const isPurchased = yield Payment_1.default.findOne({
                        mentor_id: new mongodb_1.ObjectId(mentorId),
                        mentee_id: new mongodb_1.ObjectId(user === null || user === void 0 ? void 0 : user.id),
                    });
                    if (!isPurchased) {
                        res.status(200).json({ status: "success", plans: activePlans });
                    }
                    else {
                        res.status(200).json({ status: "exists" });
                    }
                }
                else {
                    res.status(200).json({ status: "Not plans Exists" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    deletePlan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const planId = req.params.planId;
                if (planId) {
                    const updateResult = yield Plan_1.default.updateOne({ "planDetails._id": new mongodb_1.ObjectId(planId) }, { $set: { "planDetails.$.isDeleted": true } });
                    if (updateResult.modifiedCount > 0) {
                        res
                            .status(200)
                            .json({ status: "success", message: "Plan Deleted Successfully" });
                    }
                    else {
                        res.status(404).json({ status: "failed", message: "Plan not found" });
                    }
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    menteeApllication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req === null || req === void 0 ? void 0 : req.user;
                const mentorApplication = yield Payment_1.default.aggregate([
                    {
                        $match: { mentor_id: new mongodb_1.ObjectId(user === null || user === void 0 ? void 0 : user.id) },
                    },
                    {
                        $lookup: {
                            from: "menteeprofiles",
                            localField: "mentee_id",
                            foreignField: "mentee_id",
                            as: "menteeDetails",
                        },
                    },
                    {
                        $unwind: "$menteeDetails",
                    },
                ]);
                if (mentorApplication) {
                    res.status(200).json({ status: "success", mentorApplication });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    paymentDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentId = req.params.paymentId;
                const paymentDetails = yield Payment_1.default.findById(paymentId);
                if (paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails._id) {
                    res.status(200).json({ status: "success", paymentDetails });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    planDetails(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const planId = req.params.planId;
                if (planId) {
                    const plan = yield Plan_1.default.find({ "planDetails._id": new mongodb_1.ObjectId(planId) }, { "planDetails.$": 1 });
                    if (plan) {
                        res.status(200).json({ plan: (_a = plan[0]) === null || _a === void 0 ? void 0 : _a.planDetails[0] });
                    }
                    else {
                        console.log("Plan not found in database");
                    }
                }
                else {
                    console.log("Plan ID not found");
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    checkPlan(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const planId = (_a = req.params) === null || _a === void 0 ? void 0 : _a.planId;
                if (planId) {
                    const plan = yield Plan_1.default.findOne({
                        "planDetails._id": planId,
                    });
                    if (plan === null || plan === void 0 ? void 0 : plan._id) {
                        const applyPlan = plan.planDetails.find((p) => (p === null || p === void 0 ? void 0 : p._id.toString()) === planId);
                        if (applyPlan) {
                            if (applyPlan.isDeleted) {
                                res
                                    .status(200)
                                    .json({ status: "failed", mentorId: applyPlan === null || applyPlan === void 0 ? void 0 : applyPlan.mentor_id });
                            }
                            else {
                                res
                                    .status(200)
                                    .json({ status: "success", message: "Plan is valid" });
                            }
                        }
                        else {
                            res
                                .status(404)
                                .json({ status: "failed", message: "Plan not found" });
                        }
                    }
                    else {
                        res.status(404).json({ status: "failed", message: "Plan not found" });
                    }
                }
                else {
                    res
                        .status(400)
                        .json({ status: "failed", message: "Plan ID not found" });
                }
            }
            catch (error) {
                console.log("Error checking plan:", error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
    getExpired(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mentor = req === null || req === void 0 ? void 0 : req.user;
                if (mentor) {
                    const expired = yield Payment_1.default.aggregate([
                        {
                            $match: {
                                mentor_id: new mongodb_1.ObjectId(mentor.id),
                                isExpired: true,
                            },
                        },
                        {
                            $lookup: {
                                from: "menteeprofiles",
                                localField: "mentee_id",
                                foreignField: "mentee_id",
                                as: "menteeDetails",
                            },
                        },
                        {
                            $unwind: "$menteeDetails",
                        },
                    ]);
                    res.status(200).json({ status: "success", expired });
                }
                else {
                    console.log("Mentor Object Not Found");
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "An internal server error occurred" });
            }
        });
    }
}
exports.MentorController = MentorController;
