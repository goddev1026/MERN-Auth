import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../store";

const AuthRoute: React.FC<{
  children: JSX.Element;
}> = ({ children }) => {
  const { accessToken } = useAuth();
  return !accessToken ? children : <Navigate to="/" />;
};

export default AuthRoute;
