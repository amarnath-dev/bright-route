import { FC } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { Navigate, Outlet } from "react-router-dom";

interface RoleProps {
  allowedRole: string;
}

const ProtectedRoute: FC<RoleProps> = ({ allowedRole }) => {
  const { user } = useAppSelector((state) => state.userAuth);
  const isAuth = user && user.role === allowedRole;
  return <>{isAuth ? <Outlet /> : <Navigate to="/signin" />}</>;
};

export default ProtectedRoute;
