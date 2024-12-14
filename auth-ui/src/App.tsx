import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { MainNavbar } from "./components/Layout";
import { AppRoutes } from "./routes";

import "./App.css";

type Props = {
  basename: string;
};

const App: React.FC<Props> = ({ basename }) => {
  return (
    <Suspense fallback={<></>}>
      <Router basename={basename}>
        <MainNavbar />
        <AppRoutes />
      </Router>
    </Suspense>
  );
};

export default App;
