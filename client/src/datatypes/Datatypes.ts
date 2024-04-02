//Multi-form About Data Types
export type MentorAboutData = {
  profile_img: File | null;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  job_title: string;
  company: string;
  state: string;
};

//Multi-form Container Data Types
export type FormData = {
  profile_img: File | null;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  job_title: string;
  company: string;
  state: string;
  job_category: string;
  skills: string[];
  bio_dec: string;
  linkedIn_url: string;
  twitter_url: string;
  website_url: string;
  why_mentor: string;
  achievement: string;
};

export const INITIAL_DATA: FormData = {
  profile_img: null,
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  job_title: "",
  company: "",
  state: "",
  job_category: "",
  skills: [],
  bio_dec: "",
  linkedIn_url: "",
  twitter_url: "",
  website_url: "",
  why_mentor: "",
  achievement: "",
};

//Multi-form Profile Data Types
export type MentorProfileData = {
  job_category: string;
  skills: string[];
  bio_dec: string;
  linkedIn_url: string;
  twitter_url: string;
  website_url: string;
};

//Multi-form Experiance Data Types
export type MentorExperianceData = {
  why_mentor: string;
  achievement: string;
};

//for admin table
type values = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

export type cellValue = {
  row: values;
};

//mentor
export type ApplicationObj = {
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
};

export interface singleApplicationObj {
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

export interface mentorProfileObj {
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

//Sign in form credential
export interface SigninCredential {
  email: string;
  password: string;
}

export interface MentorSearchData {
  label: string;
}
