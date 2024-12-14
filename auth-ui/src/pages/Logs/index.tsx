import React, { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap-v5";
import { makeStyles } from "@material-ui/core";
import JsonView from "react-json-view";

import { useAlert } from "../../hooks";
import { requestRecords } from "../../axios";
import SimpleTable from "../../components/SimpleTable";

export interface IRecord {
  id: string;
  url: string;
  metadata: any;
  requests: any;
}

const useStyles = makeStyles(() => ({ container: { paddingTop: 56 } }));

const Logs: React.FC = () => {
  const classes = useStyles();
  const { error: alertError } = useAlert();
  const [data, setData] = useState<IRecord[]>();

  const fetchLogs = useCallback(
    () => {
      requestRecords()
        .then(({ data: { data } }) => setData(data))
        .catch(alertError);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchLogs, []);

  return (
    <Container
      fluid
      className={`${classes.container} d-flex flex-column align-items-center`}
    >
      <h1 className="text-center">Preview Logs</h1>
      <SimpleTable
        data={data}
        headRows={[
          {
            id: "url",
            label: "URL",
            format: (url) => url.slice(0, 50) + (url.length > 50 ? "..." : ""),
          },
          {
            id: "metadata",
            label: "Metadata",
            format: (data) => (
              <JsonView enableClipboard={false} collapsed={true} src={data} />
            ),
          },
          {
            id: "requests",
            label: "Requests",
            format: (data) => (
              <JsonView enableClipboard={false} collapsed={true} src={data} />
            ),
          },
        ]}
        primaryKey="id"
      />
    </Container>
  );
};

export default Logs;
