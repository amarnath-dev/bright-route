import React from "react";
import Spinner from "./componets/fallback/Spinner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./componets/protect/ProtectedRoute";
import { IsAuthenticated } from "./componets/protect/IsAuthenticated";
import { MenteeRoutes } from "./routes/MenteeRoutes";
import { MentorRoutes } from "./routes/MentorRoutes";
import { AdminRoutes } from "./routes/adminRoutes";
import { AuthRoutes } from "./routes/AuthRoutes";
import "./App.css";
import "tailwindcss/tailwind.css";

const menteeRoutes = MenteeRoutes();
const mentorRoutes = MentorRoutes();
const adminRoutes = AdminRoutes();
const authRoutes = AuthRoutes();

const PageNotFound = React.lazy(
  () => import("./componets/NotFound/PageNotFound")
);
const VideoChat = React.lazy(() => import("./componets/VideoChat/VideoChat"));

function App() {
  return (
    <>
      <div>
        <Router>
          <React.Suspense fallback={<Spinner />}>
            <Routes>
              {/* Authenticatin Routes  */}
              {authRoutes}
              {/* Mentee Routes  */}
              <Route element={<IsAuthenticated />}>
                <Route path="/video/:pairId" element={<VideoChat />} />
                <Route element={<ProtectedRoute allowedRole={"mentee"} />}>
                  {menteeRoutes}
                </Route>

                {/* Mentor Routes  */}
                <Route element={<ProtectedRoute allowedRole={"mentor"} />}>
                  {mentorRoutes}
                </Route>

                {/* Admin Routes  */}
                <Route element={<ProtectedRoute allowedRole={"admin"} />}>
                  {adminRoutes}
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
