import { Fragment } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";

export const RequireAuth = ({ children }) => {
  const auth = useAuth();
  if (!auth?.user) {
    return <Navigate to="/auth/signin" replace />;
  }
  return children;
};
