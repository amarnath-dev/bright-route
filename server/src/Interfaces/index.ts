import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  is_blocked: boolean;
}

export interface IConversation extends Document {
  members: [];
}

export interface IMessage extends Document {
  conversationId: string;
  senderId: string;
  text: string;
  type: string;
  IsDeleted: boolean;
}

export interface IMenteeProfile extends Document {
  mentee_id: ObjectId;
  first_name: string;
  last_name: string;
  profile_img: string;
  country: string;
  region: string;
  job_title: string;
  linkedIn: string;
  twitter: string;
  goal: string;
  available_time: string;
  reports: Report[];
}

export interface IOtp extends Document {
  user_id: ObjectId;
  email: string;
  otp: string;
  createdAt: Date;
}

export interface IApplication extends Document {
  mentee_id: ObjectId;
  mentor_id: ObjectId;
  mentor_plan_id: ObjectId;
  date: Date;
  goal_of_mentorship: string;
  time_to_reach_goal: string;
  message_to_mentor: string;
  razorPay_id: string;
  paymentDone: boolean;
  duration: Number;
  plan_price: Number;
  isExpired: boolean;
}

export interface IReport extends Document {
  mentor_id: ObjectId;
  mentee_id: ObjectId;
  ReportDetails: [{}];
}

export interface IRefreshToken extends Document {
  refreshToken: string;
}

export interface ISkill extends Document {
  topTechnicalSkills: Array<{ label: string }>;
}

export interface ICompany extends Document {
  topTechnicalSkills: [{}];
}

export interface IMentorProfile extends Document {
  mentor_id: ObjectId;
  profile_img: string;
  first_name: string;
  last_name: string;
  job_title: string;
  company: string;
  state: string;
  category: string;
  bio: string;
  linkedIn: string;
  twitter: string;
  web_url: string;
  why_mentor: string;
  achievement: string;
  profile_state: string;
  skills: [];
  // reports: Report[];
  isPaymentDetails: boolean;
  is_active: boolean;
  isBlocked: boolean;
  mentorPlans: [{}];
}

export interface IAdmin extends Document {
  email: string;
  password: string;
  role: string;
}

export interface IPlans extends Document {
  mentor_id: ObjectId;
  planDetails: [{}];
  planLimit: number;
}

export interface INotification extends Document {
  userId: string;
  content: string;
  isDeleted: boolean;
  isVisited: boolean;
  role: string;
  messageType: string;
  senderId: string;
}
