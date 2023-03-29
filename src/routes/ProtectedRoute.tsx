import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/auth/hook";

export const ProtectedRoute = () => {
  const { user } = useAuth();

  return <>{user ? <Outlet /> : <Navigate to="/" />}</>;
};
