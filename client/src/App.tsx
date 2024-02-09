import "tailwindcss/tailwind.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/mentee/SignupPage";
import SigninPage from "./pages/mentee/SigninPage";
import Home from "./pages/mentee/Home";
import { ContainerForm } from "../src/componets/mentor/mentorApply/ContainerForm";
import ApplySuccess from "./pages/mentor/ApplySuccess";
import "./App.css";
import AdminLogin from "./pages/admin/AdminLogin";
import { Dashboard } from "./pages/admin/Dashboard";
import { MentorApplication } from "./pages/admin/MentorApplication";
import { ApplicationReview } from "./pages/admin/ApplicationReview";
import MentorHome from "./pages/mentor/MentorHome";
import MentorProfile from "./pages/mentor/MentorProfile";
import { SearchMentors } from "./pages/mentee/SearchMentors";
import { SkillManagment } from "./pages/admin/SkillManagment";
import { MenteeProfile } from "./pages/mentee/MenteeProfile";
// import MentorLoginForm from "./pages/mentor/MentorLogin";
// import IsAuthenticated from "./componets/Routes/IsAuthenticated";
// import IsProtected from "./componets/Routes/IsProtected";

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            {/* <Route element={<IsAuthenticated />}> */}
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
            {/* </Route> */}
            {/* Mentee Route */}
            {/* <Route element={<IsProtected allowedRole="mentee" />}> */}
            <Route path="/" element={<Home />} />
            <Route path="/mentor/browse" element={<SearchMentors />} />
            <Route path="/managment" element={<MenteeProfile />} />
            {/* </Route> */}
            {/* Mentor Specific routes  */}
            {/* <Route element={<IsProtected allowedRole="mentor" />}> */}
            <Route path="/mentor/home" element={<MentorHome />} />
            <Route path="/mentor/profile" element={<MentorProfile />} />
            <Route path="/mentor/apply" element={<ContainerForm />} />
            <Route path="/mentor/login" element={<SigninPage />} />
            <Route path="/mentor/apply-success" element={<ApplySuccess />} />
            {/* </Route> */}

            {/* Admin Routes  */}
            {/* <Route element={<IsProtected allowedRole="admin" />}> */}
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
            <Route path="/admin/skill-managment" element={<SkillManagment />} />
            {/* </Route> */}
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </Router>
      </div>
    </>
  );
}
export default App;
