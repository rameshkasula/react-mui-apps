import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";

export const RequireAuth = ({ children }) => {
  const auth = useAuth();
  if (!auth?.user) {
    return <Navigate to="/auth/signin" replace />;
  }
  if (window.location.pathname === "/") {
    return <Navigate to="/app" replace />;
  }
  return children;
};
