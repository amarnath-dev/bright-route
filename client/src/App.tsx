import "tailwindcss/tailwind.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/mentee/SignupPage";
import SigninPage from "./pages/mentee/SigninPage";
import Home from "./pages/mentee/Home";
import { ContainerForm } from "../src/componets/mentor/mentorApply/ContainerForm";
import ApplySuccess from "./pages/mentor/ApplySuccess";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/" element={<Home />} />

            {/* Mentor Specific routes  */}
            <Route path="/mentor/apply" element={<ContainerForm />} />
            <Route path="/mentor/apply-success" element={<ApplySuccess />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </Router>
      </div>
    </>
  );
}
export default App;
