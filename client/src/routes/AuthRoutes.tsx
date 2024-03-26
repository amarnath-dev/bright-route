import React from "react";
import { Route } from "react-router-dom";

const AdminLogin = React.lazy(() => import("../pages/admin/AdminLogin"));

const SignupPage = React.lazy(() => import("../pages/mentee/SignupPage"));

const SigninPage = React.lazy(() => import("../pages/mentee/SigninPage"));

const NewPassword = React.lazy(() => import("../pages/mentee/NewPassword"));

const ContainerForm = React.lazy(
  () => import("../componets/mentor/mentorApply/ContainerForm")
);

export const AuthRoutes = () => {
  return (
    <>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/forgotpassword" element={<NewPassword />} />
      <Route path="/mentor/apply" element={<ContainerForm />} />
      <Route path="/mentor/login" element={<SigninPage />} />
    </>
  );
};
