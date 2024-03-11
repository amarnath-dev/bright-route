import "./App.css";
import React from "react";
import "tailwindcss/tailwind.css";
import Spinner from "./componets/fallback/Spinner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./componets/protect/ProtectedRoute";
import { IsAuthenticated } from "./componets/protect/IsAuthenticated";
const PageNotFound = React.lazy(
  () => import("./componets/NotFound/PageNotFound")
);
const Home = React.lazy(() => import("./pages/mentee/Home"));
const SignupPage = React.lazy(() => import("./pages/mentee/SignupPage"));
const SigninPage = React.lazy(() => import("./pages/mentee/SigninPage"));
const ApplySuccess = React.lazy(() => import("./pages/mentor/ApplySuccess"));
const AdminLogin = React.lazy(() => import("./pages/admin/AdminLogin"));
const MentorHome = React.lazy(() => import("./pages/mentor/MentorHome"));
const Dashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const MentorApplication = React.lazy(
  () => import("./pages/admin/MentorApplication")
);
const ApplicationReview = React.lazy(
  () => import("./pages/admin/ApplicationReview")
);
const MentorProfile = React.lazy(() => import("./pages/mentor/MentorProfile"));
const ContainerForm = React.lazy(
  () => import("../src/componets/mentor/mentorApply/ContainerForm")
);
const MenteeProfile = React.lazy(() => import("./pages/mentee/MenteeProfile"));
const ChangePassword = React.lazy(
  () => import("../src/componets/mentee/ChangePassword")
);
const MentorProfileEdit = React.lazy(
  () => import("./pages/mentor/MentorProfileEdit")
);
const MentorPlans = React.lazy(() => import("./pages/mentor/MentorPlans"));
const CreatePlan = React.lazy(() => import("./pages/mentor/CreatePlan"));
const VisitMentorProfile = React.lazy(
  () => import("./pages/mentee/VisitMentorProfile")
);
const MentorshipApplyDetails = React.lazy(
  () => import("./pages/mentee/MentorshipApplyDetails")
);
const MenteeManagement = React.lazy(
  () => import("./pages/admin/MenteeManagement")
);
const RazorpayPayment = React.lazy(
  () => import("./pages/mentee/RazorpayPayment")
);
const PaymentSuccess = React.lazy(
  () => import("./pages/mentee/PaymentSuccess")
);
const MenteeMessages = React.lazy(
  () => import("./pages/mentee/MenteeMessages")
);
const SearchMentors = React.lazy(() => import("./pages/mentee/SearchMentors"));
const MyMentees = React.lazy(() => import("./pages/mentor/MyMentees"));
const MenteePaymentDetails = React.lazy(
  () => import("./componets/PaymentDetails/MenteePaymentDetails")
);

const MentorMessages = React.lazy(
  () => import("./pages/mentor/MentorMessages")
);

const VisitMenteeProfile = React.lazy(
  () => import("./pages/mentor/VisitMenteeProfile")
);
const MyMentors = React.lazy(() => import("./pages/mentee/MyMentors"));
const VideoChat = React.lazy(() => import("./componets/VideoChat/VideoChat"));

function App() {
  return (
    <>
      <div>
        <Router>
          <React.Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/video/:roomId" element={<VideoChat />} />
              {/* Mentee Roles  */}
              <Route element={<IsAuthenticated />}>
                <Route element={<ProtectedRoute allowedRole={"mentee"} />}>
                  <Route index element={<Home />} />
                  <Route path="/mentor/browse" element={<SearchMentors />} />
                  <Route path="/managment" element={<MenteeProfile />} />
                  <Route
                    path="/managment/password"
                    element={<ChangePassword />}
                  />
                  <Route
                    path="/mentorship/apply"
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
                    path="/mentor-profile/apply/checkout/success"
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
                  {/* <Route path="/video/:roomId" element={<VideoChat />} /> */}
                </Route>

                {/* Mentor Routes  */}
                <Route element={<ProtectedRoute allowedRole={"mentor"} />}>
                  <Route path="/mentor/chat" element={<MentorMessages />} />
                  <Route
                    path="/mentor/chat/:menteeID"
                    element={<MenteeMessages />}
                  />
                  <Route path="/mentor/home" element={<MentorHome />} />
                  <Route path="/mentor/profile" element={<MentorProfile />} />
                  <Route
                    path="/mentor/profile/update"
                    element={<MentorProfileEdit />}
                  />
                  <Route path="/mentor/apply" element={<ContainerForm />} />
                  <Route path="/mentor/login" element={<SigninPage />} />
                  <Route
                    path="/mentor/apply-success"
                    element={<ApplySuccess />}
                  />
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
                  <Route
                    path="/mentor/managment/password"
                    element={<ChangePassword />}
                  />
                  <Route
                    path="/mentor/mentee-profile/:menteeId"
                    element={<VisitMenteeProfile />}
                  />
                </Route>

                {/* Admin Routes  */}
                <Route element={<ProtectedRoute allowedRole={"admin"} />}>
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route
                    path="/admin/mentor-application"
                    element={<MentorApplication />}
                  />
                  <Route
                    path="/admin/application-review/:mentor"
                    element={<ApplicationReview />}
                  />
                  <Route
                    path="/admin/mentee-management"
                    element={<MenteeManagement />}
                  />
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </React.Suspense>
        </Router>
      </div>
    </>
  );
}
export default App;
