import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";

export default function IsAuthenticated() {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.userAuth);
  console.log("this is user in Isauthenticated", user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return <>{!user ? <Outlet /> : null}</>;
}
