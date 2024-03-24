//Conversation.tsx (Component)
export interface Conversation {
  members: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CurrentUser {
  email: string;
  first_name: string;
  role: string;
  _id: string;
}

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

//MentorPaymentCard.tsx
export interface MentorPlans {
  _id: string;
  mentor_id: string;
  planLimit: number;
  planDetails: Array<[PlanDetails]>;
}

//pages -> mentor -> mentorPlans.tsx (one mentor plan types)
export interface PlanService {
  _id: string;
  serviceName: string;
  serviceCount: number | null;
}

export interface MentorPlanDetails {
  _id: string;
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

//pages -> mentee -> MyMentors.tsx

export interface MentorProfileDetails {
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
  reports: Array<[]>;
  isPaymentDetails: boolean;
  isBlocked: boolean;
  mentorPlans: Array<[]>;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PaymentDetails {
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
  createdAt: string;
  updatedAt: string;
  __v: number;
  mentorProfile: MentorProfileDetails[];
  newProfileImg: string;
}

//Pages -> mentor -> MyMentees.tsx
export interface MenteeProfileDetails {
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
