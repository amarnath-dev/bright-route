import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import Cookies from "js-cookie";

export default function IsAuthenticated() {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.userAuth);
  const token = Cookies.get("token");

  useEffect(() => {
    if (user?.role === "mentee" && token) {
      navigate("/");
    } else if (user?.role === "mentor" && token) {
      navigate("/mentor/home");
    } else if (user?.role === "admin" && token) {
      navigate("/admin/dashboard");
    }
    if (!token) {
      navigate("/signin");
    }
  }, [navigate, user, token]);

  return <>{!user ? <Outlet /> : null}</>;
}
