import React from "react";
import { Route } from "react-router-dom";

const AdminLogin = React.lazy(() => import("../pages/admin/AdminLogin"));

const SignupPage = React.lazy(() => import("../pages/mentee/SignupPage"));

const SigninPage = React.lazy(() => import("../pages/mentee/SigninPage"));

const NewPassword = React.lazy(() => import("../pages/mentee/NewPassword"));

const MentorAbout = React.lazy(
  () => import("../componets/mentor/ApplyForm/About")
);

const MentorProfile = React.lazy(
  () => import("../componets/mentor/ApplyForm/ProfileDetails")
);

const MentorExperiance = React.lazy(
  () => import("../componets/mentor/ApplyForm/ExperianceDetails")
);

const MentorApplySuccess = React.lazy(
  () => import("../pages/mentor/ApplySent")
);

export const AuthRoutes = () => {
  return (
    <>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/forgotpassword" element={<NewPassword />} />
      <Route path="/mentor/apply/1" element={<MentorAbout />} />
      <Route path="/mentor/apply/2" element={<MentorProfile />} />
      <Route path="/mentor/apply/3" element={<MentorExperiance />} />
      <Route path="/mentor/apply/success" element={<MentorApplySuccess />} />
      <Route path="/mentor/login" element={<SigninPage />} />
    </>
  );
};
