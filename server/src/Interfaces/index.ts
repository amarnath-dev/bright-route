import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  role: string;
  is_blocked: boolean;
}

export interface IMenteeProfile extends Document {
  mentee_id: ObjectId;
  first_name: string;
  last_name: string;
  profile_img: string;
  location: string;
  job_title: string;
  linkedIn: string;
  twitter: string;
  goal: string;
  reports: Report[];
}

export interface IOtp extends Document {
  user_id: ObjectId;
  email: string;
  otp: string;
  createdAt: Date;
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
  skills: [];
  reports: Report[];
  approved: boolean;
}

export interface IAdmin extends Document {
  email: string;
  password: string;
  role:string;
}
