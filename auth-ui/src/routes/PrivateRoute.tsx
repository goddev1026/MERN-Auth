import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../store";

const PrivateRoute: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const { accessToken } = useAuth();
  return !!accessToken ? children : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
