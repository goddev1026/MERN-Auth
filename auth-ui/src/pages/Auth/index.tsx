import { makeStyles } from "@material-ui/core";
import React from "react";
import { Container } from "react-bootstrap-v5";
import { Navigate, Routes, Route } from "react-router-dom";

import { Login } from "./Login";
import { Registration } from "./Registration";

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 60,
  },
}));

const AuthPage: React.FC = () => {
  const classes = useStyles();
  return (
    <Container fluid className={classes.container}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Registration />} />
        <Route path="/" element={<Navigate replace to="/auth/login" />} />
      </Routes>
    </Container>
  );
};

export default AuthPage;
