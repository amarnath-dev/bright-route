import { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { Navigate, Outlet } from "react-router-dom";
interface Props {
  allowedRole: string;
}
const ProtectedRoute: FC<Props> = ({ allowedRole }) => {
  const { user } = useAppSelector((state) => state.userAuth);
  const isAuth = user && user.role === allowedRole;
  return <>{isAuth ? <Outlet /> : <Navigate to="/signin" />}</>;
};
export default ProtectedRoute;
