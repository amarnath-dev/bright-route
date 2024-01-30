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

