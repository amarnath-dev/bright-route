import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";

export default function IsAuthenticated() {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.userAuth);

  useEffect(() => {
    if (user?.role === "mentee") {
      navigate("/");
    } else if (user?.role === "mentor") {
      navigate("/mentor/home");
    } else if (user?.role === "admin") {
      navigate("/admin/dashboard");
    }
  }, [navigate, user]);

  return <>{!user ? <Outlet /> : null}</>;
}
