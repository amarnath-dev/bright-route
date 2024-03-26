import React from "react";
import { Route } from "react-router-dom";

const Dashboard = React.lazy(() => import("../pages/admin/Dashboard"));

const MentorApplication = React.lazy(
  () => import("../pages/admin/MentorApplication")
);

const ApplicationReview = React.lazy(
  () => import("../pages/admin/ApplicationReview")
);

const MenteeManagement = React.lazy(
  () => import("../pages/admin/MenteeManagement")
);

const MentorManagement = React.lazy(
  () => import("../pages/admin/MentorManagement")
);

export const AdminRoutes = () => {
  return (
    <>
      <Route path="/admin/dashboard" element={<Dashboard />} />

      <Route path="/admin/mentor-application" element={<MentorApplication />} />

      <Route
        path="/admin/application-review/:mentor"
        element={<ApplicationReview />}
      />

      <Route path="/admin/mentee-management" element={<MenteeManagement />} />

      <Route path="/admin/mentor-management" element={<MentorManagement />} />
    </>
  );
};
