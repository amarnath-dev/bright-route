export interface MentorDetails {
  _id: string;
  mentor_id: string;
  profile_img: string;
  first_name: string;
  last_name: string;
  job_title: string;
  company: string;
  createdAt: string;
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
  createdAt: string;
  updatedAt: string;
  __v: number;
  mentorDetails: MentorDetails;
  profile_img: string;
}

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

export interface Payment {
  _id: string;
  duration: number;
  goal_of_mentorship: string;
  isExpired: boolean;
  mentee_id: string;
  mentor_id: string;
  mentor_plan_id: string;
  message_to_mentor: string;
  paymentDone: boolean;
  plan_price: number;
  razorPay_id: string;
  time_to_reach_goal: string;
}

interface Services {
  _id: string;
  serviceCount: number | null;
  serviceName: string;
}

export interface Plan {
  _id: string;
  isDeleted: boolean;
  planAmount: number;
  planDescription: string;
  planServices: Services[];
  planType: string;
}

export interface RateMentorProps {
  openModal: boolean;
  mentorId: string | null;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
