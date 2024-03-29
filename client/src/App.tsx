import React, { useEffect, useRef } from "react";
import Spinner from "./componets/fallback/Spinner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./componets/protect/ProtectedRoute";
import { IsAuthenticated } from "./componets/protect/IsAuthenticated";
import { MenteeRoutes } from "./routes/MenteeRoutes";
import { MentorRoutes } from "./routes/MentorRoutes";
import { AdminRoutes } from "./routes/AdminRoutes";
import { AuthRoutes } from "./routes/AuthRoutes";
import { Socket, io } from "socket.io-client";
import { useAppSelector } from "./app/hooks";
import SocketContext from "./redux/socket/socketContext";
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

const HOST = "https://bright-route.online";
// const HOST = "http://localhost:3000";

function App() {
  const socket = useRef<Socket | null>(null);
  const { user } = useAppSelector((state) => state.userAuth);

  useEffect(() => {
    if (user) {
      socket.current = io(HOST);
      socket.current?.emit("addUser", user?._id);
      socket.current?.on("getUsers", (users) => {
        console.log(users);
        if (socket.current) {
          console.log("Socket.Current", socket);
        }
      });
      return () => {
        socket.current?.disconnect();
      };
    } else {
      console.log("Cannot find the User");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <div>
        <Router>
          <React.Suspense fallback={<Spinner />}>
            <SocketContext.Provider value={socket}>
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
            </SocketContext.Provider>
          </React.Suspense>
        </Router>
      </div>
    </>
  );
}

export default App;
