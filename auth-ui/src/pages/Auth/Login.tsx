import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Form, FormControl, Row } from "react-bootstrap-v5";
import { makeStyles } from "@material-ui/core";

import { useAlert, useTouched, useWaiting } from "../../hooks";
import { useAuth } from "../../store";
import { requestLogin } from "../../axios";
import ActionButton from "../../components/ActionButton";

export interface ILoginDetails {
  email: string;
  password: string;
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
};

export const Login: React.FC = () => {
  const classes = useStyles();
  const { error: alertError } = useAlert();
  const { login } = useAuth();
  const [values, setValues] = useState<ILoginDetails>(initialValues);
  const [touched, handleBlur] = useTouched();
  const [waiting, setWaiting, unsetWaiting] = useWaiting();

  const isValid = useMemo(() => !!values.email && !!values.password, [values]);

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
      requestLogin(values)
        .finally(unsetWaiting)
        .then(({ data }) => login(data.accessToken))
        .catch(alertError);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [values]
  );

  return (
    <Container fluid className="py-4">
      <Form className={classes.form} onSubmit={handleSubmit}>
        <h1 className="text-center">Sign In</h1>

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

        <div className="d-flex justify-content-between align-items-center mt-4">
          <div>
            New here? <Link to="/auth/register">Sign up</Link>
          </div>
          <ActionButton
            variant="primary"
            type="submit"
            isWaiting={waiting}
            disabled={!isValid}
          >
            Login
          </ActionButton>
        </div>
      </Form>
    </Container>
  );
};
