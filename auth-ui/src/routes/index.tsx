import React from "react";
import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import AuthRoute from "./AuthRoute";
import AuthPage from "../pages/Auth";
import HomePage from "../pages/Home";
import Logs from "../pages/Logs";

const privateRoutes = [
  {
    index: true,
    Component: HomePage,
  },
  {
    path: "log",
    Component: Logs,
  },
];

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {privateRoutes.map(({ Component, ...props }, key) => (
        <Route
          key={key}
          element={
            <PrivateRoute>
              <Component />
            </PrivateRoute>
          }
          {...props}
        />
      ))}
      <Route
        path="auth/*"
        element={
          <AuthRoute>
            <AuthPage />
          </AuthRoute>
        }
      />
      <Route path="*" element={<h1>Page not found.</h1>} />
    </Routes>
  );
};
