import React from "react";
import { Route } from "react-router-dom";

const Home = React.lazy(() => import("../pages/mentee/Home"));

const SearchMentors = React.lazy(() => import("../pages/mentee/SearchMentors"));

const MenteeProfile = React.lazy(() => import("../pages/mentee/MenteeProfile"));

const ChangePassword = React.lazy(
  () => import("../componets/mentee/ChangePassword")
);

const MentorshipApplyDetails = React.lazy(
  () => import("../pages/mentee/MentorshipApplyDetails")
);

const VisitMentorProfile = React.lazy(
  () => import("../pages/mentee/VisitMentorProfile")
);

const RazorpayPayment = React.lazy(
  () => import("../pages/mentee/RazorpayPayment")
);

const PaymentSuccess = React.lazy(
  () => import("../pages/mentee/PaymentSuccess")
);

const MenteeMessages = React.lazy(
  () => import("../pages/mentee/MenteeMessages")
);

const MyMentors = React.lazy(() => import("../pages/mentee/MyMentors"));

const MenteePaymentDetails = React.lazy(
  () => import("../componets/PaymentDetails/MenteePaymentDetails")
);

const MenteeHistory = React.lazy(() => import("../pages/mentee/MenteeHistory"));

export const MenteeRoutes = () => {
  return (
    <>
      <Route index element={<Home />} />

      <Route path="/mentor/browse" element={<SearchMentors />} />

      <Route path="/managment" element={<MenteeProfile />} />

      <Route path="/managment/password" element={<ChangePassword />} />

      <Route
        path="/mentorship/apply/:planId"
        element={<MentorshipApplyDetails />}
      />

      <Route
        path="/mentor-profile/:mentorId"
        element={<VisitMentorProfile />}
      />

      <Route
        path="/mentor-profile/apply/checkout"
        element={<RazorpayPayment />}
      />

      <Route
        path="/mentor-profile/apply/checkout/success/:mentorId"
        element={<PaymentSuccess />}
      />

      <Route path="/chat/:mentorId" element={<MenteeMessages />} />

      <Route path="/my-mentors" element={<MyMentors />} />

      <Route
        path="/my-mentors/paymentDetails/:paymentId"
        element={<MenteePaymentDetails />}
      />

      <Route
        path="/my-mentors/mentor-profile/:mentorId"
        element={<VisitMentorProfile />}
      />

      <Route path="/history" element={<MenteeHistory />} />
    </>
  );
};
