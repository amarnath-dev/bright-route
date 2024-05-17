export interface AdminCredentials {
  email: string;
  password: string;
}

interface MenteeProfile {
  _id: string;
  mentee_id: string;
  first_name: string;
  last_name: string;
  job_title: string;
  linkedIn: string;
  twitter: string;
  goal: string;
}

export interface MenteeDetails {
  _id: string;
  email: string;
  is_blocked: boolean;
  role: string;
  profileDetails: MenteeProfile;
}

export interface MentorProfile {
  _id: string;
  mentor_id: string;
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
  skills: string[];
  reports: [];
  isPaymentDetails: boolean;
  isBlocked: boolean;
  mentorPlans: [];
  createdAt: string;
  updatedAt: string;
  __v: number;
  mentorEmail: string;
}

export interface ReportDetails {
  issue_faced: string;
  issue_desc: string;
  report_date: string;
  _id: string;
}

interface MentorReport {
  _id: string;
  mentor_id: string;
  mentee_id: string;
  ReportDetails: ReportDetails[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface AdminMentorProfile {
  _id: string;
  mentor_id: string;
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
  skills: string[];
  reports: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  isPaymentDetails: boolean;
}

export interface MentorData {
  _id: string;
  email: string;
  password: string;
  role: string;
  is_blocked: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  profileDetails: AdminMentorProfile;
  mentorReports: MentorReport[];
}
