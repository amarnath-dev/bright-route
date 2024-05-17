import React from "react";
import { Route } from "react-router-dom";

const MentorMessages = React.lazy(
  () => import("../pages/mentor/MentorMessages")
);

const MenteeMessages = React.lazy(
  () => import("../pages/mentee/MenteeMessages")
);

const MentorHome = React.lazy(() => import("../pages/mentor/MentorHome"));

const MentorProfile = React.lazy(() => import("../pages/mentor/MentorProfile"));

const MentorProfileEdit = React.lazy(
  () => import("../pages/mentor/MentorProfileEdit")
);

const MentorPlans = React.lazy(() => import("../pages/mentor/MentorPlans"));

const CreatePlan = React.lazy(() => import("../pages/mentor/CreatePlan"));

const MentorshipApplyDetails = React.lazy(
  () => import("../pages/mentee/MentorshipApplyDetails")
);

const MyMentees = React.lazy(() => import("../pages/mentor/MyMentees"));

const MenteePaymentDetails = React.lazy(
  () => import("../componets/PaymentDetails")
);

const ChangePassword = React.lazy(
  () => import("../componets/ChangePassword")
);

const VisitMenteeProfile = React.lazy(
  () => import("../pages/mentor/VisitMenteeProfile")
);

const MentorHistory = React.lazy(() => import("../pages/mentor/MentorHistory"));

export const MentorRoutes = () => {
  return (
    <>
      <Route path="/mentor/chat" element={<MentorMessages />} />

      <Route path="/mentor/chat/:menteeID" element={<MenteeMessages />} />

      <Route path="/mentor/home" element={<MentorHome />} />

      <Route path="/mentor/profile" element={<MentorProfile />} />

      <Route path="/mentor/profile/update" element={<MentorProfileEdit />} />

      <Route path="/mentor/plans" element={<MentorPlans />} />

      <Route path="/mentor/new-plan" element={<CreatePlan />} />

      <Route
        path="/mentor-profile/apply"
        element={<MentorshipApplyDetails />}
      />

      <Route path="/mentor/my-mentees" element={<MyMentees />} />

      <Route
        path="/mentor/mentees/paymentdetails/:paymentId"
        element={<MenteePaymentDetails />}
      />

      <Route path="/mentor/managment/password" element={<ChangePassword />} />

      <Route
        path="/mentor/mentee-profile/:menteeId"
        element={<VisitMenteeProfile />}
      />

      <Route path="/mentor/history" element={<MentorHistory />} />
    </>
  );
};
