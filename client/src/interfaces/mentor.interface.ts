interface PlanServices {
  serviceCount: number | null;
  serviceName: string;
}

interface PlanDetails {
  isDeleted: boolean;
  planAmount: number;
  planDescription: string;
  planServices: Array<[PlanServices]>;
  planType: string;
}

export interface MentorPlans {
  _id: string;
  mentor_id: string;
  planLimit: number;
  planDetails: Array<[PlanDetails]>;
}

export interface PlanService {
  _id: string;
  serviceName: string;
  serviceCount: number | null;
}

export interface MentorPlanDetails {
  _id: string;
  mentor_id: string;
  isDeleted: boolean;
  planAmount: number;
  planDescription: string;
  planType: string;
  planServices: PlanService[];
}

export interface MentorPlan {
  _id: string;
  mentor_id: string;
  planDetails: MentorPlanDetails[];
  planLimit: number;
  createdAt: string;
  updatedAt: string;
}

export interface MyMenteePayment {
  duration: number;
  goal_of_mentorship: string;
  isExpired: boolean;
  menteeDetails: {
    _id: string;
    country: string;
    first_name: string;
    last_name: string;
    goal: string;
    job_title: string;
    linkedIn: string;
    twitter: string;
    profile_img: string;
    mentee_id: string;
    email: string;
  };
  mentee_id: string;
  mentor_id: string;
  mentor_plan_id: string;
  message_to_mentor: string;
  paymentDone: boolean;
  plan_price: boolean;
  razorPay_id: string;
  time_to_reach_goal: string;
  _id: string;
  createdAt: string;
  profile_img: string;
}

export interface Reviews {
  _id: string;
  mentor_id: string;
  mentee_id: string;
  rating: number;
  description: string;
  updatedAt: string;
}

export interface MentorProfileObj {
  imageUrl: string;
  _id: string;
  mentor_id: string;
  mentorEmail: string;
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
  skills: string[];
  spots: number;
  reports: Report[];
  approved: boolean;
  reviews: Reviews[];
}

export interface MentorProfileEdit {
  first_name: string;
  last_name: string;
  mentorEmail: string;
  company: string;
  linkedIn: string;
  twitter: string;
  web_url: string;
  job_title: string;
  bio: string;
  skills: string[];
}

//Multi step form Types

//Types to Interface
export interface MentorAboutData {
  profile_img: File | null;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  job_title: string;
  company: string;
  state: string;
}

//Types to Interface
export interface FormData {
  profile_img: File | null;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  job_title: string;
  company: string;
  job_category: string;
  skills: string[];
  bio_dec: string;
  linkedIn_url: string;
  twitter_url: string;
  why_mentor: string;
  achievement: string;
}

export const INITIAL_DATA: FormData = {
  profile_img: null,
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  job_title: "",
  company: "",
  // state: "",
  job_category: "",
  skills: [],
  bio_dec: "",
  linkedIn_url: "",
  twitter_url: "",
  // website_url: "",
  why_mentor: "",
  achievement: "",
};

//Types to Interface
export interface MentorProfileData {
  job_category: string;
  skills: string[];
  bio_dec: string;
  linkedIn_url: string;
  twitter_url: string;
  website_url: string;
}

//Types to Interface
export interface MentorExperianceData {
  why_mentor: string;
  achievement: string;
}

export interface ApplicationObj {
  id: number;
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
  skills: [];
  reports: Report[];
  approved: boolean;
}

export interface SingleApplicationObj {
  _id: string;
  mentor_id: string;
  mentorEmail: string;
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

interface MenteeDetails {
  _id: string;
  mentee_id: string;
  first_name: string;
  last_name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  profile_img: string;
  country: string;
  goal: string;
  job_title: string;
  linkedIn: string;
  region: string;
  twitter: string;
}

export interface Expired {
  _id: string;
  mentor_id: string;
  mentee_id: string;
  razorPay_id: string;
  plan_price: number;
  mentor_plan_id: string;
  goal_of_mentorship: string;
  time_to_reach_goal: string;
  message_to_mentor: string;
  paymentDone: boolean;
  duration: number;
  isExpired: boolean;
  createdAt: Date;
  updatedAt: Date;
  menteeDetails: MenteeDetails;
  profile_img: string;
}

export interface MentorProfileCardProps {
  mentor: MentorProfileObj | undefined;
  user: string;
}

export interface NotType {
  content: string;
  createdAt: number;
  senderId: string;
  type: string;
}

export interface NotificationMentor {
  _id: string;
  content: string;
  isDeleted: boolean;
  isVisited: boolean;
  messageType: string;
  role: string;
  userId: string;
  createdAt: string;
}

export interface MentorServices {
  planAmount: string;
  planType: string;
  planDescription: string;
  videoCallSession: string;
  videoCallCount: string;
  chatSessions: string;
  handsOnSupport: string;
}

export interface SkillOption {
  title: string;
}

export interface MentorData {
  first_name: string;
  last_name: string;
  mentorEmail: string;
  company: string;
  linkedIn: string;
  twitter: string;
  job_title: string;
  bio: string;
  category: string;
  state: string;
  skills: { title: string }[];
}

export const topSkills = [
  { title: "Node js" },
  { title: "React" },
  { title: "HTML" },
  { title: "Typescript" },
  { title: "Mongodb" },
  { title: "Python" },
  { title: "Java" },
  { title: "Javascript" },
  { title: "Ruby" },
  { title: "Fortran" },
];
