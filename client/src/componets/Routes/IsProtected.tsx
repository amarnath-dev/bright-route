import { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

interface Props {
  allowedRole: string;
}

const IsProtected: FC<Props> = ({ allowedRole }) => {
  const { user } = useAppSelector((state) => state.userAuth);
  const token = Cookies.get("token");
  const IsAuth = token && user && user.role === allowedRole;
  return <>{IsAuth ? <Outlet /> : <Navigate to={"/signin"} />}</>;
};

export default IsProtected;
