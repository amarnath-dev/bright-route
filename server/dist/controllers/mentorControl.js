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
const mentorProfileModel_1 = __importDefault(require("../models/mentorProfileModel"));
const mongodb_1 = require("mongodb");
const mentorPlansModel_1 = __importDefault(require("../models/mentorPlansModel"));
const paymentModel_1 = __importDefault(require("../models/paymentModel"));
class MentorController {
    mentorprofileDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (user) {
                    const mentorProfile = yield mentorProfileModel_1.default.aggregate([
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
                if (error instanceof Error) {
                    console.log(error);
                    return next(error);
                }
            }
        });
    }
    updateProfileImg(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.body.user;
                if (user) {
                    const update = yield mentorProfileModel_1.default.findOneAndUpdate({ mentor_id: user._id }, { $set: { profile_img: req.body.img_firebase_id } }, { new: true });
                    if (update === null || update === void 0 ? void 0 : update._id) {
                        res
                            .status(200)
                            .json({ status: "success", message: "Profile Image Updated" });
                    }
                }
            }
            catch (error) {
                console.log(error);
                return next(Error("Profile Image Update Failed"));
            }
        });
    }
    updateProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (user) {
                    const skills = req.body.defaultSkills;
                    const arrayOfStrings = skills.map((obj) => obj.title);
                    const newDetails = req.body.mentorData;
                    const update = yield mentorProfileModel_1.default.findOneAndUpdate({
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
                return next(Error("Profile Update Failed"));
            }
        });
    }
    createPlan(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const existingDocument = yield mentorPlansModel_1.default.findOne({
                    mentor_id: new mongodb_1.ObjectId(user === null || user === void 0 ? void 0 : user.id),
                });
                if (existingDocument && existingDocument.planDetails.length >= 2) {
                    res.status(400).json({
                        status: "failed",
                        message: "User can only have up to two plans",
                    });
                    return;
                }
                const newPlanDetails = {
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
                    const planDetails = new mentorPlansModel_1.default({
                        mentor_id: user === null || user === void 0 ? void 0 : user.id,
                        planDetails: [newPlanDetails],
                    });
                    const savedPlan = yield planDetails.save();
                    if (savedPlan) {
                        yield mentorProfileModel_1.default.findOneAndUpdate({ mentor_id: new mongodb_1.ObjectId(user === null || user === void 0 ? void 0 : user.id) }, { $set: { isPaymentDetails: true } });
                    }
                    res.status(201).json({
                        status: "success",
                        message: "Plan created successfully",
                        plan: savedPlan,
                    });
                    return;
                }
            }
            catch (error) {
                console.error(error);
                return next(Error("Plan Creation failed"));
            }
        });
    }
    getPlans(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const plans = yield mentorPlansModel_1.default.findOne({ mentor_id: user === null || user === void 0 ? void 0 : user.id });
                if (plans === null || plans === void 0 ? void 0 : plans._id) {
                    console.log("Please", plans);
                    res.status(200).json({ status: "success", plans });
                }
                else {
                    res.status(200).json({ status: "Not plans Exists" });
                }
            }
            catch (error) {
                console.error(error);
                return next(Error("Plan Creation failed"));
            }
        });
    }
    deletePlan(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const planId = req.params.planId;
                const planType = req.params.planType;
                console.log(planId);
                console.log(planType);
                if (planId) {
                    const remove = yield mentorPlansModel_1.default.updateOne({ _id: planId }, { $pull: { planDetails: { planType: planType } } });
                    if (remove.modifiedCount > 0) {
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
                return next(Error("Plan Deletion failed"));
            }
        });
    }
    menteeApllication(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req === null || req === void 0 ? void 0 : req.user;
                const mentorApplication = yield paymentModel_1.default.aggregate([
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
                ]);
                console.log("Application", mentorApplication);
                if (mentorApplication) {
                    res.status(200).json({ status: "success", mentorApplication });
                }
            }
            catch (error) {
                console.error(error);
                return next(Error("Mentor Application fetch failed"));
            }
        });
    }
    paymentDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paymentId = req.params.paymentId;
                const paymentDetails = yield paymentModel_1.default.findById(paymentId);
                if (paymentDetails === null || paymentDetails === void 0 ? void 0 : paymentDetails._id) {
                    res.status(200).json({ status: "success", paymentDetails });
                }
            }
            catch (error) {
                console.error(error);
                return next(Error("Mentor Application fetch failed"));
            }
        });
    }
    planDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const planId = req.params.planId;
                if (planId) {
                    const plan = yield mentorPlansModel_1.default.find({ "planDetails._id": planId }, { "planDetails.$": 1 });
                    if (plan) {
                        res.status(200).json({ plan: plan[0].planDetails[0] });
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
                return next(Error("Mentor Application fetch failed"));
            }
        });
    }
}
exports.MentorController = MentorController;
