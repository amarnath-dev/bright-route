import "tailwindcss/tailwind.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/mentee/SignupPage";
import SigninPage from "./pages/mentee/SigninPage";
import Home from "./pages/mentee/Home";
import ContainerForm from "./componets/mentor/mentorApply/ContainerForm";
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
            <Route path="/mentor/apply1" element={<ContainerForm />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </Router>
      </div>
    </>
  );
}
export default App;
