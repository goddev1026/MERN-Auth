import React, { MouseEvent, useCallback, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TablePagination,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import Loading from "../Loading";

type Order = "asc" | "desc";

interface IRow {
  id: string;
  label: string;
  format?: (_: any) => string | JSX.Element;
}

type HeadProps = {
  order: Order;
  orderBy: string;
  headRows: IRow[];
  onRequestSort: (e: MouseEvent, prop: string) => void;
};

const SimpleTableHead: React.FC<HeadProps> = ({
  order,
  orderBy,
  headRows,
  onRequestSort: handleRequestSort,
}) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>#</TableCell>
        {headRows.map((row, index) => (
          <TableCell
            key={index}
            className="px-1"
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={(e) => handleRequestSort(e, row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    whiteSpace: "nowrap",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    boxShadow: "none",
    borderRadius: 0,
  },
  tableWrapper: {
    overflowX: "auto",
  },
  tableCell: {
    maxWidth: 200,
    overflow: "auto",
  },
}));

type Props = {
  data?: any[];
  headRows: IRow[];
  primaryKey: string;
  defaultOrderBy?: string;
};

const SimpleTable: React.FC<Props> = ({ data, headRows, defaultOrderBy }) => {
  const classes = useStyles();
  const [order, setOrder] = useState<Order>("desc");
  const [orderBy, setOrderBy] = useState<string>(
    defaultOrderBy || headRows[0].id
  );
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleRequestSort = useCallback(
    (e: MouseEvent, prop: string) => {
      setOrder(orderBy === prop && order === "desc" ? "asc" : "desc");
      setOrderBy(prop);
    },
    [orderBy, order]
  );

  const cmp = useCallback(
    (a: { [k: string]: any }, b: { [k: string]: any }) =>
      (order === "asc" ? 1 : -1) *
      (a[orderBy] > b[orderBy] ? 1 : a[orderBy] < b[orderBy] ? -1 : 0),
    [order, orderBy]
  );

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table aria-labelledby="tableTitle" size="medium">
            <SimpleTableHead
              headRows={headRows}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {data === undefined ? (
                <TableRow>
                  <TableCell className="px-1" colSpan={headRows.length + 1}>
                    <div className="d-flex justify-content-center">
                      <Loading color="gray" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : data.length > 0 ? (
                [...data]
                  .sort(cmp)
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index} hover tabIndex={-1}>
                      <TableCell className="align-baseline px-1">
                        {index + 1}
                      </TableCell>
                      {headRows.map(({ id, format }, index) => (
                        <TableCell
                          className={classes.tableCell + " align-baseline px-1"}
                          key={index}
                        >
                          <div className="d-flex align-items-center">
                            {!row[id]
                              ? ""
                              : !format
                              ? row[id].toString()
                              : format(row[id])}
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
              ) : (
                <TableRow hover>
                  <TableCell
                    className="text-center"
                    colSpan={headRows.length + 1}
                  >
                    No Records
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={data?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, value) => setPage(value)}
          onRowsPerPageChange={({ target: { value } }) =>
            setRowsPerPage(+value)
          }
        />
      </Paper>
    </div>
  );
};

export default SimpleTable;
