import React, { useCallback, useState } from "react";
import { Container, Form, FormControl } from "react-bootstrap-v5";
import { makeStyles } from "@material-ui/core";
import JsonView from "react-json-view";

import { useAlert, useWaiting } from "../../hooks";
import { requestMetadata } from "../../axios";
import ActionButton from "../../components/ActionButton";

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: 56,
  },
  form: {
    width: 500,
  },
  jsonView: {
    width: 800,
    height: 400,
    border: "1px solid #ccc",
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();
  const { error: alertError } = useAlert();
  const [url, setUrl] = useState<string>("");
  const [metadata, setMetadata] = useState({});
  const [waiting, setWaiting, unsetWaiting] = useWaiting();

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => setUrl(value),
    []
  );

  const handleSubmit = useCallback<React.FormEventHandler>(
    (e) => {
      e.preventDefault();
      if (!!url) {
        setMetadata({});
        setWaiting();
        requestMetadata(url)
          .finally(unsetWaiting)
          .then(({ data }) => setMetadata(data.metadata))
          .catch(alertError);
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [url]
  );

  return (
    <Container
      fluid
      className={`${classes.container} d-flex flex-column align-items-center`}
    >
      <h1 className="text-center">Preview Metadata</h1>
      <Form className={`${classes.form} m-auto mb-3`} onSubmit={handleSubmit}>
        <FormControl
          name="url"
          type="text"
          value={url}
          onChange={handleChange}
        />
        <div className="d-flex justify-content-center align-items-center mt-3">
          <ActionButton
            variant="primary"
            type="submit"
            isWaiting={waiting}
            disabled={!url}
          >
            Preview
          </ActionButton>
        </div>
      </Form>
      <div className={`${classes.jsonView} overflow-auto rounded-3`}>
        <JsonView collapsed={false} src={metadata} />
      </div>
    </Container>
  );
};

export default Home;
