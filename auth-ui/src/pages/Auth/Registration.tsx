import React, { useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form, FormControl, Row } from "react-bootstrap-v5";
import { makeStyles } from "@material-ui/core";

import { useAlert, useTouched, useWaiting } from "../../hooks";
import { requestRegister } from "../../axios";
import { ILoginDetails } from "./Login";
import ActionButton from "../../components/ActionButton";

export interface IRegistrationDetails extends ILoginDetails {
  confirmationPassword: string;
}

const useStyles = makeStyles(() => ({
  form: {
    margin: "auto",
    width: 300,
  },
  row: {
    marginBottom: 12,
    "&.required .form-label::after": {
      content: "'*'",
      marginLeft: 4,
      color: "#dc3545",
    },
  },
}));

const initialValues = {
  email: "",
  password: "",
  confirmationPassword: "",
};

export const Registration: React.FC = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const { error: alertError, success: alertSuccess } = useAlert();
  const [values, setValues] = useState<IRegistrationDetails>(initialValues);
  const [touched, handleBlur] = useTouched();
  const [waiting, setWaiting, unsetWaiting] = useWaiting();

  const isValid = useMemo(
    () => !!values.email && !!values.password && !!values.confirmationPassword,
    [values]
  );

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { name, value } }) => {
      setValues((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback<React.FormEventHandler>(
    (e) => {
      e.preventDefault();
      setWaiting();
      requestRegister(values)
        .finally(unsetWaiting)
        .then(() => {
          alertSuccess("Successfully registered.");
          navigate("/auth/login");
        })
        .catch(alertError);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [values]
  );

  return (
    <Container fluid className="py-4">
      <Form className={classes.form} onSubmit={handleSubmit}>
        <h1 className="text-center">Sign Up</h1>

        <Row className={classes.row + " required"}>
          <Form.Label>Email</Form.Label>
          <FormControl
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && !values.email && (
            <div className="text-danger">Email is required.</div>
          )}
        </Row>

        <Row className={classes.row + " required"}>
          <Form.Label>Password</Form.Label>
          <FormControl
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && !values.password && (
            <div className="text-danger">Password is required.</div>
          )}
        </Row>

        <Row className={classes.row + " required"}>
          <Form.Label>Confirm Password</Form.Label>
          <FormControl
            name="confirmationPassword"
            type="password"
            value={values.confirmationPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.confirmationPassword && !values.confirmationPassword && (
            <div className="text-danger">
              Confirmation password is required.
            </div>
          )}
        </Row>

        <div className="d-flex justify-content-between align-items-center mt-4">
          <div>
            Have an account? <Link to="/auth/login">Sign In</Link>
          </div>
          <ActionButton
            variant="primary"
            type="submit"
            isWaiting={waiting}
            disabled={!isValid}
          >
            Sign Up
          </ActionButton>
        </div>
      </Form>
    </Container>
  );
};
